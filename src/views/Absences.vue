<script setup>
import XMarkIcon from "@heroicons/vue/20/solid/XMarkIcon.js"
import Card from "../components/Card.vue";
import Select from "../components/form/Select.vue";
import axios from "axios";
import {format} from 'date-fns';
import Alert from "../components/elements/Alert.vue";
import {computed, onMounted, ref, watch} from "vue";
import {usePeriodsStore} from "../store/periods.js";
import Heading from "../components/table/Heading.vue";
import Table from "../components/table/Table.vue";
import Cell from "../components/table/Cell.vue";
import Row from "../components/table/Row.vue";

const periodsStore = usePeriodsStore();


const data = ref({
  loading: true,
  selectedPeriod: null,
  absences: []
});

const absences = computed(() => {
  return data.value.absences.filter(absence => {
    return absence.trimester === periodsStore.options[data.value.selectedPeriod].trimester;
  }).map(absence => {
      return {
        date: format(absence['date'], "MM/dd - HH'h'mm"),
        course: absence['course_name'],
        type: absence['type'] === "m" ? "Absence" : "Retard"
      }
  });
});


const fetchAbsences = async (year) => {

  data.value.loading = true;
  await axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/${year}/absences`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    }
  }).then((response) => {
    data.value.absences = response.data.result
    data.value.loading = false;
  });
}

onMounted(() => {
  if (!periodsStore.periods.loading){
    data.value.selectedPeriod = periodsStore.options[0].key
  }
});

// Watch for changes in the periods store's loading state
watch(() => periodsStore.periods.loading, (newLoadingState) => {
  if (!newLoadingState) {
    data.value.selectedPeriod = periodsStore.options[0].key
  }
});

watch(() => data.value.selectedPeriod, (newPeriod, oldPeriod) => {

  const oldYear = periodsStore.options[oldPeriod]?.year ?? null;
  const newYear = periodsStore.options[newPeriod].year ?? null;

  console.log(oldYear, newYear)

  if (oldYear !== newYear){
    fetchAbsences(newYear);
  }

});


</script>

<template>

  <div class="space-y-6">
    <Alert message="L'administration informe que les absences doivent être justifiées sous 48h."/>

    <div>
      <Select v-model="data.selectedPeriod">
        <option v-bind:value="period.key" v-text="period.label" v-for="period in periodsStore.options" v-bind:key="period.key"></option>
      </Select>
    </div>

    <Card>
      <Table>
        <template v-slot:head>
          <Heading>Date</Heading>
          <Heading>Cours</Heading>
          <Heading>Type</Heading>
          <Heading>Justification</Heading>
        </template>
        <template v-slot:body>
          <Row v-if="data.loading" class="animate-pulse">
            <Cell colspan="4">
              <div class="h-2.5 w-full bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
            </Cell>
          </Row>
          <Row v-for="absence in absences" v-else>
            <Cell v-text="absence['date']"></Cell>
            <Cell v-text="absence['course']"></Cell>
            <Cell v-text="absence['type']"></Cell>
            <Cell>
              <XMarkIcon class="w-5 h-5 text-red-500"/>
            </Cell>
          </Row>
        </template>
      </Table>
    </Card>
  </div>


</template>
