<script setup>
import NextCourse from "../components/widgets/NextCourse.vue"
import Card from "../components/Card.vue";
import GreetUser from "../components/widgets/GreetUser.vue";
import NextProjectSteps from "../components/widgets/NextProjectSteps.vue";

</script>
<template>

    <div class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-8">

      <GreetUser class="row-start-1" />

      <div class="row-start-3 md:row-span-2">
        <NextProjectSteps />
      </div>

      <NextCourse class="row-start-2 md:row-auto"/>

    </div>

</template>

