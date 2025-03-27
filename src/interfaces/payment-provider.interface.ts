export interface PaymentProviderInterface {
    name: string;
    processPayment(userId: number, data: any): Promise<any>;
    handleWebhook(data: any): Promise<void>;
}
