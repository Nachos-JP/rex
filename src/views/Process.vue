<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="App Server Address"
          placeholder="http://example.com"
          @change="validateUrl"
          :loading="loading"
          :error="error"
          :error-messages="errorMessage"
          :success="success"
          :success-messages="successMessage"
          :value="appUrl"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ipcRenderer} from "electron";

export default {
  data: () => ({
    loading: false,
    error: false,
    errorReason: null,
    success: false,
  }),
  computed: {
    errorMessage(){
      return this.error ?
        this.errorReason=="optServer" ?
        "At first, set Optimize Server URL in Setting tab" :
        "ERROR" :
        "";
    },
    successMessage(){
      return this.success ? "Success, App Server connectable." : "";
    },
    appUrl(){
      return this.$store.state.server.app.url;
    },
  },
  methods: {
    async validateUrl(url){
      const optimizeServerStatus = this.$store.state.server.optimize.status;
      if (!optimizeServerStatus){
        this.errorReason = "optServer";
        this.error = true;
        return;
      }

      this.loading = true;
      const optimizeServerUrl = this.$store.state.server.optimize.url;
      const res = await ipcRenderer.invoke("check-app-url", {
        optimizeUrl: optimizeServerUrl,
        appUrl: url,
      });
      this.error = res ? false : true;
      this.success = res;
      this.$store.commit("setServerStatus", {
        app: {
          url: url,
          status: res,
        },
      });
      this.loading = false;
    },
  },
};
</script>
