export interface IAzureAppConfig {
    loadConfig(): Promise<{
        TENANT_ID: string;
        CLIENT_ID: string;
        SCOPES: Record<string, string[]>;
    } | null>;
}
