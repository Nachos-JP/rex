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
      <v-col cols="4">
        <PieChart
          :width="200"
          :height="200"
          :chartData="pieData"
          :options="pieOptions"
        />
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col>
            <hot-table :settings="paramTableSetting"></hot-table>
          </v-col>
          <v-col>
            <hot-table :settings="historyTableSetting"></hot-table>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ipcRenderer} from "electron";
import PieChart from "@/components/PieChart.vue";
import {HotTable} from "@handsontable/vue";

export default {
  components: {
    PieChart,
    HotTable,
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
    paramTableSetting: {
      colHeaders: ["Name", "Best", "Base", "Diff"],
      autoColumnSize: true,
      licenseKey: "non-commercial-and-evaluation",
      columns: [
        {data: "name", readOnly: true},
        {data: "best", readOnly: true},
        {data: "base", readOnly: true},
        {data: "diff", readOnly: true},
      ],
    },
    historyTableSetting: {
      colHeaders: ["ID", "Process"],
      autoColumnSize: true,
      licenseKey: "non-commercial-and-evaluation",
      columns: [
        {data: "id", readOnly: true},
        {data: "process", readOnly: true},
      ],
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
      ipcRenderer.send("run-optimize", {
        url: this.$store.state.url,
      });
    },
    pause(){
      console.log(this.$store.state.inputParameter);
      console.log(this.$store.state.results);
    },
    stop(){
      this.$store.commit("updateProcess");
    },
  },
};
</script>
