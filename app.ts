// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import paymentRoutes from './src/routes/payment.routes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("common"));

// Routes
app.use('/api/payment', paymentRoutes);

// Health Check Route
app.get('/', (_req, res) => {
    res.send('🚀 Payment System API is running');
});

export default app;
