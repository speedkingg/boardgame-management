<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-end" v-if="!isStatic">
      <v-btn
        @click="displaySort"
        color="btn"
        class="mr-1"
        :outlined="!isDisplaySort"
      >
        <v-icon :color="sortColor"> mdi-sort </v-icon>
        <div :class="`${sortColor}--text`">sort</div>
      </v-btn>

      <v-btn
        @click="displayFilter"
        color="btn"
        class="mr-1"
        :outlined="!isDisplayFilter"
      >
        <v-icon :color="filterColor">mdi-filter </v-icon>
        <div :class="`${filterColor}--text`">Filter</div>
      </v-btn>
    </div>

    <v-scroll-x-reverse-transition>
      <BoardgameListMenuSort v-show="isDisplaySort || isStatic" class="my-1" />
    </v-scroll-x-reverse-transition>

    <v-scroll-x-reverse-transition>
      <BoardgameListMenuFilter
        v-show="isDisplayFilter || isStatic"
        class="my-1"
      />
    </v-scroll-x-reverse-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Dialog from "@/components/Dialog.vue";
import BoardgameListMenuFilter from "@/components/BoardgameListMenuFilter.vue";
import BoardgameListMenuSort from "@/components/BoardgameListMenuSort.vue";

@Component({
  components: {
    Dialog,
    BoardgameListMenuFilter,
    BoardgameListMenuSort,
  },
})
export default class BoardgameListMenu extends Vue {
  @Prop({ default: false }) isStatic?: boolean;

  private isDisplayFilter: boolean = false;
  private isDisplaySort: boolean = false;
  private activeColor = "btnText";
  private disactiveColor = "";

  private get filterColor() {
    return this.isDisplayFilter ? this.activeColor : this.disactiveColor;
  }
  private get sortColor() {
    return this.isDisplaySort ? this.activeColor : this.disactiveColor;
  }
  private get hideColor() {
    return !this.isDisplayFilter && !this.isDisplaySort
      ? this.activeColor
      : this.disactiveColor;
  }

  private displayFilter() {
    this.isDisplayFilter = !this.isDisplayFilter;
  }
  private displaySort() {
    this.isDisplaySort = !this.isDisplaySort;
  }
}
</script>
