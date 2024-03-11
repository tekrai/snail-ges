<script>
export default {
  props: {
    to: {
      type: [Object, String],
      required: true
    },
    icon: {
      type: [Object, Function],
      required: true
    }
  },
  name: "Link"
}
</script>

<template>

  <router-link :to="to" class="nav-link">
    <component v-if="icon" :is="icon" class="w-7 h-7" />
    <slot/>
  </router-link>

</template>