<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center kogecha--text"
    :height="height"
    color="shiroturubami"
    flat
  >
    <div class="text-h2">{{ `¥ ${formatedTotalPrice}` }}</div>
    <div class="d-flex mx-2 align-center justify-center">
      <v-icon class="mt-1 mr-1" color="kogecha">mdi-cash</v-icon>
      <div class="sub-tile-2 mt-2">総購入金額</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class DashboardTotalPrice extends Vue {
  @Prop() private height?: number;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get totalPrice() {
    let total: number = 0;
    for (const item in this.boardgameList) {
      total += parseInt(this.boardgameList[item].price);
    }
    return total;
  }
  private get formatedTotalPrice(): string {
    return this.totalPrice.toLocaleString();
  }
}
</script>
