const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/product.router"); 
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options and spec
const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
      title: 'RESTful API for SE Shop',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Arpapat Yipram',
        url: 'https://github.com/Arpapat2410',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
  };

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Connect to the database
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI).then(err => {
    if (!err) {
        return console.log(err);
    }
    return console.log("Connected to MongoDB");
});

// Set up Express app
const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL;

// Middleware
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
    res.send("<h1>This is a RESTful API for E-commerce website with MERN Stack</h1>");
});

app.use("/products", productRouter);

// Serve Swagger UI at /api-doc
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const server = app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
