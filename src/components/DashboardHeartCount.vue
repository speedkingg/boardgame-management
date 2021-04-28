<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center kabairo--text"
    :height="height"
    color="shiroturubami"
    flat
  >
    <div class="text-h2 d-flex">
      <div class="text-h2 d-flex align-end">{{ `${totalHeartCount}` }}</div>
      <div class="text-h5 d-flex align-end ml-2">個</div>
    </div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="kabairo">mdi-heart-multiple</v-icon>
      <div class="sub-tile-2 mt-2">つけたハートの数</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardHeartCount extends Vue {
  @Prop() height?: number;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get totalHeartCount() {
    let total: number = 0;
    for (const item in this.boardgameList) {
      total += this.boardgameList[item].star;
    }
    return total;
  }
}
</script>
