require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Library Management System API",
        version: "1.0.0",
        description: "API documentation for the Library Management System",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server",
        },
    ],
};

// Options for the Swagger docs
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // Path to the API docs
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", router);

app.use("*", (_, res) => {
    res.status(404).json({
        data: null,
        message: "Route not found",
    });
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
