<template>
  <q-page class="row items-center justify-evenly">
    <sign-in></sign-in>
  </q-page>
</template>

<script lang="ts">
import SignIn from 'components/SignIn.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignInPage',
  components: { SignIn },
});
</script>
