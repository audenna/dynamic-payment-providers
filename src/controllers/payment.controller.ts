import { Request, Response } from "express";
import { PaymentProviderManager } from "../services/managers/payment-provider-manager";
import { PaymentProviderInterface } from "../interfaces/providers/payment-provider.interface";

const paymentManager = PaymentProviderManager.getInstance();

export class PaymentController {

    makePayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { provider, data } = req.body;
            const paymentProvider: PaymentProviderInterface = paymentManager.getProvider(provider);

            const result = await paymentProvider.processPayment(1, data);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    listProviders = (_req: Request, res: Response): void => {
        res.status(200).json({ providers: paymentManager.listProviders() });
    };
}
