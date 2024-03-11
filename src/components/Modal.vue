<script setup>

import {ref} from "vue";

const isOpen = ref(false);

</script>

<template>

 <teleport to="body">
   <div class="a">

   </div>
   <div>hello world</div>
 </teleport>

</template>