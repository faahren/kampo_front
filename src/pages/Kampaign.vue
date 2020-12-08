<template>
  <q-page>
    <q-page class="row stretch" v-if="loading">
      <q-inner-loading :showing="loading">
          <q-spinner-audio size="50px" color="purple" />
      </q-inner-loading>
    </q-page>
    <q-page class="column stretch q-pa-md" v-if="!loading">
      <div class="row">
        <div class="column justify-center" v-if="!editTitleStatus">
          <h4 class="q-ma-none">{{currentCampaign.title}}<q-icon name="create" class="light-icon q-ml-sm cursor-pointer" @click="editTitle()"></q-icon></h4>
        </div>
        <div class="column justify-center col-grow" v-show="editTitleStatus">
          <q-input ref="titleInput" v-model="editedTitle" dense class="full-width" @keypress.enter="validateTitle()" @keydown.esc="cancelEditTitle()">
            <template v-slot:append>
              <q-btn round dense flat icon="done" @click="validateTitle()"/>
            </template>
          </q-input>
        </div>
        <q-space v-if="!editTitleStatus"/>
        <q-btn label="Sync" class="q-mr-md" color="primary" @click="syncCampaign()"></q-btn>
        <q-chip :color="currentCampaign.status === 'DRAFT' ? 'yellow' : 'green'">{{currentCampaign.status}}</q-chip>
      </div>
      <q-separator class="q-my-md"/>
      <div class="row">
        <q-input dense flat label="Your kampaign subject" v-model="subject" class="full-width q-mb-sm" @input="subjectChanged()"></q-input>
      </div>
      <div class="row q-gutter-md col-grow">
        <q-editor class="col" v-model="editedHtml" min-height="15rem" @input="valueChanged"/>
        <q-list class="col-3" bordered>
          <q-item clickable v-ripple v-for="sender of currentCampaign.senderEmails" v-bind:key="sender.sender.id">
            <q-item-section>{{sender.sender.email}}</q-item-section>
            <q-item-section avatar>
              <q-icon :color="sender.status ? 'green' : 'orange'" name="check_circle_outline" />
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
import { debounce, throttle, QInput } from 'quasar';
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
      subject: '',
      editedTitle: '',
      editTitleStatus: false,
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
      this.updateStateHtml(this.$store, this.editedHtml);
      this.saveCampaign(this.$store);
    },
    subjectChanged(e: any) {
      this.updateStateSubject(this.$store, this.subject);
      this.saveCampaign(this.$store);
    },
    updateStateHtml: debounce((store, html) => {
      store.commit('campaigns/updateCampaignHtml', html);
    }, 1000),
    updateStateSubject: debounce((store, subject) => {
      store.commit('campaigns/updateCampaignSubject', subject);
    }, 1000),
    validateTitle() {
      this.$store.commit('campaigns/updateCampaignTitle', this.editedTitle);
      this.saveCampaign(this.$store);
      this.editTitleStatus = false;
    },
    cancelEditTitle() {
      this.editTitleStatus = false;
      this.editedTitle = this.currentCampaign.title;
    },
    editTitle() {
      this.editTitleStatus = true;
      (<QInput>this.$refs.titleInput).focus();
    }
  },
  async beforeMount() {
    const id = this.$route.params.id;
    this.loading = true;
    await this.$store.dispatch('campaigns/getCurrentCampaign', id)
    this.editedHtml = this.currentCampaign.html ? this.currentCampaign.html : '';
    this.editedTitle = this.currentCampaign.title ? this.currentCampaign.title : '';
    this.subject = this.currentCampaign.subject ? this.currentCampaign.subject : '';
    this.loading = false;
  }
});
</script>
<style lang="scss">
.light-icon{
  color:$grey-4;
  font-size:20px;
}
</style>
