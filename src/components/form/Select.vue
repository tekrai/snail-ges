<template>

  <div v-bind:class="{'space-y-1': label }">
    <div v-show="label">
      <label :for="id" class="text-sm capitalize font-semibold dark:text-slate-300">{{ label }}</label>
    </div>
    <select :id="id" v-bind:value="modelValue" v-on:input="updateValue" v-bind="$attrs" v-bind:class="[borderColor]"
            class="px-3 py-2 w-full shadow-sm rounded-md border bg-white dark:bg-slate-700/40 dark:text-slate-300 focus:outline-none ring-1 ring-transparent focus:ring-emerald-400">
      <slot/>
    </select>

    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>


</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  modelValue: {
    required: false
  },
  label: {
    type: String,
    required: false,
  },
  icon: {
    type: [Function],
    required: false
  },
  id: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(['update:modelValue']);


const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
};

const borderColor = computed(() => {
  return props.error ? 'border-red-300' : 'border-gray-300 dark:border-slate-700';
});

</script>
