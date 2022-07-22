const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Notes',
        version: '1.0.0',
        description: 'Create, Read and Update Notes.'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
        {
            url: `${process.env.SERVER_DEV_URL}/v1`,
            description: 'Development server',
        },
        {
            url: `${process.env.SERVER_PROD_URL}`,
            description: 'Production server',
        },
    ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);