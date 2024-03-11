<script setup>

import { MoonIcon, SunIcon } from "@heroicons/vue/20/solid/index.js";
import {useThemeStore} from "../../store/theme.js";
import {computed} from "vue";

const themeStore = useThemeStore();

const themeClass = computed(() => {
  return themeStore.theme === 'dark'
      ? 'fill-slate-300'
      : 'fill-gray-950'
})

const switchTheme = () => {
  const newTheme = themeStore.theme === 'dark' ? 'light' : 'dark';
  themeStore.setTheme(newTheme);
};
</script>

<template>
  <button class="text-sm md:text-md flex items-center gap-x-2" @click="switchTheme">
    <component :is="themeStore.theme === 'dark' ? MoonIcon : SunIcon" class="w-7 h-7" v-bind:class="themeClass" />
  </button>
</template>
