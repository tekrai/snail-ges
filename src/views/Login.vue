<template>

  <div
      class="p-6 md:-0 md:flex md:items-center md:justify-center bg-slate-900 text-gray-100 w-full min-h-screen h-full mx-auto">

    <div class="w-full max-w-sm">

      <div class="flex flex-col items-center justify-center">
        <img :src="logo" alt="PyGES logo" class="w-32 h-32 object-cover text-center"/>
      </div>


      <form v-on:submit.prevent="login" class="space-y-4">
        <Input id="user" v-model.lazy="data.user" label="Nom d'utilisateur" placeholder="Votre identifiant école"
               autocomplete="off"
               class="text-sm"
               :error="error"/>

        <Input id="pass" v-model.lazy="data.password" label="Mot de passe" type="password"
               placeholder="Votre mot de passe"
               autocomplete="off"
               class="text-sm"
               :error="error"/>


        <div>
          <PrimaryButton type="submit" class="w-full text-sm">
            Se connecter
          </PrimaryButton>
        </div>

      </form>

    </div>

  </div>

</template>

<script setup>
import Input from "../components/form/Input.vue";
import logo from '../assets/snail.png';
import PrimaryButton from "../components/button/PrimaryButton.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

const data = ref({
  user: null,
  password: null
})

const error = ref();

const router = useRouter();

const login = async() => {
  await router.push({name: 'dashboard'})
}

</script>
