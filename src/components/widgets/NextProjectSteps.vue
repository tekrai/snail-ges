<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import Card from "../Card.vue";
import {FolderArrowDownIcon, ArrowRightCircleIcon} from "@heroicons/vue/20/solid/index.js";
import {format} from "date-fns";
import Table from "../table/Table.vue";
import Row from "../table/Row.vue";
import Cell from "../table/Cell.vue";



const steps = ref({
  loading: true,
  data: []
});


onMounted(() => {
  fetchData()
})

function fetchData(){
  axios.request({
    method: 'get',
    url: 'https://api.kordis.fr/me/nextProjectSteps',
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    }
  })
  .then((response) => {
    steps.value.data = []
    steps.value.data = response.data.result.map(step => {
      return {
        id: step.pro_id,
        type: step.type,
        course: step.course_name,
        deadline: format(step.psp_limit_date, 'dd/MM'),
      };
    });
    steps.value.loading = false
  });
}
</script>

<template>

  <Card class="overflow-hidden">
    <h3 class="dark:text-white text-md font-medium uppercase px-3 py-2 flex items-center gap-x-2">
      <FolderArrowDownIcon class="w-5 h-5" />
      <span>Prochaines Étapes</span>
    </h3>

    <Table>
      <template #body>
        <Row v-for="(step, index) in steps.data" v-bind:key="index" v-if="steps.loading === false">
          <Cell v-text="step.deadline"></Cell>
          <Cell v-text="step.course"></Cell>
          <Cell>
            <a href="#">
              <ArrowRightCircleIcon class="w-5 h-5 dark:fill-slate-300 dark:hover:fill-slate-200" />
            </a>
          </Cell>
        </Row>
        <Row v-if="steps.loading" class="animate-pulse">
          <Cell>
            <div class="h-2.5 w-full bg-gray-300 dark:bg-slate-700 rounded-md animate-pulse"></div>
          </Cell>
        </Row>
      </template>
    </Table>

  </Card>

</template>

<style scoped>

</style>