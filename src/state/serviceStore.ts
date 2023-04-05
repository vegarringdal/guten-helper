import { create } from "zustand";

type serviceState = {
    /**
     * loading dialog
     */
    loadingDataDialogActivated: boolean;
    loadingDataDialogContent: string | null;
    loadingDataDialogHeader: string | null;
    loadingDataRowCount: number;
    activateLoadingData: () => void;
    deactivateLoadingData: () => void;

    /**
     * error dialog
     */
    errorDialogHeader: string | null;
    errorDialogContent: string | null;
    errorDialogActivated: boolean;
    activateErrorDialog: () => void;
    deactivateErrorDialog: () => void;
};

/**
 * this state holds loading data and error data
 */
export const serviceStore = create<serviceState>((set) => ({
    /**
     * loading dialog
     */
    loadingDataDialogActivated: false,
    loadingDataDialogContent: "",
    loadingDataDialogHeader: "",
    loadingDataRowCount: 0,
    activateLoadingData: () => set(() => ({ loadingDataDialogActivated: true })),
    deactivateLoadingData: () => set(() => ({ loadingDataDialogActivated: false })),

    /**
     * error dialog
     */
    errorDialogHeader: "",
    errorDialogContent: "",
    errorDialogActivated: false,
    activateErrorDialog: () => set(() => ({ errorDialogActivated: true })),
    deactivateErrorDialog: () => set(() => ({ errorDialogActivated: false }))
}));
