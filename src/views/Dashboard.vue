<template>
  <v-card flat color="background2">
    <v-row class="d-flex flex-wrap pa-5">
      <v-col cols="12" md="12">
        <DashboardHedgehog :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardTotalPrice :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardTotalCount :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardTotalTime :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardPlayCount :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardNoPlayCount :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="4" md="3" xl="2">
        <DashboardHeartCount :height="cardHeight" />
      </v-col>

      <v-col cols="12" sm="6" md="4" xl="3">
        <DashboardPlayRankingChart
          :height="cardHeight"
          v-if="isInitBoardgameList"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4" xl="3">
        <DashboardPriceChart :height="cardHeight" v-if="isInitBoardgameList" />
      </v-col>

      <v-col cols="12" sm="6" md="4" xl="3">
        <DashboardPersonsChart
          :height="cardHeight"
          v-if="isInitBoardgameList"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4" xl="3">
        <DashboardTimeChart :height="cardHeight" v-if="isInitBoardgameList" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DashboardHedgehog from "@/components/DashboardHedgehog.vue";
import DashboardTotalPrice from "@/components/DashboardTotalPrice.vue";
import DashboardTotalCount from "@/components/DashboardTotalCount.vue";
import DashboardPlayCount from "@/components/DashboardPlayCount.vue";
import DashboardNoPlayCount from "@/components/DashboardNoPlayCount.vue";
import DashboardTotalTime from "@/components/DashboardTotalTime.vue";
import DashboardHeartCount from "@/components/DashboardHeartCount.vue";

import DashboardPriceChart from "@/components/DashboardPriceChart.vue";
import DashboardPersonsChart from "@/components/DashboardPersonsChart.vue";
import DashboardTimeChart from "@/components/DashboardTimeChart.vue";
import DashboardPlayRankingChart from "@/components/DashboardPlayRankingChart.vue";

import store from "@/store/index.ts";

@Component({
  components: {
    DashboardHedgehog,
    DashboardTotalPrice,
    DashboardTotalCount,
    DashboardPlayCount,
    DashboardNoPlayCount,
    DashboardTotalTime,
    DashboardHeartCount,

    DashboardPriceChart,
    DashboardPersonsChart,
    DashboardTimeChart,
    DashboardPlayRankingChart,
  },
})
export default class Dashboard extends Vue {
  private cardHeight: number = 250;
  private get isInitBoardgameList() {
    return store.getters.isInitBoardgameList;
  }
}
</script>
