<script setup>
import Card from "../Card.vue";
import SecondaryButton from "../button/SecondaryButton.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import PrimaryButton from "../button/PrimaryButton.vue";
import {useProfileStore} from "../../store/profile.js";

const open = ref(false);

const router = useRouter();

const userProfile = useProfileStore();


function toggleDropDown(){
  open.value = !open.value;
}

</script>
<template>


  <div v-if="userProfile.profile.loading">
    <button class="ring-offset-emerald-600 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-2">
        <span class="relative h-9 w-9 items-center justify-center rounded-full block bg-gray-300 animate-pulse"></span>
    </button>
  </div>

  <div class="group inline-flex items-center justify-center text-right" v-else>
    <div class="relative h-9 w-9 shrink-0 text-left">
      <button class="ring-offset-emerald-600 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-2" v-on:click="toggleDropDown">
        <span class="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
          <img :src="userProfile.avatarUrl" alt="profile" class="shrink-0 w-9 h-9 max-w-full rounded-full object-cover shadow-sm border-transparent">
        </span>
      </button>

      <Card v-show="open" class="absolute end-0 mt-2 w-64 origin-top-right divide-y dark:divide-slate-700 z-20">

        <div class="flex flex-col items-center space-y-2 p-6">
          <img :src="userProfile.avatarUrl"  alt="profile" class="object-cover w-16 h-16 rounded-full">
          <div class="leading-tight text-center">
            <p class="font-semibold text-sm dark:text-white" v-text="userProfile.fullName"></p>
            <span class="text-gray-400 dark:text-slate-400 text-xs" v-text="userProfile.profile.data.email"></span>
          </div>

          <PrimaryButton v-on:click="router.push('/profile') && toggleDropDown()">
            Gérer le profil
          </PrimaryButton>

        </div>

        <div class="p-6">
          <SecondaryButton>
            Se déconnecter
          </SecondaryButton>
        </div>



      </Card>
    </div>
  </div>


</template>