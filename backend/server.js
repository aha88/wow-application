require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const myRoutes = require('./routes/myRoutes');

const port = process.env.APP_PORT || 3000;
const app = express();

// Middleware for body parsing
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/', myRoutes);

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'OpenAPI for assets and API routes',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
    {
      url: `https://localhost:${port}`,
    },
  ],
  components: {
    securitySchemes: {
      xTokenAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-token',
        description: 'Custom header for API token',
      },
    },
  },
  security: [
    {
      xTokenAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'], // Path to controller files
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Assets are accessible at http://localhost:${port}/assets/`);
});
