import { PaymentProviderInterface } from '../../../interfaces/payment-provider.interface';

export default class PaypalProvider implements PaymentProviderInterface {
    name = "paypal";

    async processPayment(userId: number, data: any) {
        return { provider: this.name, status: "success", userId, data };
    }

    async handleWebhook(data: any) {
        console.log("PayPal Webhook received", data);
    }
}
