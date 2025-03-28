import { Router } from 'express';

// import all other routers
import paymentRoutes from "./payments/payment.routes";

const router = Router();

router.use('/api/payment', paymentRoutes);

export default router;
