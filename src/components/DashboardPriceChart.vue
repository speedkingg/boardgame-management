<template>
  <v-card class="rounded-xl pr-1" color="background3" flat>
    <CardTitle
      title="価格帯ごとの個数"
      titleColor="kogecha"
      icon="mdi-diamond-stone"
      iconColor="haicha"
    />
    <HorizontalBarChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      :height="height - 40 || 160"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Chart from "chart.js";

import CardTitle from "@/components/CardTitle.vue";
import HorizontalBarChart from "@/components/chart/HorizontalBarChart.vue";
import store from "@/store/index.ts";

@Component({ components: { HorizontalBarChart, CardTitle } })
export default class DashboardPriceGraph extends Vue {
  @Prop() height?: number;

  private lavel: string[] = [
    "2000円以下",
    "2000円台",
    "3000円台",
    "4000円台",
    "5000円以上",
  ];

  private get graphData(): number[] {
    const boardgameList: { [key: string]: { price: number } } =
      store.getters.boardgameList;
    const priceCountList: number[] = [];
    const priceList: number[] = [];
    let basePrice: number = 2000;
    for (const key in boardgameList) {
      priceList.push(boardgameList[key].price);
    }

    // 2000円以下
    priceCountList.push(priceList.filter((n: number) => basePrice > n).length);

    // 2-5000円の間を千円区切りで
    while (basePrice < 5000) {
      const count = priceList.filter(
        (n: number) => basePrice < n && n < basePrice + 1000
      ).length;
      priceCountList.push(count);
      basePrice += 1000;
    }
    // 5000円以上
    priceCountList.push(priceList.filter((n: number) => basePrice < n).length);

    return priceCountList;
  }
  private get chartColors(): string[] {
    return [
      this.$vuetify.theme.themes.light.kasshoku as string,
      this.$vuetify.theme.themes.light.kabairo as string,
      this.$vuetify.theme.themes.light.kogecha as string,
      this.$vuetify.theme.themes.light.kihadairo as string,
      this.$vuetify.theme.themes.light.kareno as string,
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
