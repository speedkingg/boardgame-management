<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-sheet
        style="cursor: pointer"
        class="rounded-xl"
        :elevation="hover ? 10 : 1"
        :height="isGalleryView ? null : cardHight"
        @click="showDialog"
        color="background"
      >
        <v-card
          flat
          tile
          :class="isGalleryView ? 'rounded-xl' : 'rounded-t-xl'"
          :height="isGalleryView ? null : cardPictureHight"
        >
          <ImageLoadFromFirebase
            v-if="boardgameInfo.imagePath"
            :imagePath="boardgameInfo.imagePath"
            :contain="false"
            :aspectRatio="isGalleryView ? null : 1"
          />
          <NoImage v-else />
        </v-card>

        <div v-show="!isGalleryView">
          <div
            class="text-subtitle-2 ml-3 mt-1 text-md-h6 ml-md-5 mt-md-3 textOverFlow font--text"
          >
            {{ boardgameInfo.title || "名称不明" }}
          </div>
          <v-rating
            empty-icon="mdi-cards-heart"
            full-icon="mdi-cards-heart"
            background-color="shiroturubami"
            color="kabairo"
            :value="boardgameInfo.star"
            dense
            readonly
            size="15"
            class="ml-6"
          />

          <div class="d-flex align-end">
            <v-card class="d-flex rounded-xl ml-3" color="background2" flat>
              <v-icon small color="choujiiro" class="ml-2 mr-1"
                >mdi-counter</v-icon
              >
              <div class="choujiiro--text caption mr-2">
                {{ boardgameInfo.playCount }}
              </div>
            </v-card>

            <v-spacer />

            <div class="mr-4 d-flex flex-column">
              <div class="d-flex caption choujiiro--text mx-1">
                <v-icon small color="choujiiro" class="mr-1"
                  >mdi-human-male-male</v-icon
                >
                <div class="my-auto d-flex">
                  <div>{{ boardgameInfo.numberOfMinPeople }}</div>
                  <div>〜</div>
                  <div>{{ boardgameInfo.numberOfMaxPeople }}</div>
                  <div>人</div>
                </div>
              </div>

              <div class="d-flex caption choujiiro--text mx-1">
                <v-icon small color="choujiiro" class="mr-1">mdi-clock</v-icon>
                <div class="my-auto">{{ boardgameInfo.time }} 分</div>
              </div>

              <div class="d-flex caption choujiiro--text mx-1">
                <v-icon small color="choujiiro" class="mr-1">mdi-face</v-icon>
                <div class="my-auto">{{ boardgameInfo.targetAges }} 歳〜</div>
              </div>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-hover>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import BoardgameType from "@/type/BoardgameType";
import ImageLoadFromFirebase from "@/components/ImageLoadFromFirebase.vue";
import Dialog from "@/components/Dialog.vue";
import BoardgameDetail from "@/components/BoardgameDetail.vue";
import NoImage from "@/components/NoImage.vue";

@Component({
  components: {
    ImageLoadFromFirebase,
    BoardgameDetail,
    Dialog,
    NoImage,
  },
})
export default class BoardgameList extends Vue {
  @Prop() private boardgameId!: string;
  @Prop() private boardgameInfo!: BoardgameType;
  @Prop() private cardHight?: number;
  @Prop() private cardPictureHight?: number;
  @Prop() private isGalleryView?: boolean;

  // dialog control
  private maxWidth: number = 500;
  private isDisplayDialog: boolean = false;
  private showDialog() {
    this.isDisplayDialog = true;
  }
  private closeDialog() {
    this.isDisplayDialog = false;
  }

  private scopedStyle = {
    style: require("@/css/layout.css"),
  };
}
</script>
