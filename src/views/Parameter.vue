<template>
  <v-container fluid fill-height>
    <v-row class="ml-5" style="height:50%;">
      <v-container fluid>
        <v-row>
          <v-chip color="primary" outlined>
            <v-icon left>input</v-icon>
            Input
          </v-chip>
        </v-row>
        <v-row class="mt-2">
          <hot-table
            :data="inputTableData"
            :settings="inputTableSetting"
          ></hot-table>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="ml-5" style="height:50%;">
      <v-container fluid>
        <v-row>
          <v-chip color="primary" outlined>
            <v-icon left>assessment</v-icon>
            Output
          </v-chip>
        </v-row>
        <v-row class="mt-2">
          <hot-table
            :data="outputTableData"
            :settings="outputTableSetting"
          ></hot-table>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import {HotTable} from "@handsontable/vue";

export default {
  data: () => ({
    inputTableSetting: {
      colHeaders: ["Name", "Min", "Base", "Max", "Resolution"],
      rowHeaders: true,
      minSpareRows: 1,
      autoColumnSize: true,
      contextMenu: [
        "row_above",
        "row_below",
        "---------",
        "remove_row",
        "---------",
        "undo",
        "redo",
        "---------",
        "copy",
        "cut",
      ],
      licenseKey: "non-commercial-and-evaluation",
      columns: [
        {data: "name", type: "text"},
        {data: "min", type: "numeric"},
        {data: "base", type: "numeric"},
        {data: "max", type: "numeric"},
        {data: "resolution", type: "numeric"},
      ],
    },
    outputTableSetting: {
      colHeaders: ["Name"],
      rowHeaders: true,
      minSpareRows: 1,
      autoColumnSize: true,
      contextMenu: [
        "row_above",
        "row_below",
        "---------",
        "remove_row",
        "---------",
        "undo",
        "redo",
        "---------",
        "copy",
        "cut",
      ],
      licenseKey: "non-commercial-and-evaluation",
      columns: [
        {data: "name", type: "text"},
      ],
    },
  }),
  components: {
    HotTable,
  },
  computed: {
    inputTableData(){
      return this.$store.state.inputParameter;
    },
    outputTableData(){
      return this.$store.state.outputParameter;
    },
  },
};
</script>
