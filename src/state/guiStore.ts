import { create } from "zustand";

type guiState = {
    /**
     * auth
     */
    currentUser: string;
    isCheckingAuthentication: boolean;
    isAuthenticationChecked: boolean;
    allUserRoles: string[];

    /**
     * settings dialog
     */
    isSettingsDialogActivted: boolean;
    activateSettingsDialog: () => void;
    deactivateSettingsDialog: () => void;
};

export const guiStore = create<guiState>((set) => ({
    /**
     * auth
     */
    currentUser: "",
    isCheckingAuthentication: false,
    isAuthenticationChecked: false,
    allUserRoles: [],
    /**
     * settings dialog
     */
    isSettingsDialogActivted: false,
    activateSettingsDialog: () => set(() => ({ isSettingsDialogActivted: true })),
    deactivateSettingsDialog: () => set(() => ({ isSettingsDialogActivted: false }))
}));
