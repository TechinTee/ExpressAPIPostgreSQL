import { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";


dotenv.config();

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with PostgreSQL",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and PostgreSQL",
        },
        servers: [
            {
                url: `http://${process.env.HOST}`,
                // url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Users: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64",
                            descripttion: "Product ID",
                            example: 1,
                        },
                        username: {
                            type: "string",
                            descripttion: "Product username",
                            example: "John",
                        },
                        password: {
                            type: "string",
                            descripttion: "Product password",
                            example: "password123456"
                        },
                        fullname: {
                            type: "string",
                            descripttion: "Product fullname",
                            example: "John Doe"
                        },
                        email: {
                            type: "string",
                            descripttion: "Product email",
                            example: "john.doe@example.com"
                        },
                        tel: {
                            type: "string",
                            descripttion: "Product tel",
                            example: "0999999999"
                        },
                    }
                },
                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64",
                            descripttion: "Product ID",
                            readOnly: true
                        },
                        name: {
                            type: "string",
                            descripttion: "Product name",
                        },
                        price: {
                            type: "number",
                            format: "double",
                            descripttion: "Product price",
                        }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        './src/routes/*.ts',
        './dist/routes/*.js',
        './src/**/*.ts',
    ],
}

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app: Express): void => {
    app.use('/api-docs', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec,{
        customSiteTitle: "Express API with PostgreSQL",
        explorer: true,
        swaggerOptions:{
            filter: true,
            showRequestHeaders: true,
        }
    }));

}

export default setupSwagger;