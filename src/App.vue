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
import SystemBar from "@/components/SystemBar.vue";
import AppBar from "@/components/AppBar.vue";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

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
