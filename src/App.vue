<template>
  <v-app>
    <v-app-bar
      app
      dense
    >
      <v-tabs
        centered
        background-color="transparent"
      >
        <v-tab to="/about">About</v-tab>
        <v-tab to="/donate">Donate</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-container class="container--fluid fill-height">
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'App',
  props: {},
  components: {},
  data: () => ({}),
  created() {
    this.$store.dispatch('Settings');
  },
};
</script>
