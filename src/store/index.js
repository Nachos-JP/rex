import Vue from "vue";
import Vuex from "vuex";
import {remote} from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowIsMax: false,
  },
  mutations: {
    checkWindowIsMax(){
      const window = remote.getCurrentWindow();
      this.state.windowIsMax = window.isMaximized();
    },
  },
  actions: {
  },
  modules: {
  },
});
