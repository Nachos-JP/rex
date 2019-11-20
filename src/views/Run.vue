<template>
  <v-btn @click="run" color="primary">Run</v-btn>
</template>

<script>
import {ipcRenderer} from "electron";

export default {
  methods: {
    run(){
      ipcRenderer.send("run-optimize", "");
    },
  },
};
</script>
