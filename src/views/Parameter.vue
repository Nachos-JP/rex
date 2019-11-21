<template>
  <v-container fluid fill-height>
    <v-row class="ml-5" style="height:50%;">
      <v-container>
        <v-row>
          <v-chip color="primary" outlined>
            <v-icon left>input</v-icon>
            Input
          </v-chip>
        </v-row>
        <v-row class="mt-2">
          <hot-table :settings="hotSettings"></hot-table>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="ml-5" style="height:50%;">
      <v-container>
        <v-row>
          <v-chip color="primary" outlined>
            <v-icon left>assessment</v-icon>
            Output
          </v-chip>
        </v-row>
        <v-row class="mt-2">
          <hot-table :settings="hotSettings"></hot-table>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import {HotTable} from "@handsontable/vue";
import Handsontable from "handsontable";

export default {
  data: () => ({
    hotSettings: {
      data: Handsontable.helper.createSpreadsheetData(6, 10),
      colHeaders: true,
      licenseKey: "non-commercial-and-evaluation",
    },
  }),
  components: {
    HotTable,
  },
};
</script>
