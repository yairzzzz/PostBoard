import { create } from "zustand";
import type { ThemeState } from "../types/types";

export const themeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("chat-theme") || "dim",
  setTheme: (theme: string) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
