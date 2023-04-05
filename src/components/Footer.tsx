import React from "react";

/**
 * injected by build
 */
declare const APP_VERSION: string;

/**
 * footer
 * @returns
 */
export function Footer() {
    return (
        <footer className="flex text-center bg-gray-300 dark:bg-gray-700 dark:text-gray-300 ">
            <div className="flex m-1">version: {APP_VERSION}</div>
        </footer>
    );
}
