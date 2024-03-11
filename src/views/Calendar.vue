<script setup>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr';  // Import French locale as an example
import { startOfWeek, endOfWeek } from 'date-fns';


import {computed, onMounted, ref} from "vue";
import axios from "axios";


const data = ref({
  start: startOfWeek(new Date(), { weekStartsOn: 1 }).valueOf(),
  end: endOfWeek(new Date(), { weekStartsOn: 1 }).valueOf(),
  isLoading: true,
  fullcalendarOptions: {
    plugins: [timeGridPlugin],
    initialView: window.innerWidth < 768 ? 'timeGridDay' : 'timeGridWeek',
    events: [],
    locale: frLocale,
    dayHeaderFormat: {
      weekday: 'long',
      day: 'numeric'
    },
    allDaySlot: false,
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      meridiem: false,
      omitZeroMinute: true,
      suffix: 'h'  // Add 'h' suffix to the hour
    },
    datesSet: (dateInfo) => {
      const newStart = startOfWeek(dateInfo.start, { weekStartsOn: 1 }).valueOf();
      const newEnd = endOfWeek(dateInfo.end, { weekStartsOn: 1 }).valueOf();

      if (isDifferentWeek(newStart, newEnd)) {
        data.value.start = newStart;
        data.value.end = newEnd;
        fetchData(newStart, newEnd);
      }
    },

  }
})

function isDifferentWeek(newStart, newEnd) {
  return data.value.start !== newStart || data.value.end !== newEnd;
}

function fetchData(start, end) {
  axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/agenda?start=${start}&end=${end}`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    },
    responseType: "json"
  })
  .then((response) => {
    data.value.fullcalendarOptions.events = response.data.result.map(event => ({
      title: event.name,
      start: new Date(event.start_date),
      end: new Date(event.end_date),
      // ... other properties ...
    })
    );
  })
  .catch((error) => {
    console.log(error);
  });
}

onMounted(() => {
  fetchData(data.value.start, data.value.end)
})

</script>
<template>

  <FullCalendar :options="data.fullcalendarOptions" >
    <template v-slot:eventContent='arg'>
      <b>{{ arg.event.title }}</b>
    </template>
  </FullCalendar>

</template>

<style scoped>
.fc .fc-scroller-harness .fc-scroller{
  @apply overflow-auto !important;
}

.fc thead[role="presentation"] > tr[role="row"] th[role="columnheader"] {
  @apply text-slate-300 font-light
}

.fc thead[role="presentation"] > tr[role="row"] th[role="columnheader"].fc-day-today{
  @apply font-medium text-emerald-500
}

.fc .fc-timegrid-slot .fc-timegrid-slot-label .fc-scrollgrid-shrink {
  @apply text-red-400 !important
}



.fc .fc-button-group > .fc-button {
  @apply bg-transparent border-none w-full text-slate-600 hover:text-white transition-all duration-300 focus:bg-transparent focus:outline-none
}

.fc .fc-button-group .fc-button-primary:not(:disabled):active:focus{
  @apply shadow-none border-none
}

.fc-theme-standard .fc-scrollgrid {
  @apply border-none
}

.fc thead[role="presentation"]{
  @apply border border-red-400
}

.fc .fc-button-group > .fc-button:focus {
  @apply z-0 shadow-none
}

.fc .fc-toolbar-chunk .fc-toolbar-title {
  @apply text-slate-100 text-lg md:text-xl
}
</style>