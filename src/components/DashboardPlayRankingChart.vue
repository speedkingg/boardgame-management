<template>
  <v-card class="rounded-xl pr-1" color="background3" flat>
    <CardTitle
      title="遊んだ回数Top5"
      titleColor="kogecha"
      icon="mdi-medal-outline"
      iconColor="kihadairo"
    />
    <HorizontalBarChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      :height="height - 40 || 160"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";
import HorizontalBarChart from "@/components/chart/HorizontalBarChart.vue";
import CardTitle from "@/components/CardTitle.vue";

import BoardgameListType from "@/type/BoardgameListType.ts";
import sortBoardgameList from "@/lib/sortBoardgameList.ts";

@Component({
  components: { HorizontalBarChart, CardTitle },
})
export default class DashboardPlayRankingChart extends Vue {
  @Prop() private height?: number;

  private lavel: string[] = [];
  private graphData: number[] = [];

  private get boardgameList(): BoardgameListType {
    return store.getters.boardgameList;
  }

  private created() {
    const sort = new sortBoardgameList();
    const sortedBoardgames: BoardgameListType = sort.execSort(
      this.boardgameList,
      "playCount",
      "desc"
    );
    let i: number = 0;
    for (const id in sortedBoardgames) {
      i += 1;
      if (i > 5) break;

      const titleMaxLength: number = 10;
      const ellipsis: string = "…";
      const title: string =
        sortedBoardgames[id].title.length >= titleMaxLength
          ? sortedBoardgames[id].title.slice(
              0,
              titleMaxLength - ellipsis.length
            ) + ellipsis
          : sortedBoardgames[id].title;

      this.lavel.push(title);
      this.graphData.push(sortedBoardgames[id].playCount);
    }
  }

  private get chartColors(): string[] {
    return [
      this.$vuetify.theme.themes.light.kihadairo as string,
      this.$vuetify.theme.themes.light.shiroturubami as string,
      this.$vuetify.theme.themes.light.kabairo as string,
      this.$vuetify.theme.themes.light.kogecha as string,
      this.$vuetify.theme.themes.light.haicha as string,
    ];
  }

  // グラフ用のデータ
  private chartData: Chart.ChartData = {
    labels: this.lavel,
    datasets: [
      {
        type: "horizontalBar",
        label: "",
        data: this.graphData,
        fill: true,
        backgroundColor: this.chartColors,
      },
    ],
  };

  // グラフ表示オプション
  private chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 0,
        bottom: 10,
        right: 30,
        left: 10,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          display: false,
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
}
</script>
