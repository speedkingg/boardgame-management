<template>
  <v-card class="rounded-xl pr-1" color="background3" flat>
    <CardTitle
      title="プレイ人数ごとの個数"
      titleColor="kogecha"
      icon="mdi-human-male-male"
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

import BoardgameListType from "@/type/BoardgameListType.ts";
import store from "@/store/index.ts";

@Component({ components: { BarChart, ChartJsPluginDataLabels, CardTitle } })
export default class DashboardPersonsChart extends Vue {
  @Prop() height?: number;

  private lavel: string[] = [];
  private data: number[] = [];

  private created() {
    const boardgameList: BoardgameListType = store.getters.boardgameList;
    const workArray: number[] = [];

    for (const key in boardgameList) {
      workArray.push(
        ...this.range(
          boardgameList[key].numberOfMinPeople,
          boardgameList[key].numberOfMaxPeople
        )
      );
    }
    const uniqueNumberOfPersonList = [...new Set(workArray)];
    uniqueNumberOfPersonList.sort((a, b) => a - b);

    for (const numberOfPerson of uniqueNumberOfPersonList) {
      this.lavel.push(`${numberOfPerson}人`);
      this.data.push(workArray.filter((n) => n == numberOfPerson).length);
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
