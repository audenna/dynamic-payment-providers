import { PaymentProviderInterface } from '../../../interfaces/payment-provider.interface';

export default class StripeProvider implements PaymentProviderInterface {
    name = "stripe";

    async processPayment(userId: number, data: any) {
        return { provider: this.name, status: "success", userId, data };
    }

    async handleWebhook(data: any) {
        console.log("Stripe Webhook received", data);
    }
}
