<template>
  <q-page class="row stretch">
    <kampaigns-list></kampaigns-list>
     <q-page-sticky position="bottom-right" :offset="[18, 18]" @click="addCampaignButtonClick()">
            <q-btn fab icon="add" color="accent" />
      </q-page-sticky>
      <create-modal v-if="createModal" @close="createModal = false"></create-modal>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CreateModal from 'src/components/CreateModal.vue';
import KampaignsList from 'src/components/KampaignsList.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { KampaignsList, CreateModal },
  data() {
    return {
      createModal: false,
    }
  },
  methods: {
    addCampaignButtonClick() {
      this.createModal = true;
    },
  }
});
</script>
