<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Optimus Address"
          placeholder="localhost:8989"
          @change="validateUrl"
          :loading="loading"
          :error="error"
          :error-messages="errorMessage"
          :success="success"
          :success-messages="successMessage"
          :value="optimusUrl"
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
    success: false,
  }),
  computed: {
    errorMessage(){
      return this.error ? "Cannot connected to Optimus. Check out URL." : "";
    },
    successMessage(){
      return this.success ? "Success, connected to Optimus." : "";
    },
    optimusUrl(){
      return this.$store.state.url.optimus;
    },
  },
  methods: {
    async validateUrl(url){
      this.loading = true;
      const res = await ipcRenderer.invoke("check-url", url);
      this.error = res ? false : true;
      this.success = res;
      this.$store.commit("setUrl", {optimus: url});
      this.loading = false;
    },
  },
};
</script>
