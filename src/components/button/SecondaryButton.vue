<script setup>
import Button from "./Button.vue";
</script>

<template>

  <Button class="bg-gray-950 hover:bg-gray-800  dark:bg-slate-400/30 dark:hover:bg-slate-600/40 w-full text-white outline-offset-2 outline-none outline-dashed focus:outline-slate-600">
    <slot />
  </Button>

</template>