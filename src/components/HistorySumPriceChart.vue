<template>
  <v-card
    flat
    color="background2 d-flex flex-column align-center justify-center pa-sm-16 ml-xl-4"
  >
    <v-card-title class="d-flex font--text">
      <v-icon color="font">mdi-currency-jpy</v-icon>
      購入金額の推移
    </v-card-title>
    <LineChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      style="width: 90%"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

import BoardgameListType from "@/type/BoardgameListType.ts";

import sortBoardgameList from "@/lib/sortBoardgameList.ts";
import LineChart from "@/components/chart/LineChart.vue";

@Component({
  components: { LineChart },
})
export default class HistorySumPriceChart extends Vue {
  private lavel: string[] = ["-"];
  private data: number[] = [0];
  private chartColors: string[] = [];

  private created() {
    const sort = new sortBoardgameList();
    const boardgameList: BoardgameListType = sort.execSort(
      store.getters.boardgameList,
      "purchaseDate",
      "asc"
    );
    // 日付ごとにまとめる
    const purchaseDateKeyBoardgames: { [key: string]: number[] } = {};
    for (const key in boardgameList) {
      if (
        purchaseDateKeyBoardgames[boardgameList[key].purchaseDate] == undefined
      ) {
        purchaseDateKeyBoardgames[boardgameList[key].purchaseDate] = [];
      }
      purchaseDateKeyBoardgames[boardgameList[key].purchaseDate].push(
        boardgameList[key].price
      );
    }

    // データトラベルの作成
    let previousDataSum: number = 0;
    for (const purchaseDate in purchaseDateKeyBoardgames) {
      this.lavel.push(purchaseDate);

      const currentDataSum: number =
        purchaseDateKeyBoardgames[purchaseDate].reduce((a, b) => a + b) +
        previousDataSum;

      this.data.push(currentDataSum);
      previousDataSum = currentDataSum;
    }

    for (const i in this.lavel) {
      this.chartColors.push(this.colors[parseInt(i) % this.colors.length]);
    }
  }

  private get colors(): string[] {
    return [
      this.$vuetify.theme.themes.light.kasshoku as string,
      this.$vuetify.theme.themes.light.kabairo as string,
      this.$vuetify.theme.themes.light.kogecha as string,
      this.$vuetify.theme.themes.light.kihadair as string,
      this.$vuetify.theme.themes.light.kareno as string,
      this.$vuetify.theme.themes.light.haicha as string,
      this.$vuetify.theme.themes.light.shiroturubami as string,
      this.$vuetify.theme.themes.light.choujiiro as string,
      this.$vuetify.theme.themes.light.gokukogecha as string,
    ];
  }

  // グラフ用のデータ
  private chartData: Chart.ChartData = {
    labels: this.lavel,
    datasets: [
      {
        type: "line",
        data: this.data,
        fill: true,
        borderColor: this.$vuetify.theme.themes.light.kihadairo as string,
        backgroundColor: this.$vuetify.theme.themes.light
          .shiroturubami as string,
        pointBackgroundColor: this.$vuetify.theme.themes.light.kareno as string,
        pointRadius: 6,
      },
    ],
  };

  // グラフ表示オプション
  private chartOptions: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
        right: 30,
        left: 30,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
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
