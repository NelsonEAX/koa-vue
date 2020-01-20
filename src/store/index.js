import Vue from 'vue';
import Vuex from 'vuex';

import request from '../api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    presets: [],
    suggestion: 0,
    currencies: [],
  },

  getters: {
    presets: state => state.presets,
    suggestion: state => state.suggestion,
    currencies: state => state.currencies,
  },

  mutations: {
    SET_SETTINGS: (state, payload) => {
      state.presets = payload.presets || state.presets;
      state.suggestion = payload.suggestion || state.suggestion;
      state.currencies = payload.currencies || state.currencies;
    },
    /*SET_CURRENCIES: (state, payload) => {
      state.currencies = payload.currencies || state.currencies;
    },
    SET_RATES: (state, payload) => {
      state.rates = payload.rates || state.rates;
    },
    SET_ALL_WALLETS: (state, payload) => {
      state.wallets = payload.wallets || state.wallets;
    },
    SET_HISTORY: (state, payload) => {
      state.history = payload.history || state.history;
    },*/
  },

  actions: {
    Settings: async ({ commit }) => {
      console.log('[Settings]');
      const response = await request('/settings');
      await commit('SET_SETTINGS', response);
      console.log('[Settings] response: ', JSON.stringify(response));
    },

    /*Currencies: async ({ commit }) => {
      console.log('[Currencies]');
      const response = await request('/currencies');
      await commit('SET_CURRENCIES', response);
      console.log('[Currencies] response: ', JSON.stringify(response));
    },

    Rates: async ({ commit }) => {
      console.log('[Rates]');
      const response = await request('/rates');
      await commit('SET_RATES', response);
      console.log('[Rates] response: ', JSON.stringify(response));
    },

    History: async ({ commit }, payload) => {
      console.log('[History]');
      const response = await request('/history', payload);
      await commit('SET_HISTORY', response);
      console.log('[History] response: ', JSON.stringify(response));
    },

    AllWallets: async ({ commit }) => {
      console.log('[Currencies]');
      const response = await request('/wallets/all');
      await commit('SET_ALL_WALLETS', response);
      console.log('[Currencies] response: ', JSON.stringify(response));
    },

    Transaction: async ({ dispatch }, payload) => {
      console.log('[Transaction]');
      const response = await request('/transaction', payload);
      await dispatch('UserWallets');
      console.log('[Transaction] response: ', JSON.stringify(response));
    },*/
  },
});
