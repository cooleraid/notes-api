require('dotenv').config();
const { ValidationError } = require('express-validation')
const express = require('express')
const app = express()
const routes = require('./src/routes')
const Utils = require('./src/utils')
const cors = require('cors')

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(logRequest)

let unavailable = false
async function logRequest(req, res, next) {
  const cleanup = () => {
    res.removeListener('finish', logFn)
    res.removeListener('error', errorFn)
  }
  const logFn = () => {
    cleanup()
    const logger = getLoggerForStatusCode(res.statusCode)
    req.body = req.body || {}
    logger(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${req.headers['user-agent']} ${res.statusCode} ${res.statusMessage} ${res.get('Content-Length') || 0}b sent`)
  }
  const errorFn = err => cleanup() || console.trace(`Request pipeline error: ${err}`)
  res.on('finish', logFn)
  res.on('error', errorFn)
  next()
}

const getLoggerForStatusCode = (statusCode) => {
  if (statusCode >= 500) return console.error.bind(console)
  if (statusCode >= 400) return console.warn.bind(console)
  return console.info.bind(console)
}

app.use((req, res, next) => {
  if (unavailable) return res.sendStatus(503)
  next()
})

app.use('/health', (_, res) => res.sendStatus(200))
app.use('/v1', routes)
app.use((req, res) => {
  return res.status(404).json({ status: "error", message: Utils.messages.__404(`${req.method} ${req.originalUrl}`) });
});
app.use((err, req, res, next) => {
  if (err instanceof ValidationError && err.details?.body?.length) return res.status(err.statusCode).json({ status: "error", message: err.details.body[0].message.replace(/["]+/g, '') })
  if (err instanceof ValidationError && err.details?.query?.length) return res.status(err.statusCode).json({ status: "error", message: err.details.query[0].message.replace(/["]+/g, '') })
  if (err instanceof ValidationError && err.details?.params?.length) return res.status(err.statusCode).json({ status: "error", message: err.details.params[0].message.replace(/["]+/g, '') })
  console.error(err)
  res.status(500).json({ status: "error", message: Utils.messages[500] })
});

app.listen(process.env.PORT || '3005', () => console.log(`API Service started on http://localhost:${process.env.PORT}`))