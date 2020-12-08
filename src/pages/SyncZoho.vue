<template>
  <q-page class="row stretch justify-center">
    <div class="column justify-center">
      <q-inner-loading :showing="loading">
          <q-spinner-audio size="50px" color="purple" />
      </q-inner-loading>
      <div class="" v-if="success">
        <h4>Success !</h4>
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
      success: <boolean>false,
      error: <string|null>null
    }
  },
  computed: {
    ...mapGetters('users', [
      'user'
    ])
  },
  methods: {
    async validateCode() {
      const code = this.$route.query.code;
      const resp = await this.$store.dispatch('users/updateZohoAuth', code);
      if (!resp.responseStatus) {
        this.error = resp.responseData.message;
        this.loading = false;
        return;
      }
      this.success = true;
      this.loading = false;
    }
  },
  beforeMount() {
    if (!this.$route.query.code){
      this.loading = false;
      this.error = 'Code is missing';
    }
  },
  async mounted() {
    if (this.error) return;
    this.validateCode();
  }
});
</script>
