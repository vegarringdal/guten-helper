import { getAzureAuth } from "./getAzureAuth";

export async function getAccessTokenApi(forceReload = false, customScope?: string[]) {
    const response = await getAzureAuth(forceReload, "API", customScope);
    return response?.accessToken;
}
