<template>
  <q-page class="row stretch justify-center">
    <div class="column justify-center">
      <h4>
        Zoho Campaign Sync configuration
      </h4>
      <q-inner-loading v-if="loading" :showing="loading">
          <q-spinner-audio size="50px" color="purple" />
      </q-inner-loading>
      <div class="" v-else-if="!loading && user && user.team.sync">Your team data is correctly synced</div>
      <div v-else>
        <q-input label="Client Id" v-model="clientId"></q-input>
        <q-input label="Client Secret" v-model="clientSecret"></q-input>
        <q-btn label="Authorize" @click="authorize()" class="q-mt-md full-width"></q-btn>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Sync',
  data() {
    return {
      loading: <boolean>true,
      clientId: <string>'',
      clientSecret: <string>'',
    }
  },
  computed: {
    ...mapGetters('users', [
      'user',
      'accessToken'
    ])
  },
  methods: {
    async authorize() {
      const { clientId, clientSecret } = this;
      const redirectUrl = 'http://localhost:8080/sync/zoho';
      await this.$store.dispatch('users/updateZohoCredentials', { clientId, clientSecret });
      let url = `https://accounts.zoho.com/oauth/v2/auth?client_id=${clientId}&scope=ZohoCampaigns.campaign.ALL,ZohoCampaigns.contact.ALL&response_type=code&redirect_uri=${redirectUrl}&prompt=consent&access_type=offline`
      window.open(url);
    }
  },
  async mounted() {
    if (this.user && this.user.team) {
      this.loading = false;
    } else {
      const resp = await this.$store.dispatch('users/getMe', this.accessToken);
      if (resp) {
        this.loading = false;
      }
    }
  }
});
</script>
