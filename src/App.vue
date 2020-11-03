<template>
  <v-app>
    <Navigation></Navigation>

    <v-app-bar app>
      <v-toolbar-title>{{ navtitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view @nav-title="setNavTitle" />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./views/Navigation";

export default {
  data() {
    return {
      navtitle: "Dashboard"
    }
  },
  components: {
    Navigation
  },
  methods: {
    setNavTitle(title) {
      this.navtitle = title;
    }
  },
}

</script>