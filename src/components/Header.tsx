import React from "react";
import { themeStore } from "../state/themeStore";

// change me
const HeaderTitle = "Kasså";

/**
 * header
 * @returns
 */
export function Header() {
    const theme = themeStore();
 

    return (
        <header className="flex text-center   bg-gray-300 dark:bg-gray-700 dark:text-gray-300 ">
            <div className="flex flex-1 text-indigo-600 dark:text-blue-400 m-1">
                
            </div>

            <div className="flex flex-1 flex-col ">
                <div className="m-auto text-2xl">{HeaderTitle}</div>
            </div>

            <div className="flex flex-1 flex-row-reverse">
                <div
                    aria-label="toggle between dark and light mode"
                    className="focus:outline-none text-indigo-600 dark:text-indigo-400"
                    onClick={() => {
                        theme.toggleDarkMode();
                    }}
                >
                    {/* <DarkModeIcon /> */}
                </div>
            </div>
        </header>
    );
}
