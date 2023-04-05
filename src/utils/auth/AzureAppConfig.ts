import { serviceStore } from "../../state/serviceStore";
import { httpConfig } from "../httpConfig";
import { AzureConfigType } from "./AzureConfigType";
import { IAzureAppConfig } from "./IAzureAppConfig";

/**
 * this is the default appconfig
 * you will be able to create custom by implementing IAzureAppConfig
 */
export class AzureAppConfig implements IAzureAppConfig {
    private CLIENT_ID!: string;
    private TENANT_ID!: string;
    private SCOPES: Record<string, string[]> = {};

    /**
     * calls backend get get azure config set with env settings ADP
     * first it will try and root/api/[azure_config_url]
     * if we get mo respontrespond, then our app is probably part of a sub folder.
     * lets try subfolder, we not try at root/[subfolder]/api/[azure_config_url]
     * if it finds it now, we also updates httpUrlConfig base to the [subfolder]
     * @returns
     */
    async loadConfig() {
        if (this.CLIENT_ID) {
            return {
                SCOPES: this.SCOPES,
                TENANT_ID: this.TENANT_ID,
                CLIENT_ID: this.CLIENT_ID
            };
        }

        async function fetchData(url: string) {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: null
            });

            let json = null;
            if (response.ok && response.body) {
                try {
                    json = (await response.json()) as AzureConfigType;
                    if (!json?.AZURE_CLIENT_ID) {
                        json = null;
                    }
                } catch (err) {
                    json = null;
                }
            }
            return json;
        }

        let resultJson = await fetchData(httpConfig.getAzureConfigUrl());

        if (!resultJson) {
            const base = location.pathname.split("/")[1];
            httpConfig.setBase(base);
            resultJson = await fetchData(httpConfig.getAzureConfigUrl());
        }
        if (!resultJson) {
            serviceStore.setState({
                errorDialogHeader: "Error",
                errorDialogContent: "Unable to contact backend to get azure config",
                errorDialogActivated: true
            });

            return null;
        }

        this.CLIENT_ID = resultJson?.AZURE_CLIENT_ID || "";
        this.TENANT_ID = resultJson?.AZURE_TENANT_ID || "";

        const keys = Object.keys(resultJson);
        keys.forEach((key) => {
            // by extraction AZURE_SCOPES_ we can return different scope types without hardcoding it
            const type = key.split("AZURE_SCOPES_")[1];

            if (type) {
                const typeValue = (resultJson as any)[key];
                if (Array.isArray(typeValue)) {
                    this.SCOPES[type] = typeValue as string[];
                } else {
                    this.SCOPES[type] = (typeValue as string).split(",").map((e) => e.trim()) || [];
                }
            }
        });

        return {
            SCOPES: this.SCOPES,
            TENANT_ID: this.TENANT_ID,
            CLIENT_ID: this.CLIENT_ID
        };
    }
}
