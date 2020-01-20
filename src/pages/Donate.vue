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
        suffix="USD"
        append-icon="mdi-menu-down"
        @click:append="toggleCurrencies"
      ></v-text-field>
      <v-menu
        v-model="showMenu"
        absolute
      >
        <v-list>
          <v-list-item
            v-for="(currency, index) in currencies"
            :key="index"
            @click=""
          >
            <v-list-item-title>{{ currency.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        @click="sendDonate"
      >DONATE</v-btn>
    </v-card-actions>

    <v-dialog
            hide-overlay
            persistent
            width="300"
    >
      <v-card
              color="primary"
              dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Donate',
  data: () => ({
    showMenu: true
  }),
  computed: {
    ...mapGetters([
      'presets',
      'suggestion',
      'currencies',
      'donate',
    ]),
    toggleNavbarIcon() {
      return this.navbarShow ? 'mdi-format-indent-decrease' : 'mdi-format-indent-increase';
    },
  },
  methods: {
    toggleCurrencies() {
      console.log('toggle');
      this.showMenu = !this.showMenu;
    },
    sendDonate() {
      this.$store.dispatch('SendDonate', {amount: 40, currency: 'USD'});
    },
  },
}
</script>
