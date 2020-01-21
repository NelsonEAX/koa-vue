import Vue from 'vue';
import Vuex from 'vuex';

import request from './api/request';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    presets: [],
    suggestion: 0,
    currencies: [],
    donateResult: {},
  },

  getters: {
    presets: state => state.presets,
    suggestion: state => state.suggestion,
    currencies: state => state.currencies,
      donateResult: state => state.donateResult,
  },

  mutations: {
    SET_SETTINGS: (state, payload) => {
      state.presets = payload.presets || state.presets;
      state.suggestion = payload.suggestion || state.suggestion;
      state.currencies = payload.currencies || state.currencies;
    },
    SET_DONATE: (state, payload) => {
      state.donateResult = payload.ok || false;
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
  },
});
