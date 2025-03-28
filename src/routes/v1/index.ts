import { Router } from 'express';

// import all other routers
import paymentRoutes from "./payments/payment.routes";

const router = Router();

router.use('/payments', paymentRoutes);

export default router;
