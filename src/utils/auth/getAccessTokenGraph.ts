import { getAzureAuth } from "./getAzureAuth";

export async function getAccessTokenGraph(forceReload = false, customScope?: string[]) {
    const response = await getAzureAuth(forceReload, "GRAPH", customScope);
    return response?.accessToken;
}
