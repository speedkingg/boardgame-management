<template>
  <v-card
    flat
    color="background2 d-flex flex-column align-center justify-center py-sm-8 mr-xl-4"
  >
    <v-card-title class="font--text">
      <v-icon color="font">mdi-history</v-icon>History
    </v-card-title>
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="(itemList, key, index) in boardgames"
        :key="key"
        :color="yosegizaikuColor(index)"
        icon="mdi-shopping-outline"
        fill-dot
        right
        class="my-16"
      >
        <div class="text-h5" :class="`${yosegizaikuColor(index)}--text`">
          {{ itemList[0].purchaseDate.replace(/-/g, "/") }}
        </div>

        <div v-for="item in itemList" :key="item.id">
          <HistoryTimelineItem :boardgameId="item.id" :boardgameInfo="item" />
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

import BoardgameListType from "@/type/BoardgameListType.ts";
import BoardgameType from "@/type/BoardgameType.ts";

import sortBoardgameList from "@/lib/sortBoardgameList.ts";
import ImageLoadFromFirebase from "@/components/ImageLoadFromFirebase.vue";
import HistoryTimelineItem from "@/components/HistoryTimelineItem.vue";

@Component({
  components: { ImageLoadFromFirebase, HistoryTimelineItem },
})
export default class HistoryTimeline extends Vue {
  private get boardgames(): { [key: string]: BoardgameType[] } {
    const sort = new sortBoardgameList();
    const boardgameList: BoardgameListType = sort.execSort(
      store.getters.boardgameList,
      "purchaseDate",
      "desc"
    );
    // 日付ごとにまとめる
    const purchaseDateKeyBoardgames: { [key: string]: BoardgameType[] } = {};
    for (const key in boardgameList) {
      if (
        purchaseDateKeyBoardgames[boardgameList[key].purchaseDate] == undefined
      ) {
        purchaseDateKeyBoardgames[boardgameList[key].purchaseDate] = [];
      }
      purchaseDateKeyBoardgames[boardgameList[key].purchaseDate].push(
        boardgameList[key]
      );
    }

    return purchaseDateKeyBoardgames;
  }

  private yosegizaikuColor(index: number) {
    return this.colors[index % this.colors.length];
  }

  private colors: string[] = [
    "kasshoku",
    "kabairo",
    "kogecha",
    "kihadairo",
    "kareno",
    "haicha",
    "shiroturubami",
    "choujiiro",
    "gokukogecha",
  ];
}
</script>
