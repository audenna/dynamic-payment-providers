import { Request, Response } from "express";
import { PaymentProviderManager } from "../services/payment";
import { PaymentProviderInterface } from "../interfaces/payment-provider.interface";

export class PaymentController {
    private paymentProviderManager: PaymentProviderManager;

    constructor() {
        this.paymentProviderManager = PaymentProviderManager.getInstance();
    }

    makePayment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { provider, data } = req.body;
            const paymentProvider: PaymentProviderInterface = this.paymentProviderManager.getProvider(provider);

            const result = await paymentProvider.processPayment(1, data);
            res.json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    listProviders = (_req: Request, res: Response): void => {
        res.status(200).json({ providers: this.paymentProviderManager.listProviders() });
    };
}
