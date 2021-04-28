<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <TheHeader />
    <v-main>
      <v-tabs
        color="font"
        background-color="background2"
        icons-and-text
        fixed-tabs
      >
        <v-tab to="/"><v-icon>mdi-chart-tree</v-icon>home</v-tab>
        <v-tab to="/list"><v-icon>mdi-format-list-bulleted</v-icon>List</v-tab>
        <v-tab to="/history"><v-icon>mdi-history</v-icon>History</v-tab>
      </v-tabs>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";
import store from "@/store/index.ts";

@Component({
  components: { TheHeader },
})
export default class App extends Vue {
  private created() {
    store.dispatch("getBoardgameList");
  }
}
</script>
