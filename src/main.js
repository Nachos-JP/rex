import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-icons/iconfont/material-icons.css";

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
