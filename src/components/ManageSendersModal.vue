<template>
  <q-dialog
      :value="true"
      persistent
      :maximized="true"
  >
    <q-card class="bg-white text-blue-6">
        <q-bar class="bg-white">
          <q-space />
          <q-btn color="black" dense flat icon="close" @click="close()">
          </q-btn>
        </q-bar>
      <senders-list></senders-list>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SendersList from './SendersList.vue';

export default defineComponent({
  components: { SendersList },
  methods: {
    close(){
      this.$emit('close');
    },
  }
});
</script>