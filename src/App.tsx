import React from "react";
import "./App.css";

/**
 * component
 */
import { ErrorDialog } from "./components/ErrorDialog";
import { LoadingDialog } from "./components/LoadingDialog";
import { Router } from "./components/Router";
import { UserSettingsDialog } from "./components/UserSettingsDialog";

/**
 * utils
 */
import { loadTheme } from "./utils/loadTheme";

/**
 * load user saved theme/load default
 */
loadTheme();

export function App() {
    return (
        <div className="app bg-gray-100 dark:bg-gray-800 dark:text-white">
            <LoadingDialog />
            <UserSettingsDialog />
            <ErrorDialog />

            <Router />
        </div>
    );
}
export default App;
