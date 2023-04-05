class HttpConfig {
    private urlHost: string;
    private base: string;
    private appRootUrl!: string;
    private apiRootUrl!: string;
    private apiRootName: string;
    private azureConfig: string;
    private apiPaths = new Map<string, string>();
    private azureConfigIsPartOfApi: boolean;

    /**
     * Creates httpConfig helper
     * @param apiRootName default "api"
     * @param azureConfigPath default "azure_config.json"
     * @param azureConfigIsPartOfApi default = false
     */
    constructor(
        apiRootName = "api",
        azureConfigPath = "azure_config.json",
        azureConfigIsPartOfApi = false
    ) {
        this.apiRootName = apiRootName;
        this.azureConfigIsPartOfApi = azureConfigIsPartOfApi;
        this.azureConfig = azureConfigPath;
        this.urlHost = `${window.location.protocol}//${window.location.host}`;
        this.base = "";
        this.update();
    }

    private update() {
        if (this.base) {
            this.appRootUrl = `${this.urlHost}/${this.base}/`;
            this.apiRootUrl = `${this.urlHost}/${this.base}/${this.apiRootName}`;
        } else {
            this.appRootUrl = `${this.urlHost}`;
            this.apiRootUrl = `${this.urlHost}/${this.apiRootName}`;
        }
    }

    public updateAzureConfigPath(azureConfigPath: string, azureConfigIsPartOfApi: boolean) {
        this.azureConfigIsPartOfApi = azureConfigIsPartOfApi;
        this.azureConfig = azureConfigPath;
    }

    public setApiRootName(name: string) {
        this.apiRootName = name;
        this.update();
    }

    public getApiRootName() {
        return this.apiRootName;
    }

    public setBase(base: string) {
        this.base = base || "";
        this.update();
    }

    public getBase() {
        return this.base;
    }

    public getAzureConfigUrl() {
        if (this.azureConfigIsPartOfApi) {
            return `${this.apiRootUrl}/${this.azureConfig}`;
        }
        return `${this.appRootUrl}/${this.azureConfig}`;
    }

    public getApiRoot() {
        return this.appRootUrl;
    }

    public getAppRoot() {
        return this.appRootUrl;
    }

    public addApiSubPath(name: string, path: string) {
        this.apiPaths.set(name, path);
    }

    public removeApiSubPath(name: string) {
        this.apiPaths.delete(name);
    }

    public getApiSubPath(name: string) {
        const api = this.apiPaths.get(name) || "unknownAPI";
        if (api === "unknownAPI") {
            console.error("unknown api:", name);
        }
        return `${this.apiRootUrl}/${api}`;
    }
}

export const httpConfig = new HttpConfig();
