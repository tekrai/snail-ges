<script setup>
import Link from "../components/navigations/Link.vue";
import {
  HomeIcon,
  Bars3Icon,
  ClockIcon,
  CalendarDaysIcon,
  CodeBracketSquareIcon,
  DocumentIcon, UserGroupIcon, AcademicCapIcon, BookOpenIcon,
} from "@heroicons/vue/24/solid/index.js";
import logo from "../assets/snail.png";
import DropDownUserMenu from "../components/navigations/DropDownUserMenu.vue";
import {onMounted, ref} from "vue";
import {usePeriodsStore} from "../store/periods.js";
import { useProfileStore } from "../store/profile.js";
import SwitchTheme from "../components/navigations/SwitchTheme.vue";
import Modal from "../components/Modal.vue";

const layout = ref({
  open: false,
  title: null,
});

const userPeriods = usePeriodsStore();

const userProfile = useProfileStore();

onMounted(() => {
  userPeriods.fetchData(); // perform once
  userProfile.fetchData(); // perform once
});


</script>

<template>

  <div class="antialiased min-h-screen relative lg:flex bg-neutral-100 dark:bg-[#162131]">
    <div v-if="layout.open" v-on:click="layout.open = false"
         class="fixed bg-black/10 h-screen w-screen z-10"></div>

    <nav
        class="absolute inset-0 transform lg:transform-none lg:opacity-100 duration-200 lg:relative w-80 z-10 flex flex-col h-screen bg-white md:bg-transparent dark:bg-[#162131]"
        v-bind:class="{'translate-x-0 ease-in opacity-100 ': layout.open === true, '-translate-x-full ease-out opacity-0': layout.open === false}"
    >

      <div class="p-6 h-16  flex items-center gap-x-4 border-b bg-white dark:bg-transparent dark:border-slate-700">
        <img :src="logo" alt="snailGES" class="w-9 h-9"/>
        <span class="uppercase font-medium leading-relaxed tracking-tight dark:text-white">SNAILGES</span>
      </div>

      <ul class="space-y-2 p-6">
        <li>
          <Link :to="{name: 'dashboard'}" :icon="HomeIcon()">Dashboard</Link>
        </li>
        <li>
          <Link :to="{name: 'calendar'}" :icon="CalendarDaysIcon()">Calendrier</Link>
        </li>
        <li>
          <Link :to="{name: 'projects'}" :icon="CodeBracketSquareIcon()">Projects</Link>
        </li>
        <li>
          <Link :to="{name: 'grades'}" :icon="AcademicCapIcon()">Notes</Link>
        </li>
        <li>
          <Link :to="{name: 'absences'}" :icon="ClockIcon()">Absences</Link>
        </li>
        <li>
          <Link :to="{name: 'subjects'}" :icon="BookOpenIcon()">Matières</Link>
        </li>
        <li>
          <Link :to="{name: 'documents'}" :icon="DocumentIcon()">Documents</Link>
        </li>
        <li>
          <Link :to="{name: 'contacts'}" :icon="UserGroupIcon()">Contacts</Link>
        </li>
      </ul>

    </nav>


    <div class="relative z-0 w-full">

      <div class="flex items-center justify-between w-full p-4 bg-white dark:bg-transparent  border-b dark:border-slate-700 gap-x-2 h-16 ">

        <div class="inline-flex items-center gap-x-2">
          <button class="lg:hidden" v-on:click="layout.open = true">
            <Bars3Icon class="w-7 h-7 dark:text-white"/>
          </button>
          <h1 class="md:hidden font-semibold capitalize">{{ layout.title }}</h1>
        </div>

        <div class="flex items-center gap-x-4">
          <SwitchTheme />
          <DropDownUserMenu/>
        </div>

      </div>

      <div class="p-6">
        <router-view/>
      </div>

      <Modal />

    </div>
  </div>

</template>

