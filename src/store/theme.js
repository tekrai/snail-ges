import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    }),
    actions: {
        setTheme(newTheme) {
            this.theme = newTheme;
            localStorage.theme = newTheme;
            document.documentElement.classList[newTheme === 'dark' ? 'add' : 'remove']('dark');
        },
        respectSystemPreference() {
            localStorage.removeItem('theme');
            this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList[this.theme === 'dark' ? 'add' : 'remove']('dark');
        }
    }
});
