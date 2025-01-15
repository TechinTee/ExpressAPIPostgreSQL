// Express
import express from 'express';

// Dotenv
import dotenv from 'dotenv';

// import cors
import cors from 'cors';

// import routes
import dbtestRoutes from './routes/dbtestRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

// import swagger
import setupSwagger from './utils/swagger';


// Load environment variables from .env file
dotenv.config();

//Create Express server
const app = express();

//middleware for cors
app.use(cors(
    {
        // origin: 'http://localhost:4200, http://www.example.com',
        origin: '*',
        methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS , HEAD',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true
    }
));

// Middleware สำหรับ JSON
app.use(express.json());

// setup swagger
setupSwagger(app);

//use routes
app.use('/api/testdb', dbtestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// Start Express server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});