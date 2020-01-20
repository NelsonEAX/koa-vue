import Vue from 'vue';
import Vuex from 'vuex';

import request from '../api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    presets: [],
    suggestion: 0,
    currencies: [],
    donate: {},
  },

  getters: {
    presets: state => state.presets,
    suggestion: state => state.suggestion,
    currencies: state => state.currencies,
    donate: state => state.donate,
  },

  mutations: {
    SET_SETTINGS: (state, payload) => {
      state.presets = payload.presets || state.presets;
      state.suggestion = payload.suggestion || state.suggestion;
      state.currencies = payload.currencies || state.currencies;
    },
    SET_DONATE: (state, payload) => {
      state.donate = payload.donate || state.donate;
    },
  },

  actions: {
    Settings: async ({ commit }) => {
      console.log('[Settings]');
      const response = await request('/settings');
      await commit('SET_SETTINGS', response);
      console.log('[Settings] response: ', JSON.stringify(response));
    },
    SendDonate: async ({ commit }, payload) => {
      console.log('[Donate]');
      const response = await request('/donate', payload);
      await commit('SET_DONATE', response);
      console.log('[Donate] response: ', JSON.stringify(response));
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
