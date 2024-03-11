<template>
  <div v-if="show" :class="`alert alert-${type}`" role="alert">
    <component :is="iconComponent" class="float-left mr-2 icon w-7 h-7" />
    <span class="text-base">{{ message }}</span>
    <button type="button" class="close" aria-label="Close" @click="closeAlert" v-if="closable">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
// Import the necessary icons
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid';

export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: 'info' // 'success', 'danger', 'warning', 'info'
    },
    closable: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    };
  },
  components: {
    CheckCircleIcon, // success
    InformationCircleIcon, // info
    ExclamationTriangleIcon, // warning
    ExclamationCircleIcon // danger
  },
  computed: {
    iconComponent() {
      switch (this.type) {
        case 'success':
          return 'CheckCircleIcon';
        case 'info':
          return 'InformationCircleIcon';
        case 'warning':
          return 'ExclamationTriangleIcon';
        case 'danger':
          return 'ExclamationCircleIcon';
        default:
          return null; // or some default icon component
      }
    }
  },
  methods: {
    closeAlert() {
      this.show = false;
      this.$emit('closed');
    }
  }
};
</script>

<style scoped>

.alert {
  @apply rounded-md px-3 py-2 w-full
}

.alert-info {
  @apply bg-emerald-400/10 text-emerald-400
}

.alert-danger {
  @apply bg-red-400/10 text-red-400
}

.alert-success {
  @apply bg-green-400/10 text-green-400
}

.alert-warning {
  @apply bg-amber-400/10 text-amber-400
}

</style>