import Vue from "vue";
import Vuex from "vuex";
import {remote} from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowIsMax: false,
    inputParameter: [],
    outputParameter: [],
    processRatio: {
      feasible: 10,
      inFeasible: 5,
      error: 12,
    },
    results: [],
    server: {
      optimize: {
        url: null,
        status: false,
      },
      app: {
        url: null,
        status: false,
      },
    },
  },
  mutations: {
    checkWindowIsMax(state){
      const window = remote.getCurrentWindow();
      state.windowIsMax = window.isMaximized();
    },
    updateProcess(state){
      state.processRatio = {
        feasible: Math.floor(Math.random()*101),
        inFeasible: Math.floor(Math.random()*101),
        error: Math.floor(Math.random()*101),
      };
    },
    updateResult(state, payload){
      state.results = [].concat(state.results, payload);
    },
    setServerStatus(state, payload){
      state.server = Object.assign(state.server, payload);
    },
  },
  actions: {
  },
  modules: {
  },
});
