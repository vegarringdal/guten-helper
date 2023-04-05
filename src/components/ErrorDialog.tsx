import React from "react";
import { serviceStore } from "../state/serviceStore";

/**
 * Simple error dialog
 * This is controlled by serviceStore, to be loaded on application startup
 *
 * @returns
 */
export function ErrorDialog() {
    const serviceState = serviceStore();

    if (!serviceState.errorDialogActivated) {
        return null;
    }

    let error = serviceState.errorDialogContent;
    if (typeof serviceState.errorDialogContent !== "string") {
        error = (serviceState.errorDialogContent as any)?.message;
        if (typeof (serviceState.errorDialogContent as any)?.message !== "string") {
            error = "unknown, see console";
            console.log(serviceState.errorDialogContent);
        }
    }

    return (
        <div className="fixed grid w-full h-full items-center justify-center fadeIn z-[8010] bg-gray-50/50">
            <div className="relative block w-96 h-80 bg-gray-100 dark:bg-gray-800 border p-1 border-gray-300 dark:border-gray-900 shadow-2xl shadow-black ">
                <span className="m-auto block text-center text-2xl bg-gray-300 p-2 dark:bg-gray-700 text-red-600">
                    Error
                </span>

                <span className="mt-2 m-auto block text-center underline font-semibold dark:text-white">
                    {serviceState.errorDialogHeader}
                </span>

                <span className="flex-1 m-auto block text-center mt-4 whitespace-pre-line dark:text-white">
                    {error}
                </span>
                <div className="absolute bottom-2 left-0 right-0">
                    <button
                        className="block m-auto bg-gray-300 dark:bg-gray-700 p-2 w-36 hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none dark:text-blue-400 text-indigo-600 font-semibold"
                        onClick={() => serviceState.deactivateErrorDialog()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
