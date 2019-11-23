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
    <v-row>
      <v-col>
        <PieChart :chartData="pieData" :options="pieOptions" />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ipcRenderer} from "electron";
import PieChart from "@/components/PieChart.vue";

export default {
  components: {
    PieChart,
  },
  data: () => ({
    controlBtns: [
      {text: "Run", color: "primary", method: "run", icon: "play_arrow"},
      {text: "Pause", color: "primary", method: "pause", icon: "pause"},
      {text: "Stop", color: "primary", method: "stop", icon: "stop"},
    ],
    pieOptions: {
      plugins: {
        datalabels: {
          color: "white",
          font: {
            weight: "bold",
            size: 22,
          },
        },
      },
    },
  }),
  computed: {
    pieData(){
      const process = this.$store.state.processRatio;
      return {
        labels: ["Feasible", "Infeasible", "Error"],
        datasets: [{
          label: "ttt",
          data: [process.feasible, process.inFeasible, process.error],
          backgroundColor: [
            "green",
            "orange",
            "red",
          ],
        }],
      };
    },
  },
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
      this.$store.commit("updateProcess");
    },
  },
};
</script>
