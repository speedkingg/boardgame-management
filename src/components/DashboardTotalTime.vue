<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center kasshoku--text"
    :height="height"
    color="kareno"
    flat
  >
    <div class="text-h2 d-flex">
      <div v-if="formatedTotaltime.day" class="d-flex align-end">
        {{ formatedTotaltime.day }}
        <div class="text-h5">日</div>
      </div>
      <div v-if="formatedTotaltime.hour" class="d-flex align-end">
        {{ formatedTotaltime.hour }}
        <div class="text-h5">時間</div>
      </div>
      <div v-if="formatedTotaltime.minute" class="d-flex align-end">
        {{ formatedTotaltime.minute }}
        <div class="text-h5">分</div>
      </div>
    </div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="kasshoku"> mdi-clock </v-icon>
      <div class="sub-tile-2 mt-2">1回ずつやった時の時間</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardTotalTime extends Vue {
  @Prop() height?: number;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get totaltime() {
    let total: number = 0;
    for (const item in this.boardgameList) {
      total += parseInt(this.boardgameList[item].time);
    }
    return total;
  }
  private get formatedTotaltime(): {
    day?: number;
    hour?: number;
    minute: number;
  } {
    const day: number = Math.floor(this.totaltime / 1440);
    const hour: number = Math.floor((this.totaltime % 1440) / 60);
    const minute: number = Math.floor((this.totaltime % 1440) % 60);
    return { day: day, hour: hour, minute: minute };
  }
}
</script>
