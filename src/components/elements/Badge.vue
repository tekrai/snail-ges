<script>
export default {
  name: "Badge",
  props: {
    color: {
      default: 'blue'
    }
  }
}
</script>

<template>

  <span v-bind:class="`badge badge-${color}`">
    <slot/>
  </span>

</template>

<style scoped>

.badge {
  @apply text-xs font-medium leading-4 items-center inline-flex px-2 py-1 rounded-md
}

.badge-blue {
  @apply bg-blue-500/10 ring-1 ring-blue-500/40 text-blue-500
}

.badge-red {
  @apply bg-red-500/10 ring-1 ring-red-500/40 text-red-500
}

.badge-slate {
  @apply bg-slate-500/10 ring-1 ring-slate-500/40 text-slate-500
}

.badge-emerald {
  @apply bg-emerald-500/10 ring-1 ring-emerald-500/40 text-emerald-500
}

</style>
