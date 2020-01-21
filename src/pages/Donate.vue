<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-4">DONATE</div>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-btn
        v-for="(preset, index) in presetsValue"
        :key="index"
        :color="presetsColor[index]"
        class="my-2"
        @click="setAmountFromSuggestion(preset)"
      >{{presetsFormatValue[index]}}</v-btn>
    </v-card-text>

    <v-card-text>
      <v-text-field
        label="amount"
        v-model="amount"
        dense
        type="number" min="0"
        :prefix="changedCurrency.symbol"
        :suffix="changedCurrency.code"
        append-icon="mdi-menu-down"
        @click:append="toggleCurrenciesMenu"
        @keydown="restrictChars($event)"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        color="primary"
        :disabled="!donatePosible"
        @click="sendDonate"
      >DONATE</v-btn>
    </v-card-actions>

    <v-overlay
      absolute
      :value="showCurrencies"
    >
      <v-list light>
        <v-list-item
          v-for="(currency, index) in currencies"
          :key="index"
          @click="changeCurrency(index)"
        >
          <v-list-item-title>{{ currency.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-overlay>

    <v-overlay
      absolute
      :value="donateOk"
    >
      <v-btn
        color="orange lighten-2"
        @click="donateOk = false"
      >
        Thank you for your donation!
      </v-btn>
    </v-overlay>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Donate',
  data: () => ({
    showCurrencies: false,
    changedCurrencyId: 0,
    donatePosible: true,
    donateOk: false,
    amount: 1,
  }),
  watch: {
    amount: function (newAmount) {
      if (newAmount) {
        this.amount = parseInt(newAmount, 10);
        this.donatePosible = true;
      } else {
        this.donatePosible = false;
      }
    },
  },
  computed: {
    ...mapGetters([
      'presets',
      'suggestion',
      'currencies',
      'donateResult',
    ]),
    changedCurrency() {
      return this.currencies[this.changedCurrencyId] || {};
    },
    presetsValue() {
      return this.presets.map(preset => {
        return this.stepCeil(preset * this.changedCurrency.rate);
      })
    },
    presetsFormatValue() {
      // {{changedCurrency.symbol}}{{preset}}
      return this.presets.map(preset => {
        let symbol = this.changedCurrency.symbol;
        let result = this.stepCeil(preset * this.changedCurrency.rate);
        return `${symbol}${result}`;
      })
    },
    presetsColor () {
      return this.presetsValue.map(preset => {
        return preset === this.amount ? 'primary' : '';
      });
    },
  },
  methods: {
    toggleCurrenciesMenu() {
      this.showCurrencies = !this.showCurrencies;
    },
    changeCurrency(index) {
      let oldIndex = this.changedCurrencyId;
      let result = this.amount;

      this.changedCurrencyId = index;
      this.showCurrencies = false;

      // To USD
      if(oldIndex > 0) {
        result = result / this.currencies[oldIndex].rate;
      }
      //From USD
      if(index > 0) {
        result = result * this.currencies[index].rate;
      }

      this.amount = Math.round(result) || 1;
    },
    restrictChars($event) {
      // Edit value
      if ( (48 <= event.keyCode && event.keyCode <= 57) || event.keyCode === 8) return;

      // Send donate
      if (event.keyCode === 13) return this.sendDonate();

      $event.preventDefault();
    },
    stepCeil(suggestion) {
      let step = 1;
      if(suggestion < 150) step = 30;
      else if(suggestion < 500) step = 50;
      else if(suggestion < 1000) step = 100;
      else if(suggestion < 2500) step = 500;
      else if(suggestion < 10000) step = 1000;
      else if(suggestion < 50000) step = 5000;
      else if(suggestion < 100000) step = 10000;
      else if(suggestion < 500000) step = 50000;

      return Math.ceil(suggestion/step)*step;
    },
    setAmountFromSuggestion(suggestion) {
      this.amount = suggestion;
    },
    sendDonate() {
      this.$store.dispatch('SendDonate', {amount: parseInt(this.amount, 10), currency: this.changedCurrency.code})
              .then(() => { this.donateOk = this.donateResult });
    },
  },
}
</script>
