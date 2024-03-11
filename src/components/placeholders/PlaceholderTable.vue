<script setup>
import Card from "../Card.vue";

const props = defineProps({
  cols: {
    type: Array,
    required: true
  },
  rows: {
    type: Number,
    required: true,
  },
});



</script>

<template>
  <Card>
    <table class="divide-slate-700 min-w-full table-fixed divide-y">
      <thead>
      <tr>
        <th v-for="col in cols" class="uppercase text-slate-400 font-sans font-semibold tracking-wider text-xs px-4 py-6">
          <div class="flex items-center">
            {{ col }}
          </div>
        </th>
      </tr>
      </thead>
      <tbody class="divide-slate-700 divide-y">
      <tr class="hover:bg-slate-900 transition-colors duration-300" v-for="row in rows">
        <td class="whitespace-nowrap text-sm text-white p-4" v-for="col in cols">
          <div class="flex items-center h-4 rounded-md bg-slate-500/40 animate-pulse">

          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </Card>
</template>