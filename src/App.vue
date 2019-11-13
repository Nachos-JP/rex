<template>
  <v-app>
    <v-system-bar app class="pa-0">
      <v-spacer></v-spacer>
      <v-btn
        v-for="(item, i) in windowBtnItems"
        :key="i"
        @click="controlWindow(item.arg)"
      >
        <v-icon v-text="item.name"></v-icon>
      </v-btn>
    </v-system-bar>
    <v-app-bar
      app
      color="primary"
      dark
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

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import {remote} from "electron";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data: () => ({
    isMax: false,
  }),
  computed: {
    windowBtnItems: function(){
      return [
        {name: "minimize", arg: "min"},
        this.isMax ? {name: "fullscreen_exit", arg: "restore"} :
          {name: "fullscreen", arg: "max"},
        {name: "close", arg: "close"},
      ];
    },
  },
  methods: {
    controlWindow: function(type){
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

      this.isMax = window.isMaximized();
    },
  },
};
</script>
