<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Server Address"
          placeholder="http://example.com"
          @change="setUrl"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    setUrl(url){
      this.$store.commit("setUrl", url);
    },
  },
};
</script>
