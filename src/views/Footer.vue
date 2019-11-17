<template>
  <v-footer app class="footer">
    <v-spacer></v-spacer>
    <div>{{ version }}</div>
  </v-footer>
</template>

<script>
import packageJson from "../../package.json";

export default {
  data: () => ({
    version: packageJson.version,
  }),
};
</script>

<style lang="scss" scoped>
.footer {
  font-size: 10px;
}
</style>
