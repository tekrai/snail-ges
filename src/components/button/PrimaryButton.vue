<script>
import Button from "./Button.vue";
export default {
  name: "PrimaryButton",
  components: {
    Button
  }
}
</script>

<template>

  <Button class="bg-emerald-500 hover:bg-emerald-600 text-white outline-offset-2 outline-none outline-dashed focus:outline-emerald-600">
    <slot />
  </Button>

</template>