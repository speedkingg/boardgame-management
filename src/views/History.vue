<template>
  <v-card color="background3">
    <v-row>
      <v-col cols="12" xl="8">
        <HistorySumPriceChart v-if="isInitBoardgameList" />
      </v-col>
      <v-col cols="12" xl="4"><HistoryTimeline /></v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";
import HistoryTimeline from "@/components/HistoryTimeline.vue";
import HistorySumPriceChart from "@/components/HistorySumPriceChart.vue";

@Component({
  components: { HistoryTimeline, HistorySumPriceChart },
})
export default class History extends Vue {
  private get isInitBoardgameList() {
    return store.getters.isInitBoardgameList;
  }
}
</script>
