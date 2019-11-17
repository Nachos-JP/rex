<template>
  <v-app>
    <v-system-bar app class="pa-0 electron-draggable-area">
      <v-spacer></v-spacer>
      <v-btn
        v-for="(item, i) in windowBtnItems"
        :key="i"
        @click="controlWindow(item.arg)"
        class="electron-nodraggable-area"
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-system-bar>

    <v-app-bar
      app
      color="primary"
      dark
      dense
      clipped-left
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      :mini-variant="!isBreak"
      permanent
      :expand-on-hover="!isBreak"
      mini-variant-width="50"
    >
      <v-list dense>
        <v-list-item v-for="(item, i) in navItems" :key="i" link :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app class="footer">
      <v-spacer></v-spacer>
      <div>{{ version }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import {remote} from "electron";
import packageJson from "../package.json";

export default {
  name: "App",
  components: {
  },
  data: () => ({
    drawer: true,
    version: packageJson.version,
    navItems: [
      {text: "Process", icon: "transform", url: "process"},
      {text: "Parameter", icon: "tune", url: "parameter"},
      {text: "Tag", icon: "local_offer", url: "tag"},
      {text: "Study", icon: "import_contacts", url: "study"},
      {text: "Run", icon: "play_circle_outline", url: "run"},
      {text: "Setting", icon: "settings_applications", url: "setting"},
    ],
  }),
  computed: {
    isBreak(){
      return this.$vuetify.breakpoint.lg;
    },
    windowIsMax(){
      return this.$store.state.windowIsMax;
    },
    windowBtnItems(){
      return [
        {icon: "minimize", arg: "min"},
        this.windowIsMax ? {icon: "fullscreen_exit", arg: "restore"} :
          {icon: "fullscreen", arg: "max"},
        {icon: "close", arg: "close"},
      ];
    },
  },
  methods: {
    controlWindow(type){
      const window = remote.getCurrentWindow();

      switch (type){
        case "min":
          window.minimize();
          break;
        case "max":
          window.maximize();
          break;
        case "restore":
          window.unmaximize();
          break;
        case "close":
          window.close();
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.electron-draggable-area {
  -webkit-app-region: drag;
}

.electron-nodraggable-area {
  -webkit-app-region: no-drag;
}

.footer {
  font-size: 10px;
}
</style>
