<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <h5>Sign in to your Kampo! account</h5>
      <q-input outlined v-model="email" label="Email" />
      <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="Password" @keypress.enter="submitIntent()">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn-group spread>
        <q-btn label="Get into the matrix" push color="purple" @click="submitIntent()" />
      </q-btn-group>

      <q-banner rounded class="bg-white text-red" v-if="errorMessage">
        <template v-slot:avatar>
          <q-avatar icon="error" color="white" text-color="red" />
        </template>
        {{errorMessage}}
      </q-banner>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { KampaignApiResponse } from 'src/store/api.service';

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      email: null,
      password: null,
      isPwd: true,
      errorMessage: null,
    }
  },
  methods: {
    async submitIntent() {
      const { email, password } = this;
      const resp: KampaignApiResponse = await this.$store.dispatch('users/signin', { email, password });
      if (resp.responseStatus) {
        await this.$router.push({name: 'Kampaigns'});
        return;
      }
      this.errorMessage = resp.responseData.message;
    },
  }
});
</script>
