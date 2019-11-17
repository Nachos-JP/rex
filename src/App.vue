<template>
  <v-app>
    <SystemBar />

    <AppBar />

    <Navigation />

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import SystemBar from "@/views/SystemBar.vue";
import AppBar from "@/views/AppBar.vue";
import Navigation from "@/views/Navigation.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: "App",
  components: {
    SystemBar,
    AppBar,
    Navigation,
    Footer,
  },
};
</script>
