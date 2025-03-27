import fs from "fs";
import path from "path";
import { PaymentProviderInterface } from "../../interfaces/payment-provider.interface";

export class PaymentProviderManager {
    private static instance: PaymentProviderManager | null = null;
    private providers: { [key: string]: PaymentProviderInterface } = {};

    constructor() {
        this.loadProviders();
    }

    /**
     * This exposes the payment manager as a Singleton service
     */
    public static getInstance(): PaymentProviderManager {
        if (!PaymentProviderManager.instance) {
            PaymentProviderManager.instance = new PaymentProviderManager();
        }

        return PaymentProviderManager.instance;
    }

    private loadProviders(): void {
        const dir: string = path.join(__dirname + '/providers');
        const files: string[] = fs.readdirSync(dir);
        // console.log({ files }); // { files: [ 'paypal.provider.ts', 'stripe.provider.ts' ] }

        files.forEach((file: string): void => {
            if (!file.endsWith(".provider.ts") && !file.endsWith(".provider.js")) return;

            const providerPath: string = path.join(dir, file);
            const { default: ProviderClass } = require(providerPath);
            const providerInstance: PaymentProviderInterface = new ProviderClass();

            const providerKey: string = file.split(".")[0].replace(".provider", "");
            this.providers[providerKey] = providerInstance;

            /**
             * Example storage
             * {
             *   paypal: PaypalProvider { name: 'paypal' },
             *   stripe: StripeProvider { name: 'stripe' }
             * }
             */
            console.log(this.providers);
        });
    }

    getProvider(providerKey: string): PaymentProviderInterface {
        const provider: PaymentProviderInterface = this.providers[providerKey];
        if (!provider) throw new Error(`Payment provider "${providerKey}" not supported`);
        return provider;
    }

    listProviders(): string[] {
        return Object.keys(this.providers);
    }
}
