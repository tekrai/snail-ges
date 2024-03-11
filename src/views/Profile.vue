<script setup>

import {useProfileStore} from "../store/profile.js";
import Alert from "../components/elements/Alert.vue";
import Card from "../components/Card.vue";
import PrimaryButton from "../components/button/PrimaryButton.vue";
import Input from "../components/form/Input.vue";
import Select from "../components/form/Select.vue";
import {format} from "date-fns";

const userProfile = useProfileStore();

</script>

<template class="">

  <Alert
      message="Cette page ne sert pour l'instant qu'à afficher vos informations. Inutile d'essayer d'envoyer le formulaire 😆 "/>

  <Card class="mt-6">
    <form v-on:submit.prevent="console.log('Hourra... You did... Nothing')" action="#" class="p-8 space-y-6">

      <section class="px-3 py-2 w-full space-y-4">
        <div class="leading-loose">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Administratif</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300">L'INE est le numéro demandé pour payer la CVEC (sauf
            qu'en passant par ici, pas besoin 😜)</p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <Input label="Numéro d'étudiant" v-bind:model-value="userProfile.profile.data.student_id" :disabled="true"/>
          <Input label="I.N.E" v-bind:model-value="userProfile.profile.data.ine" :disabled="true"/>
        </div>
      </section>

      <section class="px-3 py-2 w-full space-y-4">

        <div class="leading-loose">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Profil</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300">Les informations suivantes te concerne tout
            particulièrement. Qui es-tu ? C'est écrit ici.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <Input label="Civilité" v-bind:model-value="userProfile.profile.data.civility" :disabled="true"/>
          <Input label="Prénom" v-bind:model-value="userProfile.profile.data.firstname" :disabled="true"/>
          <Input label="Nom" v-bind:model-value="userProfile.profile.data.name" :disabled="true"/>

          <Input type="date" v-bind:model-value="format(userProfile.profile.data.birthday ?? new Date(), 'yyyy-MM-dd')"
                 label="Date de naissance" :disabled="true"/>
          <Input label="Lieu de naissance" v-bind:model-value="userProfile.profile.data.birthplace" :disabled="true"/>
          <Input label="Pays de naissance" v-bind:model-value="userProfile.profile.data.birth_country"
                 :disabled="true"/>
        </div>
      </section>

      <hr>

      <section class="px-3 py-2 w-full space-y-4">
        <div class="leading-loose">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Adresse</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300">Ou vis-tu ? C'est écrit ici.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <Input label="Rue" v-bind:model-value="userProfile.profile.data.address1" :disabled="true"/>
          <Input label="Rue" v-bind:model-value="userProfile.profile.data.city" :disabled="true"/>
          <Input label="Rue" v-bind:model-value="userProfile.profile.data.zipcode" :disabled="true"/>
          <Input label="Rue" v-bind:model-value="userProfile.profile.data.country" :disabled="true"/>
        </div>
      </section>

      <hr>

      <section class="px-3 py-2 w-full space-y-4">
        <div class="leading-loose">
          <h3 class="text-base font-semibold leading-7 text-gray-900 dark:text-slate-200">Contact</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300">Cette personne sera contacté en cas d'urgence uniquement.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <Select label="Numéro d'étudiant" :disabled="true">
            <option value="dad" selected>Papa</option>
            <option value="mom">Maman</option>
            <option value="please">Please Stop Brother</option>
            <option value="lost">I think you got lost</option>
          </Select>
          <Input label="Nom" v-bind:model-value="userProfile.profile.data.emergency_contact.name" :disabled="true"/>
          <Input label="Prénom" v-bind:model-value="userProfile.profile.data.emergency_contact.firstname" :disabled="true"/>
          <Input label="Téléphone Portable" v-bind:model-value="userProfile.profile.data.emergency_contact.mobile" :disabled="true"/>
          <Input label="Téléphone Fixe" v-bind:model-value="userProfile.profile.data.emergency_contact.telephone" :disabled="true"/>
          <Input label="Téléphone Pro" v-bind:model-value="userProfile.profile.data.emergency_contact.work_phone" :disabled="true"/>
        </div>
      </section>


      <div class="flex justify-end  ">
        <PrimaryButton type="submit" class="sm:w-36">
          Enregistrer
        </PrimaryButton>
      </div>

    </form>
  </Card>


</template>