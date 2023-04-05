import React from "react";
import { getMsalInstance } from "../utils/auth/getAzureAuth";
import { guiStore } from "../state/guiStore";

/**
 * Simple settings dialog
 * this is controlled by guiStore, to be loaded on application startup
 *
 * @returns
 */
export function UserSettingsDialog() {
    const guiState = guiStore();

    if (!guiState.isSettingsDialogActivted) {
        return null;
    }

    const accounts = getMsalInstance("API")?.getCurrentContext()?.getAllAccounts() || [];
    const selectedAccount = getMsalInstance("API")?.getCurrentContext()?.getActiveAccount();

    // dummy if they need to select something else
    accounts.push({ localAccountId: "0", name: "Other" } as any);

    return (
        <div className="fixed grid w-full h-full items-center justify-center fadeIn z-[2000] bg-gray-50/50 ">
            <div className="relative block w-96 h-80 bg-gray-100 dark:bg-gray-800 shadow-2xl shadow-black border p-1 border-gray-300 dark:border-gray-900">
                <span className="m-auto block text-center text-2xl bg-gray-300 p-2 dark:bg-gray-700 dark:text-white">
                    Settings
                </span>

                <select
                    defaultValue={selectedAccount?.localAccountId}
                    onChange={(event) => {
                        debugger;
                        if (event.target.value === "0") {
                            getMsalInstance("API").selectUser();
                        } else {
                            accounts.forEach((account) => {
                                if (account.localAccountId === event.target.value) {
                                    getMsalInstance("API")
                                        ?.getCurrentContext()
                                        .setActiveAccount(account);
                                    guiStore.setState({ currentUser: account.name });
                                }
                            });
                        }
                    }}
                    className="mt-2 m-auto block text-center font-semibold dark:text-white bg-gray-700 p-1 outline-none"
                >
                    {accounts.map((account) => {
                        return (
                            <option key={account.localAccountId} value={account.localAccountId}>
                                {account.name}
                            </option>
                        );
                    })}
                </select>

                <div className="absolute bottom-2 left-0 right-0">
                    <div className="flex w-full">
                        <button
                            className="m-auto bg-gray-300 dark:bg-gray-700 p-2 w-36 hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none dark:text-blue-400 text-indigo-600 font-semibold"
                            onClick={() => {
                                guiState.deactivateSettingsDialog();
                            }}
                        >
                            Update/Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
