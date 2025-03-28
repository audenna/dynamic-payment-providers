import fs from "fs";
import path from "path";
import { ProviderManagerInterface } from "../../../interfaces/managers/provider-manager.interface";

export abstract class BaseProviderManager<T> implements ProviderManagerInterface<T> {
    protected providers: Map<string, T> = new Map();

    protected constructor(private providerDir: string) {
        this.loadProviders();
    }

    protected loadProviders(): void {
        const files: string[] = fs.readdirSync(this.providerDir);
        // console.log({ files }); // Examples { files: [ 'paypal.provider.ts', 'stripe.provider.ts' ] }

        files.forEach((file: string): void => {
            if (file.endsWith(".provider.ts")) {
                const providerPath: string = path.join(this.providerDir, file);
                const { default: ProviderClass } = require(providerPath);

                /**
                 * { ProviderClass: [class PaypalProvider] }
                 * { ProviderClass: [class StripeProvider] }
                 */
                // console.log({ ProviderClass });

                const providerInstance: T = new ProviderClass();
                // @ts-ignore - assuming all providers have `name`
                this.providers.set(providerInstance.name, providerInstance)

                /**
                 * Example storage
                 * {
                 *   paypal: PaypalProvider { name: 'paypal' },
                 *   stripe: StripeProvider { name: 'stripe' }
                 * }
                 */
                // console.log(this.providers);
            }
        });
    }

    getProvider(providerKey: string = 'paystack'): T {
        const provider = this.providers.get(providerKey);

        if (!provider) {
            throw new Error(`Provider "${providerKey}" not found`);
        }

        return provider;
    }

    listProviders(): string[] {
        return Array.from(this.providers.keys());
    }
}
