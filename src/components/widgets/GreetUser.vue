<script setup>

import Card from "../Card.vue";
import {useProfileStore} from "../../store/profile.js";

const useProfile = useProfileStore();

</script>

<template>


  <Card class="px-3 py-2 flex items-center gap-x-2 md:gap-x-4 animate-pulse" v-if="useProfile.profile.loading">
      <div class="shrink-0 w-14 h-14 rounded-full bg-gray-300 dark:bg-slate-700 aspect-square"></div>
      <div class="w-full space-y-2">
        <div class="w-24 h-3 bg-gray-300 dark:bg-slate-700 rounded-md"></div>
        <div class="h-2.5 w-full bg-gray-300 dark:bg-slate-700 rounded-md"></div>
      </div>
  </Card>

  <Card class="px-3 py-2 flex items-center gap-x-2 md:gap-x-4" v-else>
      <img :src="useProfile.avatarUrl" alt="profile" class="shrink-0 w-14 h-14 object-cover rounded-full">
      <div class="leading-relaxed">
        <h3 class="md:text-xl text-gray-950 dark:text-white">Bienvenue {{ useProfile.profile.data.firstname }}, </h3>
        <p class="text-gray-800 dark:text-slate-400">Heureux de vous revoir sur votre tableau de bord myGES</p>
      </div>
  </Card>
</template>

<style scoped>

</style>