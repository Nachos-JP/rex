import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-icons/iconfont/material-icons.css";
import "handsontable/dist/handsontable.full.css";
import {ipcRenderer} from "electron";

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");

window.onresize = () => {
  vm.$store.commit("checkWindowIsMax");
};

ipcRenderer.on("retrieve-particle", (event, arg) => {
  console.log(arg);
});
