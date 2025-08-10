const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API POLICIA',
            version: '1.0.0',
            description: 'API para gerenciamento de agentes e casos policiais',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setupSwagger;
