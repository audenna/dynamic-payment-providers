import path from "path";
import { BaseProviderManager } from "./base/base-provider-manager";
import { PaymentProviderInterface } from "../../interfaces/providers/payment-provider.interface";

export class PaymentProviderManager extends BaseProviderManager<PaymentProviderInterface> {
    private static instance: PaymentProviderManager;
    private static providerDir = path.join(__dirname, "../providers/payment-gateways");

    private constructor() {
        super(PaymentProviderManager.providerDir);
        // console.log({ providerDir: PaymentProviderManager.providerDir })
    }

    public static getInstance(): PaymentProviderManager {
        if (!PaymentProviderManager.instance) {
            PaymentProviderManager.instance = new PaymentProviderManager();
        }

        return PaymentProviderManager.instance;
    }
}
