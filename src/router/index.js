import Vue from "vue";
import VueRouter from "vue-router";
import Process from "../views/Process.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/process",
    name: "process",
    component: Process,
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
