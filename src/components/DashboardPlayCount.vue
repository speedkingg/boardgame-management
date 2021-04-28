<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center kihadairo--text"
    :height="height"
    color="haicha"
    flat
  >
    <div class="text-h2 d-flex">
      <div class="text-h2 d-flex align-end">{{ `${totalPlayCount}` }}</div>
      <div class="text-h5 d-flex align-end ml-2">回</div>
    </div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="kihadairo">mdi-counter</v-icon>
      <div class="sub-tile-2 mt-2">遊んだ回数</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardPlayCount extends Vue {
  @Prop() height?: number;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get totalPlayCount() {
    let total: number = 0;
    for (const item in this.boardgameList) {
      total += parseInt(this.boardgameList[item].playCount);
    }
    return total;
  }
}
</script>
