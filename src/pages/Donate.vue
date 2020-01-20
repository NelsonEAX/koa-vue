<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">DONATE</div>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
          <div
            v-for="preset in presets"
            class="my-2" cols="4"
          >
            <v-btn>{{preset}}</v-btn>
          </div>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-text-field
        label="amount"
        :value="suggestion"
        prefix="$"
        append-icon="mdi-menu-down"
        @click:append="toggleCurrencies"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn block color="primary">DONATE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Donate',
  data: () => ({}),
  computed: {
    ...mapGetters([
      'presets',
      'suggestion',
      'currencies',
    ]),
    toggleNavbarIcon() {
      return this.navbarShow ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase';
    },
  },
  methods: {
    toggleCurrencies() {
      console.log('toggle');
    },
    toggleNavbar() {
      this.$store.dispatch('NavbarToggle');
    },
  },
}
</script>
