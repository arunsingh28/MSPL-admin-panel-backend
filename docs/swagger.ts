import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sportylife API',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express for Sportylife',
            contact: {
                name: 'Arun Singh'
            },
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server',
            },
            {
                url: '--- Proudction URL ---',
                description: 'Production server',
            }
        ],
    },
    apis: ['**/*.ts']
}


const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs