<script setup>
import Table from "../components/table/Table.vue";
import Alert from "../components/elements/Alert.vue";
import Card from "../components/Card.vue";
import axios from "axios";
import Heading from "../components/table/Heading.vue";
import {computed, onMounted, ref, watch} from "vue";
import Cell from "../components/table/Cell.vue";
import Row from "../components/table/Row.vue";
import Select from "../components/form/Select.vue";
import {usePeriodsStore} from "../store/periods.js";
import Button from "../components/button/Button.vue";
import { DocumentTextIcon, AcademicCapIcon, FolderOpenIcon } from "@heroicons/vue/20/solid"

const periodsStore = usePeriodsStore();

const data = ref({
  loading: true,
  selectedPeriod: null,
  subjects: []
});

const subjects = computed(() => {
  return data.value.subjects.filter(subject => {
    return subject.trimester_id === periodsStore.options[data.value.selectedPeriod].trimester;
  });
});


const fetchData = async (year) => {
  data.value.loading = true;
  await axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/${year}/courses`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    }
  }).then((response) => {
    data.value.subjects = response.data.result;
    data.value.loading = false;
  });
}

onMounted(() => {
  if (!periodsStore.periods.loading){
    data.value.selectedPeriod = periodsStore.options[0].key
  }
});

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
    fetchData(newYear);
  }

});


</script>

<template>

  <div class="space-y-4">

    <Alert message="Cette page vous permet de consulter les matières de vos semestres, en particulier vos supports de cours et syllabi."/>

    <div>
      <Select v-model="data.selectedPeriod">
        <option v-bind:value="period.key" v-text="period.label" v-for="period in periodsStore.options" v-bind:key="period.key"></option>
      </Select>
    </div>

    <Card class="overflow-x-auto overflow-y-hidden">
      <Table>
        <template v-slot:head>
          <Heading>Matière</Heading>
          <Heading>Intervenant</Heading>
          <Heading>Syllabus</Heading>
          <Heading>Coeff</Heading>
          <Heading>ECTS</Heading>
          <Heading>Notes</Heading>
          <Heading>Docs</Heading>
        </template>
        <template v-slot:body>
          <Row v-if="data.loading" class="animate-pulse">
            <Cell colspan="4">
              <div class="h-2.5 w-full bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
            </Cell>
          </Row>
          <Row v-for="(subject, index) in subjects" v-bind:key="index" v-else>
            <Cell v-text="subject.name"></Cell>
            <Cell v-text="subject.teacher"></Cell>
            <Cell>
              <button class="group" :disabled="subject.syllabus_id !== null">
                <DocumentTextIcon class="w-5 h-5 fill-emerald-500 group-disabled:fill-gray-300" />
              </button>
            </Cell>
            <Cell v-text="subject.coef"></Cell>
            <Cell v-text="subject.ects"></Cell>
            <Cell>
              <button class="group" :disabled="subject.has_grades">
                <AcademicCapIcon class="w-5 h-5 fill-emerald-500 group-disabled:fill-gray-300" />
              </button>
            </Cell>
            <Cell>
              <button class="group" :disabled="subject.has_grades">
                <FolderOpenIcon class="w-5 h-5 fill-emerald-500 group-disabled:fill-gray-300" />
              </button>
            </Cell>
          </Row>
        </template>
      </Table>
    </Card>

  </div>



</template>

<style scoped>
.custom-checkbox {
  @apply relative appearance-none bg-white border-2 border-gray-300 rounded px-2 inline-block align-middle cursor-pointer transition-colors;
  @apply checked:bg-emerald-500;
  @apply focus:checked:ring focus:checked:ring-emerald-400;
}


.custom-checkbox:checked::after {
  @apply absolute text-white -translate-x-2/4 -translate-y-2/4 text-xs left-2/4 top-2/4;
  content: '✔';

}

</style>
