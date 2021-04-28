<template>
  <v-btn class="d-flex my-1 mx-auto" :color="color" @click="execSort" outlined>
    <v-icon>{{ displayType.icon }}</v-icon>
    <div>{{ displayType.text }}</div>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import store from "@/store/index.ts";
import BoardgameListType from "@/type/BoardgameListType.ts";
import sortBoardgameList from "@/lib/sortBoardgameList.ts";

@Component({
  components: {},
})
export default class BoardgameListMenuSortBtn extends Vue {
  @Prop() private order!: "asc" | "desc";
  @Prop() private itemKey!: string;
  @Prop() private color?: string;

  private get displayType() {
    return this.order === "asc"
      ? { icon: "mdi-sort-numeric-ascending", text: "昇順" }
      : { icon: "mdi-sort-numeric-descending", text: "降順" };
  }

  private get boardgameList(): BoardgameListType {
    return store.getters.boardgameList;
  }

  private execSort() {
    const sort = new sortBoardgameList();
    const newboardgameList: BoardgameListType = sort.execSort(
      this.boardgameList,
      this.itemKey,
      this.order
    );
    store.commit("updateBoardgameList", newboardgameList);
  }
}
</script>
