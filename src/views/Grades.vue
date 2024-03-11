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

const periodsStore = usePeriodsStore();

const data = ref({
  loading: true,
  selectedPeriod: null,
  courses: [{
    name: null,
    exam: null,
    speaker: null,
    grades: null,
    coef: null,
    ects: null,
    average: null,
    teacher_civility: null,
    teacher_first_name: null,
    teacher_last_name: null,
  }]
});

const courses = computed(() => {
  return data.value.courses.filter(course => {
    return course.trimester === periodsStore.options[data.value.selectedPeriod].trimester;
  }).map(course => {
    return {
      name: course.course,
      exam: course.exam,
      speaker: `${course.teacher_civility} ${course.teacher_first_name} ${course.teacher_last_name}`,
      grades: course.grades,
      coefficient: course.coef,
      credits: course.ects,
      credits_color: course.average < 10 ? 'text-red-500': 'text-emerald-500',
      average: course.average
    }
  });
});

const maxGrades = computed(() => {
  return data.value.courses.reduce((max, course) => {
    return course.grades.length > max ? course.grades.length : max;
  }, 0);
});

const points = computed(() => {

})

const fetchData = async (year) => {
  data.value.loading = true;
  await axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/${year}/grades`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    }
  }).then((response) => {
    console.log(response);
    data.value.courses = response.data.result;
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
    <Alert message="Les notes de 0/20 qui apparaissent dans cette rubrique sont attribuées provisoirement dans l'attente de vérification ultérieure des justificatifs d'absence. En cas d'erreur concernant vos notes ou absences, veuillez contacter votre attachée de promotion."/>

    <Card class="px-3 py-2">
      <form action="#">
        <label class="cursor-pointer space-x-2">
          <input type="checkbox" class="custom-checkbox w-5 h-5">
          <span>En cochant cette case, j'autorise <span class="font-semibold">mon tuteur</span> et mon <span
              class="font-semibold">responsable actuels</span> à consulter mes notes ci-dessous.</span>
        </label>
      </form>


    </Card>

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
          <Heading>Coefficient</Heading>
          <Heading>ECTS</Heading>
          <Heading v-for="n in maxGrades" :key="n" v-if="!data.loading">
            CC{{ n }}
          </Heading>
          <Heading>EXAM</Heading>
          <Heading>Moyenne</Heading>
        </template>
        <template v-slot:body>
          <Row v-if="data.loading" class="animate-pulse">
            <Cell colspan="4">
              <div class="h-2.5 w-full bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
            </Cell>
          </Row>
          <Row v-for="(course, index) in courses" v-bind:key="index" v-else>
            <Cell v-text="course.name"></Cell>
            <Cell v-text="course.speaker"></Cell>
            <Cell v-text="course.coefficient"></Cell>
            <Cell :class="course.credits_color" v-text="course.credits"></Cell>
            <Cell v-for="n in maxGrades" :key="n">
              <span v-if="n <= course.grades.length">{{ course.grades[n - 1] }}</span>
              <span v-else>-</span>
            </Cell>
            <Cell v-text="course.exam"></Cell>
            <Cell v-text="course.average"></Cell>
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
