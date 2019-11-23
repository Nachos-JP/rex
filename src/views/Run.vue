<template>
  <v-container fluid>
    <v-row>
      <v-btn
        v-for="(ctlBtn, i) in controlBtns"
        :key="i"
        @click="call(ctlBtn.method)"
        :color="ctlBtn.color"
        class="ml-3"
      >
        <v-icon>{{ ctlBtn.icon }}</v-icon>
        {{ ctlBtn.text }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {ipcRenderer} from "electron";

export default {
  data: () => ({
    controlBtns: [
      {text: "Run", color: "primary", method: "run", icon: "play_arrow"},
      {text: "Pause", color: "primary", method: "pause", icon: "pause"},
      {text: "Stop", color: "primary", method: "stop", icon: "stop"},
    ],
  }),
  methods: {
    call(methodName){
      this[methodName]();
    },
    run(){
      ipcRenderer.send("run-optimize", "");
    },
    pause(){
      console.log(this.$store.state.inputParameter);
    },
    stop(){
      console.log("stop");
    },
  },
};
</script>
