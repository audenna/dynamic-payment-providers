import { Router } from "express";
import { PaymentController } from "../../../controllers/payment.controller";

const paymentController = new PaymentController();

const router = Router();

router.post("/pay", paymentController.makePayment);
router.get("/providers", paymentController.listProviders);

export default router;
