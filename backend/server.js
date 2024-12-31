// app.js or index.js
require('dotenv').config();  

const express = require('express');
const cors = require('cors');
const port = process.env.APP_PORT || 3000;  
const bodyParser = require('body-parser');  
const myRoutes = require('./routes/myRoutes');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import and use routes
app.use(bodyParser.json());

//routes
app.use('/',myRoutes);

// cors
app.use(cors());

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'OpenAPI to make',
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
  apis: ['./controllers/*.js'],  // Path to your controller files
};


const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
