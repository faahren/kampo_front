<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-purple">

        <q-toolbar-title class="text-bold">
          <router-link class="site-title title-font" :to="{name:'Kampaigns'}">Kampo!</router-link>
        </q-toolbar-title>
        <q-btn-dropdown stretch flat>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-icon left name="perm_identity" />
              <div class="text-center">
                Your account              </div>
            </div>
          </template>
          <q-list class="cursor-pointer">
            <q-item>
              <q-item-section  @click="logOut()">
                <q-item-label>Logout</q-item-label>
                <q-item-label caption>Exit and logout</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="clear" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section  @click="goToSync()">
                <q-item-label>Sync settings</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="sync" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { },
  methods: {
    async logOut() {
      await this.$store.dispatch('users/logout');
      await this.$router.push({name: 'SignInPage'});
    },
    goToSync() {
      this.$router.push({name: 'Sync'});
    }
  }
});
</script>

<style lang="scss">
.site-title{
  color:white;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 1.2px;
  font-size: 25px;
}
</style>