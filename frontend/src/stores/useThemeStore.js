import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "dark",
    
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        
        if (newTheme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
        
        return { theme: newTheme };
    }),

    // Call this once when the app loads to apply the saved theme
    initTheme: () => {
        const theme = localStorage.getItem("theme") || "dark";
        if (theme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    }
}));