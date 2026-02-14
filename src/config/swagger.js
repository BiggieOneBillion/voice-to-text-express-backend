const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voice Text Backend API',
      version: '1.0.0',
      description: 'Professional API documentation for the Voice Text Backend, providing endpoints for audio transcription, user authentication, and content management (Books, Chapters, Notes).',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Path to the API routes and models
};

module.exports = swaggerJsdoc(options);