import Vue from "vue";
import Vuex from "vuex";
import {remote} from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowIsMax: false,
    inputParameter: [...Array(5)].map((v, i)=>({
      name: `variable${i+1}`,
      min: 10,
      base: 20,
      max: 30,
      resolution: 101,
    })),
    outputParameter: [...Array(5)].map((v, i)=>({
      name: `response${i+1}`,
    })),
    processRatio: {
      feasible: 10,
      inFeasible: 5,
      error: 12,
    },
  },
  mutations: {
    checkWindowIsMax(){
      const window = remote.getCurrentWindow();
      this.state.windowIsMax = window.isMaximized();
    },
    updateProcess(){
      this.state.processRatio = {
        feasible: Math.floor(Math.random()*101),
        inFeasible: Math.floor(Math.random()*101),
        error: Math.floor(Math.random()*101),
      };
    },
  },
  actions: {
  },
  modules: {
  },
});
