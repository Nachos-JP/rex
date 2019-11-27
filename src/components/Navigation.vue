<template>
  <v-navigation-drawer
    app
    clipped
    :mini-variant="!isBreak"
    permanent
    mini-variant-width="50"
  >
    <v-list dense>
      <v-list-item
        v-for="(item, i) in navItems"
        :key="i"
        link
        :to="item.url"
        :style="item.style"
      >
        <v-list-item-icon>
          <v-tooltip right :disabled="isBreak">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{ item.icon }}</v-icon>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({
    navItems: [
      {text: "Process", icon: "transform", url: "process", style: ""},
      {text: "Parameter", icon: "tune", url: "parameter", style: ""},
      {text: "Tag", icon: "local_offer", url: "tag", style: ""},
      {text: "Study", icon: "import_contacts", url: "study", style: ""},
      {text: "Run", icon: "play_circle_outline", url: "run", style: ""},
      {
        text: "Setting",
        icon: "settings_applications",
        url: "setting",
        style: "position: absolute; bottom: 0; width: 100%;",
      },
    ],
  }),
  computed: {
    isBreak(){
      return this.$vuetify.breakpoint.lg;
    },
  },
};
</script>
