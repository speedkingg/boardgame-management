<template>
  <div>
    <v-card color="background" max-width="500" class="rounded-xl">
      <!-- イメージプレビュー -->
      <ImageLoadFromFirebase
        v-if="boardgameInfo.imagePath"
        :imagePath="boardgameInfo.imagePath"
        :contain="false"
      />
      <NoImage v-else />

      <v-card-text>
        <!-- タイトル -->
        <div class="ml-5 mb-3 mt-5 text-h6 kabairo--text">
          {{ boardgameInfo.title || "名称不明" }}
        </div>

        <!-- 説明 -->
        <div class="d-flex mb-5">
          <v-card
            class="ml-5 caption pa-1 font--text"
            flat
            color="background2"
            width="100%"
          >
            {{ boardgameInfo.description }}
          </v-card>
        </div>

        <!-- 基本情報：人数、時間、年齢 -->
        <v-card
          class="ml-10 caption pa-1 mt-1 d-flex"
          flat
          color="background2"
          v-for="(item, index) in basicInfo"
          :key="index"
        >
          <v-icon color="choujiiro">{{ item.icon }}</v-icon>
          <div class="my-auto d-flex ml-3 font--text">
            {{ item.text }}
          </div>
        </v-card>

        <!-- 評価 -->
        <v-card class="ml-10 caption pa-1 mt-5 d-flex" flat color="background2">
          <v-icon color="haicha" class="mr-2">mdi-account-heart-outline</v-icon>
          <v-rating
            empty-icon="mdi-cards-heart"
            full-icon="mdi-cards-heart"
            background-color="shiroturubami"
            color="kabairo"
            :value="boardgameInfo.star"
            readonly
            small
          />
        </v-card>

        <!-- 購入日 -->
        <v-card class="ml-10 caption pa-1 mt-1 d-flex" flat color="background2">
          <v-icon color="haicha" class="mr-1">mdi-calendar</v-icon>
          <div class="my-auto d-flex ml-3 font--text">
            {{ this.boardgameInfo.purchaseDate.replace(/-/g, "/") }}
          </div>
        </v-card>

        <!-- プレイ回数 -->
        <v-card class="ml-10 caption pa-1 mt-1 d-flex" flat color="background2">
          <v-icon color="haicha" class="mr-1">mdi-counter</v-icon>
          <div class="my-auto d-flex ml-3 font--text">
            <div class="text-subtitle-1">{{ boardgameInfo.playCount }}</div>
            <div class="my-auto ml-2">回遊んだよ。</div>
          </div>
        </v-card>

        <!-- 価格 -->
        <div class="mt-5 d-flex justify-end">
          <div class="font--text">
            {{ `${parseInt(this.boardgameInfo.price).toLocaleString()} 円` }}
          </div>
        </div>

        <v-divider v-if="isLogin" class="my-5" />

        <div v-if="isLogin" class="d-flex">
          <DeleteButton @execDelete="execDelete" class="mr-1" />

          <v-btn depressed @click="showDialog" color="btn">
            <v-icon color="btnIcon">mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-spacer />

          <AddPlayCountBtn :boardgameId="boardgameId" />
        </div>
      </v-card-text>
    </v-card>

    <Dialog
      :maxWidth="maxWidth"
      :isDisplayDialog="isDisplayDialog"
      @closeDialog="closeDialog"
    >
      <RegistrationBoardgameDetail
        v-if="isDisplayDialog"
        :boardgameId="boardgameId"
        :boardgameInfo="boardgameInfo"
        @onSaveSuccessed="closeDialog"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

import store from "@/store/index.ts";
import BoardgameType from "@/type/BoardgameType";
import ImageLoadFromFirebase from "@/components/ImageLoadFromFirebase.vue";
import Dialog from "@/components/Dialog.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import RegistrationBoardgameDetail from "@/components/RegistrationBoardgameDetail.vue";
import AddPlayCountBtn from "@/components/AddPlayCountBtn.vue";
import NoImage from "@/components/NoImage.vue";

@Component({
  components: {
    ImageLoadFromFirebase,
    DeleteButton,
    Dialog,
    RegistrationBoardgameDetail,
    AddPlayCountBtn,
    NoImage,
  },
})
export default class BoardgameDetail extends Vue {
  @Prop() private boardgameId!: string;
  @Prop() private boardgameInfo!: BoardgameType;

  private get basicInfo(): object {
    if (this.boardgameInfo !== undefined) {
      return {
        numberOfPeople: {
          icon: "mdi-human-male-male",
          text: `${this.boardgameInfo.numberOfMinPeople} 〜 ${this.boardgameInfo.numberOfMaxPeople} 人`,
        },
        time: {
          icon: "mdi-clock",
          text: `${this.boardgameInfo.time} 分`,
        },
        age: {
          icon: "mdi-face",
          text: `${this.boardgameInfo.targetAges} 歳〜`,
        },
      };
    }
    return {
      numberOfPeople: {
        icon: "mdi-human-male-male",
        text: "0 〜 0 人",
      },
      time: {
        icon: "mdi-clock",
        text: "0 分",
      },
      age: {
        icon: "mdi-face",
        text: "0 歳〜",
      },
    };
  }

  private get isLogin() {
    return store.getters.isLogin;
  }

  private execDelete() {
    const id = this.boardgameId;
    if (id === undefined) return 0;
    firebase
      .database()
      .ref(`boardgames/${this.boardgameId}`)
      .remove()
      .then(() => {
        if (this.boardgameInfo == undefined) return 0;
        if (this.boardgameInfo.imagePath !== "") {
          this.deleteImageFromFirebaseStorage(id);
        } else {
          store.commit("deleteBoardgame", id);
        }
      })
      .catch((err) => {
        console.error("deleteItemFromFirebaseDatabase was failed:", err);
      });
  }

  private deleteImageFromFirebaseStorage(id: string) {
    const imageFilePath: string = `boardgame-images/${id}`;
    return firebase
      .storage()
      .ref()
      .child(imageFilePath)
      .delete()
      .then(() => {
        store.commit("deleteBoardgame", id);
      })
      .catch((err) => {
        console.error("deleteImageFromFirebaseStorage was failed:", err);
      });
  }

  // dialog control
  private isDisplayDialog: boolean = false;
  private showDialog() {
    this.isDisplayDialog = true;
  }
  private closeDialog() {
    this.isDisplayDialog = false;
  }
  private get maxWidth(): number {
    if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) {
      return 1000;
    } else {
      return 500;
    }
  }
}
</script>
