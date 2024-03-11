<script setup>

const props = defineProps({
  class: {
    type: String,
    required: false
  }
});

</script>

<template>
  <td class="whitespace-nowrap text-sm dark:text-white p-4" >
    <div class="flex items-center">
     <slot/>
    </div>
  </td>
</template>