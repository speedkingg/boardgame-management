<template>
  <div class="d-flex my-3 ml-3" @click="showDialog" style="cursor: pointer">
    <v-card
      class="rounded-lg mr-1"
      height="30px"
      width="30px"
      v-if="!!boardgameInfo.imagePath"
    >
      <ImageLoadFromFirebase
        :imagePath="boardgameInfo.imagePath"
        :contain="false"
      />
    </v-card>
    <div class="font-weight-bold my-auto primary--text">
      {{ boardgameInfo.title || "名称不明" }}
    </div>
    <div class="font--text my-auto ml-1">を購入しました。</div>

    <Dialog
      :maxWidth="maxWidth"
      :isDisplayDialog="isDisplayDialog"
      @closeDialog="closeDialog"
    >
      <BoardgameDetail
        :boardgameId="boardgameId"
        :boardgameInfo="boardgameInfo"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BoardgameType from "@/type/BoardgameType.ts";

import ImageLoadFromFirebase from "@/components/ImageLoadFromFirebase.vue";
import Dialog from "@/components/Dialog.vue";
import BoardgameDetail from "@/components/BoardgameDetail.vue";

@Component({
  components: { ImageLoadFromFirebase, Dialog, BoardgameDetail },
})
export default class HistoryTimelineItem extends Vue {
  @Prop() private boardgameId!: string;
  @Prop() private boardgameInfo!: BoardgameType;

  // dialog control
  private maxWidth: number = 500;
  private isDisplayDialog: boolean = false;
  private showDialog() {
    this.isDisplayDialog = true;
  }
  private closeDialog() {
    this.isDisplayDialog = false;
  }
}
</script>
