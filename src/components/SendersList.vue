<template>
  <div class="col-12">
    <q-table
      flat
      :data="availableSenders"
      :pagination="pagination"
      :columns="columns"
      row-key="email"
    >
    <template v-slot:top>
        <div class="row full-width">
          <h4 class="q-ma-xs">Available senders for your team</h4>
          <q-space></q-space>
          <q-input bottom-slots outlined v-model="newSenderEmail" label="Add a sender" dense @keypress.enter="addSender()" :error-message="errorMessage" :error="errorMessage.length > 0">
            <template v-slot:append>
              <q-btn round dense flat icon="add" @click="addSender()"/>
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="actions" :props="props" class="q-gutter-xs">
            <q-btn label="Select" color="green" v-if="!isSelected(props.row.id)" @click="selectSender(props.row.id)"></q-btn>
            <q-btn label="Unselect" color="orange" v-if="isSelected(props.row.id)" @click="unselectSender(props.row.id)"></q-btn>
            <q-btn label="Edit" color="blue"></q-btn>
            <q-btn label="Delete" color="red" @click="deleteSender(props.row.id)"></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { CampaignSenderEmail } from 'src/entities/campaign.entity';
import { mapGetters } from 'vuex';
import { Sender } from '../entities/sender.entity';

export default defineComponent({
  data () {
    return {
      columns: [
        {
          name: 'email',
          required: true,
          label: 'Campaign Name',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          sortable: true
        }
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100,
        rowsNumber: 10
      },
      newSenderEmail: '',
      errorMessage: '',
    }
  },
  computed: {
    ...mapGetters('campaigns', [
      'availableSenders',
      'currentCampaign'
    ])
  },
  async beforeMount(){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$store.dispatch('campaigns/getAvailableSenders');
  },
  methods: {
    rowClik(evt: MouseEvent, row: Sender) {
      // this.$router.push({name: 'Kampaign', params: { id: row.id.toString() }})
    },
    isSelected(id: number): boolean {
      return this.currentCampaign.senderEmails.findIndex((se: CampaignSenderEmail) => se.sender.id === id) > -1
    },
    async addSender() {
      const apiResponse = await this.$store.dispatch('campaigns/createSender', this.newSenderEmail);
      if (apiResponse.responseStatus){
        await this.$store.dispatch('campaigns/getAvailableSenders');
        this.newSenderEmail = '';
        this.errorMessage = '';
      } else {
        this.errorMessage = apiResponse.responseData.message.join('<br>');
      }
    },
    async deleteSender(id: number) {
      await this.$store.dispatch('campaigns/deleteSender', id);
      await this.$store.dispatch('campaigns/getAvailableSenders');
    },
    async selectSender(id: number) {
      await this.$store.dispatch('campaigns/selectSender', id);
    },
    async unselectSender(id: number) {
      await this.$store.dispatch('campaigns/unselectSender', id);
    }
  }
});
</script>