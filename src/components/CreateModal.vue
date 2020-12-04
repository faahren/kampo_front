<template>
  <q-dialog
      :value="true"
      persistent
      :maximized="true"
      @show="focusI()"
    >
      <q-card class="bg-white text-blue-6">
        <q-bar class="bg-white">
          <q-space />
          <q-btn color="black" dense flat icon="close" @click="close()">
          </q-btn>
        </q-bar>
            <q-page class="column items-stretch justify-center">
              <div class="column col-6 items-stretch text-center">
              <h4>Add a new kampaign</h4>
              <div class="row col-6 justify-center">
                <q-input class="col-xs-11 col-md-6" stretch v-model="kampaignName" label="Enter your kampaign name"  @keypress.enter="createKampaignSubmit()" ref="nameInput"/>
              </div>
              <div class="row col-6 justify-center q-mt-md">
                <q-btn color="blue-4" outline class="q-px-xl" @click="createKampaignSubmit()">

                  <template  v-slot:default>
                    <q-icon name="keyboard_return" class="q-mr-md border-radius-xs q-pa-xs" size="20px"></q-icon>
                    <span>
                    Let's Go
                    </span>
                  </template>
                </q-btn>
              </div>
              <q-banner rounded class="bg-white text-red" v-if="errorMessage">
                <template v-slot:avatar>
                  <q-avatar icon="error" color="white" text-color="red" />
                </template>
                {{errorMessage}}
              </q-banner>
              </div>
            </q-page>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { QInput } from 'quasar';
import { KampaignApiResponse } from '../store/api.service';

export default defineComponent({
  data() {
    return {
      kampaignName: '',
      errorMessage: null,
    }
  },
  methods: {
    async createKampaignSubmit() {
      if (this.kampaignName.length > 5) {
            
        let apiResponse: KampaignApiResponse = await this.$store.dispatch('campaigns/createCampaign', this.kampaignName);
        if (apiResponse.responseStatus){
          const { id } = apiResponse.responseData;
          this.$router.push({name: 'Kampaign', params: { id: id.toString() }})
          return;
        }
        this.errorMessage = apiResponse.responseData.message;
      }
    },
    focusI(){
      (<QInput>this.$refs.nameInput).focus();
    },
    close(){
      this.$emit('close');
    },
  }
});
</script>