const path = require('path');
const fs = require('fs');

const router = require('express').Router();
const routes = fs.readdirSync(__dirname).filter(file => !['index.js'].includes(file));

routes.forEach(route_file => router.use(`/${path.parse(route_file).name}`, require(`./${route_file}`)))

module.exports = router;