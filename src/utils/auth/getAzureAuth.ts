import { AzureAppConfig } from "./AzureAppConfig";
import { httpConfig } from "../httpConfig";
import { AzureMsalInstance } from "./AzureMsalInstance";

let azureAppConfig: AzureAppConfig;

const azureMsalInstance: Record<string, AzureMsalInstance> = {};

type CUSTOM_NAME = string;

/**
 * gets azure AuthenticationResult
 * this will contain account information
 * @param force
 * @returns
 */
export async function getAzureAuth(
    force = true,
    type: "API" | "GRAPH" | CUSTOM_NAME = "API",
    customScope: string[] = []
) {
    if (!azureAppConfig) {
        azureAppConfig = new AzureAppConfig();
    }

    const config = await azureAppConfig.loadConfig();
    if (!config) {
        return null;
    }

    let currentMaslIntance: AzureMsalInstance | null = null;

    if (!azureMsalInstance[type]) {
        azureMsalInstance[type] = new AzureMsalInstance(
            config.CLIENT_ID,
            config.TENANT_ID,
            httpConfig.getAppRoot(),
            config.SCOPES[type]
        );
    }
    currentMaslIntance = azureMsalInstance[type];

    if (!currentMaslIntance) {
        return null;
    }

    const maslContext = await currentMaslIntance?.getToken(force, customScope);

    return maslContext;
}

export function getMsalInstance(type: string) {
    return azureMsalInstance[type] || null;
}
