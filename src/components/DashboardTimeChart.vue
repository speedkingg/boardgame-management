<template>
  <v-card class="rounded-xl pr-1" color="background3" flat>
    <CardTitle
      title="プレイ時間ごとの個数"
      titleColor="kogecha"
      icon="mdi-clock"
      iconColor="haicha"
    />
    <BarChart
      :chartData="chartData"
      :chartOptions="chartOptions"
      :height="height - 45 || 140"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Chart from "chart.js";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";

import BarChart from "@/components/chart/BarChart.vue";
import CardTitle from "@/components/CardTitle.vue";

import store from "@/store/index.ts";

@Component({ components: { BarChart, ChartJsPluginDataLabels, CardTitle } })
export default class DashboardTimeChart extends Vue {
  @Prop() height?: number;

  private lavel: string[] = [];
  private data: number[] = [];

  private created() {
    const boardgameList: {
      [key: string]: { time: string };
    } = store.getters.boardgameList;
    const workArray: number[] = [];

    for (const key in boardgameList) {
      workArray.push(parseInt(boardgameList[key].time));
    }
    const uniqueTimeList: number[] = [...new Set(workArray)];
    uniqueTimeList.sort((a, b) => a - b);

    for (const time of uniqueTimeList) {
      this.lavel.push(`${time}分`);
      this.data.push(workArray.filter((n) => n == time).length);
    }
  }

  private range(start: number, end: number): number[] {
    const list: number[] = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }

  private get chartColors(): string[] {
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
        type: "bar",
        label: "",
        data: this.data,
        fill: true,
        backgroundColor: this.chartColors,
      },
    ],
  };

  // グラフ表示オプション
  private chartOptions: Chart.ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      position: "left",
      display: false,
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
        right: 10,
        left: 10,
      },
    },
    scales: {
      yAxes: [
        {
          display: false,
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
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
