export interface ProviderManagerInterface<T> {
    getProvider(name: string): T;
    listProviders(): string[];
}
