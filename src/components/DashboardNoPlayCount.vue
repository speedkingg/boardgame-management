<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center kabairo--text"
    :height="height"
    color="gokukogecha"
    flat
  >
    <div class="text-h2 d-flex">
      <div class="text-h2 d-flex align-end">{{ `${totalNoPlayCount}` }}</div>
      <div class="text-h5 d-flex align-end ml-2">個</div>
    </div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="kabairo">mdi-heart-broken</v-icon>
      <div class="sub-tile-2 mt-2">1回も遊んでない数</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardNoPlayCount extends Vue {
  @Prop() height?: number;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get totalNoPlayCount() {
    let total: number = 0;
    for (const item in this.boardgameList) {
      const pleyCount: number = this.boardgameList[item].playCount;
      if (pleyCount > 0) continue;
      total += 1;
    }
    return total;
  }
}
</script>
