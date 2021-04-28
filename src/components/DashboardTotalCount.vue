<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center choujiiro--text"
    :height="height"
    color="kogecha"
    flat
  >
    <div class="text-h2 d-flex">
      <div class="text-h2 d-flex align-end">{{ `${boardgameListCount}` }}</div>
      <div class="text-h5 d-flex align-end ml-2">個</div>
    </div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="choujiiro"
        >mdi-cards-playing-outline</v-icon
      >
      <div class="sub-tile-2 mt-2">合計個数</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardTotalCount extends Vue {
  @Prop() private height?: number;

  private get boardgameListCount() {
    return Object.keys(store.getters.boardgameList).length;
  }
}
</script>
