import { guiStore } from "../state/guiStore";
import { getAzureAuth } from "../utils/auth/getAzureAuth";
import { useEffect } from "react";
import { serviceStore } from "../state/serviceStore";

/**
 * check if we are signed in with configured api scope before displaying main content
 * @param props
 * @returns
 */
export function AuthLoader(props: { children: any }) {
    const guiState = guiStore();

    useEffect(() => {
        if (!guiState.isCheckingAuthentication) {
            guiStore.setState({
                isCheckingAuthentication: true
            });

            serviceStore.setState({
                loadingDataDialogActivated: true,
                loadingDataDialogHeader: "checking authentication"
            });

            async function load() {
                try {
                    const authResult = await getAzureAuth();
                    guiStore.setState({
                        isAuthenticationChecked: true,
                        currentUser: authResult?.account?.name || "na",
                        allUserRoles: (authResult?.account?.idTokenClaims as any)?.roles || []
                    });
                } catch (err) {
                    serviceStore.setState({
                        loadingDataDialogActivated: false,
                        errorDialogActivated: true,
                        errorDialogHeader: "Fetch error",
                        errorDialogContent: err as any
                    });
                }

                serviceStore.getState().deactivateLoadingData();
            }

            load();
        }
    }, []);

    if (guiState.isAuthenticationChecked) {
        return props.children;
    }

    return null;
}
