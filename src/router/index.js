import Vue from "vue";
import VueRouter from "vue-router";
import Process from "../views/Process.vue";
import Parameter from "../views/Parameter.vue";
import Tag from "../views/Tag.vue";
import Study from "../views/Study.vue";
import Run from "../views/Run.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/process",
    name: "process",
    component: Process,
  },
  {
    path: "/parameter",
    name: "parameter",
    component: Parameter,
  },
  {
    path: "/tag",
    name: "tag",
    component: Tag,
  },
  {
    path: "/study",
    name: "study",
    component: Study,
  },
  {
    path: "/run",
    name: "run",
    component: Run,
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
