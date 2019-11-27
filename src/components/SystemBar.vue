<template>
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
</template>

<script>
import {remote} from "electron";

export default {
  name: "SystemBar",
  computed: {
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
</style>
