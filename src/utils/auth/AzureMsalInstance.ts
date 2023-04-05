import {
    Configuration,
    PublicClientApplication,
    EventType,
    EventMessage,
    AuthenticationResult,
    AuthError
} from "@azure/msal-browser";

export class AzureMsalInstance {
    private msalConfig!: Configuration;
    private msalInstance!: PublicClientApplication;
    private force = true;

    constructor(
        private AZURE_CLIENT_ID: string,
        private AZURE_TENANT_ID: string,
        private redirectUri: string,
        private scopes: string[]
    ) {}

    forceReload() {
        const oldValue = this.force;
        this.force = false;
        return oldValue;
    }

    private init(): Promise<PublicClientApplication | null> {
        return new Promise((resolve) => {
            if (this.msalInstance) {
                resolve(this.msalInstance);
                return;
            }

            this.msalConfig = {
                auth: {
                    clientId: this.AZURE_CLIENT_ID,
                    authority: `https://login.microsoftonline.com/${this.AZURE_TENANT_ID}/`,
                    redirectUri: this.redirectUri,
                    postLogoutRedirectUri: "/"
                }
            };

            this.msalInstance = new PublicClientApplication(this.msalConfig);

            this.msalInstance.addEventCallback((event: EventMessage) => {
                if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                    const payload = event.payload as AuthenticationResult;
                    const account = payload.account;
                    this.msalInstance.setActiveAccount(account);
                    resolve(this.msalInstance);
                }

                // reject ?
                return null;
            });

            this.msalInstance
                .handleRedirectPromise()
                .then(() => {
                    // Check if user signed in
                    const account = this.msalInstance.getActiveAccount();

                    if (!account) {
                        // redirect anonymous user to login page
                        this.msalInstance.loginRedirect();
                    }
                })
                .catch((err: any) => {
                    console.log(err);
                });

            const account = this.msalInstance.getActiveAccount();
            if (account) {
                this.msalInstance.setActiveAccount(account);
                resolve(this.msalInstance);
            }
        });
    }

    async selectUser(customScope: string[] = []) {
        const msalInstance = await this.init();

        if (msalInstance) {
            const response = await msalInstance
                .loginRedirect({
                    scopes: customScope.length ? customScope : this.scopes,
                    prompt: "select_account"
                })
                .then(function (accessTokenResponse: any) {
                    // Acquire token silent success
                    return accessTokenResponse;
                })
                .catch((err: AuthError) => {
                    if (err.errorCode === "invalid_grant") {
                        // needed if not requesting default like "ChatMessage.Send,Chat.ReadWrite"
                        // atm the permissions above requires somehow aditional admin concent even though the permisions should need it...
                        // asked terje vaksdal about to to try and learn some more
                        this.msalInstance.acquireTokenRedirect({ scopes: this.scopes });
                        return;
                    }

                    if (err.errorCode === "no_tokens_found") {
                        // this will most likly happend to a new app service
                        this.msalInstance.loginRedirect();
                        return;
                    }

                    throw err;
                });
            return response;
        } else {
            // we did not get maslInstance set
            return null;
        }
    }

    async getToken(force = this.forceReload(), customScope: string[] = []) {
        const msalInstance = await this.init();

        if (msalInstance) {
            const response = await msalInstance
                .acquireTokenSilent({
                    scopes: customScope.length ? customScope : this.scopes,
                    forceRefresh: force
                })
                .then(function (accessTokenResponse: any) {
                    // Acquire token silent success
                    return accessTokenResponse;
                })
                .catch((err: AuthError) => {
                    if (err.errorCode === "invalid_grant") {
                        // needed if not requesting default like "ChatMessage.Send,Chat.ReadWrite"
                        // atm the permissions above requires somehow aditional admin concent even though the permisions should need it...
                        // asked terje vaksdal about to to try and learn some more
                        this.msalInstance.acquireTokenRedirect({ scopes: this.scopes });
                        return;
                    }

                    if (err.errorCode === "no_tokens_found") {
                        // this will most likly happend to a new app service
                        this.msalInstance.loginRedirect();
                        return;
                    }

                    throw err;
                });
            return response;
        } else {
            // we did not get maslInstance set
            return null;
        }
    }

    getCurrentContext() {
        return this.msalInstance;
    }
}
