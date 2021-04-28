<template>
  <v-card color="background" flat>
    <v-card-title>
      <v-icon color="primary"> mdi-filter </v-icon>
      <div class="primary--text">filter</div>
    </v-card-title>
    <v-card-text>
      <div class="mx-sm-5">
        <div class="d-flex my-5">
          <v-checkbox v-model="isCheckedStar" color="kabairo" />
          <BoardgameItemIconAndText
            color="kabairo"
            icon="mdi-account-heart-outline"
            text="評価"
            :width="checkboxTextWidth"
          />
          <v-rating
            empty-icon="mdi-cards-heart"
            full-icon="mdi-cards-heart"
            background-color="shiroturubami"
            color="kabairo"
            v-model="star"
            class="my-auto mb-auto"
            size="18"
            @input="isCheckedStar = true"
          />
        </div>

        <div class="d-flex my-5">
          <v-checkbox v-model="isCheckedNnumberOfPeople" color="kasshoku" />

          <BoardgameItemIconAndText
            color="kasshoku"
            icon="mdi-human-male-male"
            text="プレイ人数"
            :width="checkboxTextWidth"
          />

          <v-slider
            v-model="numberOfPeople"
            max="10"
            min="0"
            hide-details
            class="my-auto"
            thumb-label="always"
            :thumb-size="20"
            step="1"
            thumb-color="kasshoku"
            color="kasshoku"
            @change="isCheckedNnumberOfPeople = true"
          />
        </div>

        <div class="d-flex my-5">
          <v-checkbox v-model="isCheckedTime" color="haicha" />
          <BoardgameItemIconAndText
            color="haicha"
            icon="mdi-clock"
            text="プレイ時間"
            :width="checkboxTextWidth"
          />
          <v-range-slider
            v-model="timeRange"
            max="90"
            min="0"
            hide-details
            class="my-auto"
            thumb-label="always"
            :thumb-size="20"
            step="5"
            thumb-color="haicha"
            color="haicha"
            @change="isCheckedTime = true"
          />
        </div>

        <div class="d-flex my-5">
          <v-checkbox v-model="isCheckedAges" color="kogecha" />
          <BoardgameItemIconAndText
            color="kogecha"
            icon="mdi-face"
            text="対象年齢(歳〜)"
            :width="checkboxTextWidth"
          />
          <v-slider
            v-model="ages"
            max="18"
            min="0"
            hide-details
            class="my-auto"
            thumb-label="always"
            :thumb-size="20"
            step="1"
            thumb-color="kogecha"
            color="kogecha"
            @change="isCheckedAges = true"
          />
        </div>

        <div class="d-flex my-5">
          <v-checkbox v-model="isCheckedPrice" color="haicha" />

          <BoardgameItemIconAndText
            color="haicha"
            icon="mdi-currency-jpy"
            text="価格"
            :width="checkboxTextWidth"
          />
          <v-range-slider
            v-model="priceRange"
            max="10000"
            min="0"
            hide-details
            class="my-auto"
            thumb-label="always"
            thumb-size="30"
            step="500"
            thumb-color="haicha"
            color="haicha"
            @change="isCheckedPrice = true"
          />
        </div>
      </div>

      <v-divider class="my-5" />

      <div class="d-flex">
        <v-spacer />
        <v-btn @click="filterReset" class="mx-1" color="secondary" outlined>
          <v-icon>mdi-filter-off</v-icon>
          クリア
        </v-btn>

        <v-btn @click="execFilter" color="btn" class="mx-1 btnText--text">
          絞り込む
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import store from "@/store/index.ts";
import BoardgameListType from "@/type/BoardgameListType.ts";
import BoardgameItemIconAndText from "@/components/BoardgameItemIconAndText.vue";

@Component({
  components: { BoardgameItemIconAndText },
})
export default class BoardgameListMenuFilter extends Vue {
  private star: number = 3;
  private isCheckedStar: boolean = false;
  private timeRange: number[] = [0, 30];
  private isCheckedTime: boolean = false;
  private ages: number = 4;
  private isCheckedAges: boolean = false;
  private numberOfPeople: number = 4;
  private isCheckedNnumberOfPeople: boolean = false;
  private priceRange: number[] = [0, 2000];
  private isCheckedPrice: boolean = false;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private execFilter() {
    let newboardgameList: BoardgameListType = this.boardgameList;

    if (this.isCheckedStar && Object.keys(newboardgameList).length !== 0) {
      newboardgameList = this.boardgameListiFlter(
        (key: string) => newboardgameList[key].star === this.star,
        newboardgameList
      );
    }

    if (this.isCheckedTime && Object.keys(newboardgameList).length !== 0) {
      const [min, max] = this.timeRange;
      const ConditionalFunction: Function = (key: string) =>
        newboardgameList[key].time >= min && newboardgameList[key].time <= max;

      newboardgameList = this.boardgameListiFlter(
        ConditionalFunction,
        newboardgameList
      );
    }

    if (this.isCheckedAges && Object.keys(newboardgameList).length !== 0) {
      newboardgameList = this.boardgameListiFlter(
        (key: string) => newboardgameList[key].targetAges >= this.ages,
        newboardgameList
      );
    }

    if (
      this.isCheckedNnumberOfPeople &&
      Object.keys(newboardgameList).length !== 0
    ) {
      const ConditionalFunction: Function = (key: string) =>
        newboardgameList[key].numberOfMinPeople <= this.numberOfPeople &&
        newboardgameList[key].numberOfMaxPeople >= this.numberOfPeople;

      newboardgameList = this.boardgameListiFlter(
        ConditionalFunction,
        newboardgameList
      );
    }

    if (this.isCheckedPrice && Object.keys(newboardgameList).length !== 0) {
      const [min, max] = this.priceRange;
      const ConditionalFunction: Function = (key: string) =>
        newboardgameList[key].price >= min &&
        newboardgameList[key].price <= max;

      newboardgameList = this.boardgameListiFlter(
        ConditionalFunction,
        newboardgameList
      );
    }

    store.commit("updateBoardgameList", newboardgameList);
  }

  private filterReset() {
    const resetedBoardgameList = this.boardgameListiFlter(
      () => true,
      this.boardgameList
    );
    store.commit("updateBoardgameList", resetedBoardgameList);
    this.isCheckedStar = false;
    this.isCheckedTime = false;
    this.isCheckedAges = false;
    this.isCheckedNnumberOfPeople = false;
    this.isCheckedPrice = false;
  }

  private boardgameListiFlter(
    conditions: Function,
    boardgameList: BoardgameListType
  ): BoardgameListType {
    let filteredBoardgameList: BoardgameListType = {};

    for (const key in boardgameList) {
      let isDisplay = true;
      if (!conditions(key)) isDisplay = false;

      filteredBoardgameList = {
        ...filteredBoardgameList,
        [key]: {
          ...boardgameList[key],
          isDisplay: isDisplay,
        },
      };
    }
    return filteredBoardgameList;
  }

  private get checkboxTextWidth(): number {
    return 110;
  }
}
</script>
