<script setup>

import {CalendarIcon, MapPinIcon} from "@heroicons/vue/20/solid/index.js";
import axios from "axios";
import Card from "../Card.vue";
import {computed, onMounted, ref} from "vue";
import {format} from "date-fns";
import {da, fr} from "date-fns/locale";
import Badge from "../elements/Badge.vue";


const data = ref({
  loading: true,
  course: {
    start_date: null,
    end_date: null,
    name: null,
    modality: null,
    room: null,
    teacher: null,
    mapUrl: null
  },
});

onMounted(() => {
  fetchData();
})

function fetchData() {
  axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/agenda/next/1`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    }
  })
      .then((response) => {
        data.value.course = response.data.result[0];
        data.value.loading = false;
      });
}


// No really a need to do computed property here, but it's cool 😎

const courseSpan = computed(() => {
  return `${format(data.value.course.start_date, 'H\'h\'mm')} - ${format(data.value.course.end_date, 'H\'h\'mm')}`;
});

const googleMapUrl = computed(() => {
  return `https://www.google.com/maps?q=${data.value.course.rooms[0].latitude},${data.value.course.rooms[0].longitude}`;
});

const colorModality = computed(() =>  {
  return data.value.course.modality === 'Présentiel'
      ? 'slate'
      : 'blue';
});

const urlText = computed(() => {
  return `${data.value.course.rooms[0].name}, ${data.value.course.rooms[0].campus} ${data.value.course.rooms[0].floor}`;
});


</script>

<template>
  <Card class="overflow-hidden">

    <h3 class="dark:text-white text-md font-medium uppercase border-b dark:border-slate-700 px-3 py-2 flex items-center gap-x-2">
      <CalendarIcon class="w-5 h-5"/>
      <span>Prochainement</span>
    </h3>

    <div class="px-3 py-2 flex gap-x-2" v-if="data.loading">
      <div class="shrink-0 placeholder-block rounded-md h-32 w-32"></div>
      <div class="flex">
        <div>
          <div class="placeholder-block rounded-md w-24 h-2.5"></div>
          <div class="placeholder-block rounded-md"></div>
          <div class="placeholder-block rounded-md"></div>
        </div>
        <a href="https://www.google.com/maps?q=latitude,longitude" target="_blank"
           class="flex items-center gap-x-1 text-sm text-emerald-500">
          <MapPinIcon class="w-5 h-5"/>
          <span>B12, NATION1 1er étage</span>
        </a>
      </div>
    </div>

    <div class="px-3 py-2 flex gap-x-2 dark:text-white" v-else>
      <ul class="shrink-0 flex flex-col justify-center items-center w-32">
        <li v-text="format(data.course.start_date, 'EEEE', { locale: fr })"></li>
        <li class="font-semibold text-xl" v-text="format(data.course.start_date, 'd')"></li>
        <li class="format(data.course.start_date, 'EEEE', { locale: fr})"></li>
        <li v-text="format(data.course.start_date, 'MMMM', { locale: fr })"></li>
        <li v-text="courseSpan"></li>
      </ul>
      <div class="flex flex-col h-full">
        <div>
          <div class="inline-flex items-center gap-x-2">
            <span v-text="data.course.type"></span>
            <Badge :color="colorModality" v-text="data.course.modality"></Badge>
          </div>
          <h3 class="text-2xl font-semibold" v-text="data.course.name"></h3>
        </div>
        <a v-if="data.course.modality === 'Présentiel'"
           :href="googleMapUrl" target="_blank"
           class="mt-auto inline-flex items-center gap-x-1 text-sm text-emerald-500">
          <MapPinIcon class="w-5 h-5"/>
          <span v-text="urlText"></span>
        </a>
      </div>
    </div>

  </Card>
</template>
