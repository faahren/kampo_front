<template>
  <div class="q-pa-md col-12">
    <q-table
      flat
      title="Kampaigns"
      :data="displayedCampaigns"
      :pagination="pagination"
      :columns="columns"
      row-key="id"
      class="row"
      @row-click="rowClik"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Campaign, CampaignSenderEmail } from 'src/entities/campaign.entity';
import { mapGetters } from 'vuex';

export default defineComponent({
  data () {
    return {
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Campaign Name',
          align: 'left',
          field: (row: Campaign) => row.title,
          format: (val: string) => `${val}`,
          sortable: true
        },
        {
          name: 'date',
          required: true,
          label: 'Date Created',
          align: 'left',
          field: (row: Campaign) => row.date_created,
          format: (val: string) => `${new Date(val).toUTCString()}`,
          sortable: true,
          sort: (a:string, b:string) => new Date(a).getTime() - new Date(b).getTime(),
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          field: (row: Campaign) => row.status,
          format: (val: string) => `${val}`,
          sortable: true
        },
        {
          name: 'sendersCount',
          required: true,
          label: 'Number of Senders',
          align: 'left',
          field: (row: Campaign) => row.senderEmails,
          format: (val: CampaignSenderEmail[]) => `${val.length}`,
          sortable: true
        },
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100,
        rowsNumber: 10
      },
    }
  },
  computed: {
    ...mapGetters('campaigns', [
      'displayedCampaigns'
    ])
  },
  async beforeMount(){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$store.dispatch('campaigns/getAllCampaigns');
  },
  methods: {
    async rowClik(evt: MouseEvent, row: Campaign) {
      await this.$router.push({name: 'Kampaign', params: { id: row.id.toString() }})
    }
  }
});
</script>