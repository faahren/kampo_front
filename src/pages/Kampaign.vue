<template>
  <q-page>
    <q-page class="row stretch" v-if="loading">
      <q-inner-loading :showing="loading">
          <q-spinner-audio size="50px" color="purple" />
      </q-inner-loading>
    </q-page>
    <q-page class="column stretch q-pa-md" v-if="!loading">
      <div class="row">
        <div class="column justify-center"><h4 class="q-ma-none">{{currentCampaign.title}}</h4></div><q-space/><q-chip :color="currentCampaign.status === 'DRAFT' ? 'yellow' : 'green'">{{currentCampaign.status}}</q-chip>
      </div>
      <q-separator class="q-my-md"/>
      <div class="row q-gutter-md col-grow">
        <q-editor class="col" v-model="editedHtml" min-height="15rem" @input="valueChanged"/>
        <q-list class="col-3" bordered>
          <q-item clickable v-ripple v-for="sender of currentCampaign.senderEmails" v-bind:key="sender.sender.id">
            <q-item-section>{{sender.sender.email}}</q-item-section>
            <q-item-section avatar>
              <q-icon color="green" name="check_circle_outline" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-btn label="Manage senders" color="purple" class="full-width" @click="sendersModal = true"></q-btn>
          </q-item>
        </q-list>

      </div>
      <div class="row q-ma-md">
      <manage-senders-modal v-if="sendersModal" @close="sendersModal = false"></manage-senders-modal>
      </div>
    </q-page>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { debounce, throttle } from 'quasar';
import ManageSendersModal from 'src/components/ManageSendersModal.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  components: { ManageSendersModal },
  name: 'Kampaign',
  data() {
    return {
      loading: false,
      editedHtml: '',
      sendersModal: false,
      debounced: function(){},
      throttled: function(){},
    }
  },
  computed: {
    ...mapGetters('campaigns', [
      'currentCampaign'
    ])
  },
  methods: {
    addCampaignButtonClick() {
      this.createModal = true;
    },
    saveCampaign: debounce((store) => {
      store.dispatch('campaigns/saveCampaign');
    }, 2000),
    valueChanged(e: any) {
      this.updateState(this.$store, this.editedHtml);
      this.saveCampaign(this.$store);
      // f('test', 100);
    },
    updateState: debounce((store, html) => {
      store.commit('campaigns/updateCampaignHtml', html);
    }, 1000),
  },
  async beforeMount() {
    const id = this.$route.params.id;
    this.loading = true;
    await this.$store.dispatch('campaigns/getCurrentCampaign', id)
    this.editedHtml = this.currentCampaign.html ? this.currentCampaign.html : '';
    this.loading = false;
  }
});
</script>
