<template>
  <v-card color="background" flat>
    <v-card-title>
      <v-icon color="primary"> mdi-sort </v-icon>
      <div class="primary--text">sort</div>
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-wrap">
        <div
          v-for="(item, key) in sortItem"
          :key="key"
          class="d-flex flex-column align-center justify-center mb-3"
        >
          <BoardgameItemIconAndText
            :color="item.color"
            :icon="item.icon"
            :text="item.text"
            :width="100"
          />
          <BoardgameListMenuSortBtn
            :itemKey="key"
            order="asc"
            :color="item.color"
          />
          <BoardgameListMenuSortBtn
            :itemKey="key"
            order="desc"
            :color="item.color"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoardgameListMenuSortBtn from "@/components/BoardgameListMenuSortBtn.vue";
import BoardgameItemIconAndText from "@/components/BoardgameItemIconAndText.vue";

@Component({
  components: { BoardgameListMenuSortBtn, BoardgameItemIconAndText },
})
export default class BoardgameListMenuSort extends Vue {
  private get sortItem(): object {
    return {
      title: {
        color: "haicha",
        icon: "mdi-text",
        text: "タイトル",
      },
      star: {
        color: "kabairo",
        icon: "mdi-account-heart-outline",
        text: "評価",
      },
      numberOfMaxPeople: {
        color: "kasshoku",
        icon: "mdi-human-male-male",
        text: "最大人数",
      },
      numberOfMinPeople: {
        color: "choujiiro",
        icon: "mdi-human-male",
        text: "最小人数",
      },
      time: {
        color: "haicha",
        icon: "mdi-clock",
        text: "プレイ時間",
      },
      targetAges: {
        color: "kogecha",
        icon: "mdi-face",
        text: "対象年齢",
      },
      price: {
        color: "haicha",
        icon: "mdi-currency-jpy",
        text: "価格",
      },
      playCount: {
        color: "gokukogecha",
        icon: "mdi-counter",
        text: "遊んだ回数",
      },
      purchaseDate: {
        color: "haicha",
        icon: "mdi-calendar",
        text: "購入日",
      },
    };
  }
}
</script>
