import { themeStore } from "../state/themeStore";

let init = false; // so we dont end up in endless loop

/**
 * configures theme needed for tailwind dark/light mode/ updates themeStore
 * if user have set light mode from before, it will use this else it will se dark mode as default
 */
export function loadTheme() {
    if (!init) {
        init = true;
        const theme = themeStore.getState();
        const useDarkMode = window.localStorage.getItem("theme");

        if (useDarkMode === null) {
            /**
             * if user have not saved from before, then we set default DARK
             */
            window.localStorage.setItem("theme", "Y");
            theme.setDarkTheme(true);
            document.getElementsByTagName("HTML")[0].className = "dark";
        } else {
            if (useDarkMode !== "Y") {
                document.getElementsByTagName("HTML")[0].className = "";
            } else {
                document.getElementsByTagName("HTML")[0].className = "dark";
            }

            theme.setDarkTheme(useDarkMode === "Y" ? true : false);
        }
    }
}
