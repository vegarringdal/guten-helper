import { create } from "zustand";
import { toggleTheme } from "../utils/toggleTheme";

type themeState = {
    darktheme: boolean;
    setDarkTheme: (state: boolean) => void;
    toggleDarkMode: () => void;
};

/**
 * controlles the darktheme of app
 */
export const themeStore = create<themeState>((set) => ({
    darktheme: true,
    setDarkTheme: (state: boolean) => set(() => ({ darktheme: state })),
    toggleDarkMode: () => {
        set((state) => {
            const newState = state.darktheme ? false : true;
            toggleTheme(newState);
            return { darktheme: newState };
        });
    }
}));
