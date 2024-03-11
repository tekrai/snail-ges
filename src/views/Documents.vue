<script setup>

import {computed, onMounted, ref} from "vue";
import ArrowDownTrayIcon from "@heroicons/vue/20/solid/ArrowDownTrayIcon.js";
import Card from "../components/Card.vue";
import axios from "axios";
import Input from "../components/form/Input.vue";
import Select from "../components/form/Select.vue";
import SecondaryButton from "../components/button/SecondaryButton.vue";
import Table from "../components/table/Table.vue";
import Heading from "../components/table/Heading.vue";
import Row from "../components/table/Row.vue";
import Cell from "../components/table/Cell.vue";
import Button from "../components/button/Button.vue";


const documents = ref([]);

const year = ref(new Date().getFullYear());

const searchFilter = ref();

const filteredDocuments = computed(() => {
  if (!searchFilter.value) {
    return documents.value; // If no search term is provided, return all documents
  }
  // Filter documents based on the search term
  return documents.value.filter((document) => {
    // Assuming 'name' is the property you want to search by
    return document.name.toLowerCase().includes(searchFilter.value.toLowerCase());
  });
});



onMounted(() => {
  fetchDocuments()
});

const fetchDocuments = () => {
    axios.request({
      method: 'get',
      url: `https://api.kordis.fr/me/${year.value}/annualDocuments`,
      headers: {
        'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
      }
    })
    .then((response) => {
      documents.value = response.data.result;
    });
};

const downloadDocument = (documentId) => {

  let document = documents.value.find(el => el['document_id'] === documentId);

  if(!document){
    return;
  }

  axios.request({
    method: 'get',
    url: `https://api.kordis.fr/me/annualDocuments/${documentId}`,
    headers: {
      'Authorization': 'Bearer 2c16c5ed-58e2-4f04-84c6-8d24c88867d9'
    },
    responseType: 'blob',
  })
  .then((response) => {
    console.log(response.data);

  }).catch((error) => {
    console.log('Could not retrieve document, sorry !', error.response.status)
  });

};

</script>

<template>


  <div class="mb-6 flex gap-x-2">
    <Select v-model="year" class="w-24" v-on:change="fetchDocuments">
      <option value="2023">2023</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
    </Select>
    <Input v-model="searchFilter" type="search" placeholder="Rechercher un document" class="w-full" />
  </div>

  <Card>
    <Table>
      <template #head>
        <Heading>Catégorie</Heading>
        <Heading>Nom</Heading>
        <Heading>Mise à jour</Heading>
        <Heading></Heading>
      </template>
      <template v-slot:body>
        <Row v-for="document in filteredDocuments">
          <Cell v-text="document['category']" />
          <Cell v-text="document['name']" />
          <Cell v-text="document['last_update']" />
          <Cell>
            <Button v-on:click="downloadDocument(document['document_id'])" class="text-sm w-9 h-9 rounded-full flex justify-center gap-x-2">
              <ArrowDownTrayIcon class="w-5 h-5 text-emerald-500" />
              Télécharger
            </Button>
          </Cell>
        </Row>
      </template>
    </Table>
  </Card>

</template>
