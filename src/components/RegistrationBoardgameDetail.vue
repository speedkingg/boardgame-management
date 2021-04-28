<template>
  <v-card color="background rounded-xl" flat>
    <v-card-text>
      <v-row class="pt-lg-5">
        <v-col cols="12" lg="6">
          <!-- イメージプレビュー -->
          <v-card class="mb-10 pa-4 rounded-xl" color="background2" flat>
            <div class="text-center">
              <v-img
                v-if="isValidImage"
                :src="uploadedImage"
                max-height="200"
                contain
              />
              <v-card
                v-else-if="!!this.boardgameInfo && !!this.boardgameId"
                height="200"
                flat
                class="rounded-xl"
                color="background2"
              >
                <ImageLoadFromFirebase
                  v-if="boardgameInfo.imagePath"
                  :imagePath="boardgameInfo.imagePath"
                  :contain="true"
                />
                <NoImage v-else />
              </v-card>
              <v-icon
                v-else-if="!this.boardgameInfo && !this.boardgameId"
                size="150"
                color="shiroturubami"
                class="ma-16"
              >
                mdi-image-area
              </v-icon>
            </div>
            <v-file-input
              type="file"
              @change="onFileChange"
              show-size
              prepend-icon="mdi-plus-thick"
              placeholder="画像をアップロード"
              dense
            />
            <v-text-field
              v-model="pasetedFileName"
              @paste="onPaste"
              prepend-icon="mdi-plus-thick"
              placeholder="画像をここに貼り付け"
              dense
            />
          </v-card>
        </v-col>

        <v-col cols="12" lg="6">
          <!-- タイトル -->
          <div class="caption kogecha--text kogecha--text">
            {{ displayText.label.title }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-package-variant-closed</v-icon>

            <v-text-field
              :placeholder="displayText.placeholder.title"
              v-model="title"
              class="ml-5"
            />
          </div>

          <!-- 説明 -->
          <div class="caption kogecha--text mt-2">
            {{ displayText.label.description }}
          </div>

          <div class="d-flex mb-4">
            <div class="d-flex align-start mt-5">
              <v-icon color="icon">mdi-clipboard-edit-outline</v-icon>
            </div>
            <v-textarea
              :placeholder="displayText.placeholder.description"
              rows="3"
              v-model="description"
              class="ml-5"
            />
          </div>

          <!-- プレイ人数 -->
          <div class="caption kogecha--text mt-5">
            {{ displayText.label.numberOfPeople }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-human-male-male</v-icon>
            <div class="mt-2 d-flex">
              <div style="width: 40px" class="ml-5">
                <v-text-field
                  v-model.number="numberOfMinPeople"
                  type="number"
                  min="1"
                  dense
                />
              </div>
              <div class="mt-2 ml-2">〜</div>
              <div style="width: 40px" class="ml-5">
                <v-text-field
                  v-model.number="numberOfMaxPeople"
                  type="number"
                  min="1"
                  dense
                />
              </div>
              <div class="mt-2 ml-2 kogecha--text">人</div>
            </div>
          </div>

          <!-- 所要時間 -->
          <div class="caption kogecha--text">
            {{ displayText.label.time }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-clock</v-icon>
            <div class="mt-2 d-flex">
              <div style="width: 40px" class="ml-5">
                <v-text-field
                  v-model.number="time"
                  type="number"
                  min="1"
                  dense
                />
              </div>
              <div class="mt-2 ml-2 kogecha--text">分</div>
            </div>
          </div>

          <!-- 対象年齢 -->
          <div class="caption kogecha--text">
            {{ displayText.label.targetAges }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-face</v-icon>
            <div class="mt-2 d-flex">
              <div style="width: 40px" class="ml-5">
                <v-text-field
                  v-model.number="targetAges"
                  type="number"
                  min="1"
                  dense
                />
              </div>
              <div class="mt-2 ml-2 kogecha--text">歳以上</div>
            </div>
          </div>

          <!-- 評価 -->
          <div class="caption kogecha--text">
            {{ displayText.label.star }}
          </div>
          <div class="d-flex mb-4">
            <v-rating
              empty-icon="mdi-cards-heart"
              full-icon="mdi-cards-heart"
              background-color="shiroturubami"
              color="kabairo"
              v-model.number="star"
              class="ml-7"
            />
          </div>

          <!-- 価格 -->
          <div class="caption kogecha--text">
            {{ displayText.label.price }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-cash</v-icon>
            <div class="mt-2 d-flex">
              <div style="width: 60px" class="ml-5 d-flex justify-end">
                <v-text-field
                  v-model.number="price"
                  type="number"
                  min="0"
                  dense
                />
              </div>
              <div class="ml-2 mt-2 kogecha--text">円</div>
            </div>
          </div>

          <!-- 購入日 -->
          <div class="caption kogecha--text">
            {{ displayText.label.purchaseDate }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon" class="mr-5">mdi-calendar</v-icon>
            <v-menu
              v-model="isDisplayPurchaseDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="purchaseDate"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="purchaseDate"
                locale="ja-jp"
                @input="isDisplayPurchaseDate = false"
                :day-format="(date) => new Date(date).getDate()"
              ></v-date-picker>
            </v-menu>
          </div>

          <!-- プレイした回数 -->
          <div class="caption kogecha--text">
            {{ displayText.label.playCount }}
          </div>
          <div class="d-flex mb-4">
            <v-icon color="icon">mdi-counter</v-icon>
            <div class="mt-2 d-flex">
              <div style="width: 60px" class="ml-5 d-flex justify-end">
                <v-text-field
                  v-model.number="playCount"
                  type="number"
                  min="0"
                  dense
                />
              </div>
              <div class="ml-2 mt-2 kogecha--text">回</div>
            </div>
          </div>

          <div class="d-flex justify-end mt-10">
            <div v-show="isError" class="error--text">登録に失敗しました。</div>
          </div>
          <div class="d-flex justify-end mt-2">
            <v-btn
              @click="formReset"
              color="shiroturubami"
              class="kogecha--text"
            >
              reset
            </v-btn>
            <v-spacer />
            <v-btn
              @click="execSave"
              class="mx-2 btnText--text"
              color="btn"
              :loading="uploadButtonLoading"
            >
              登録する
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { v4 as uuidv4 } from "uuid";
import store from "@/store/index.ts";
import ImageLoadFromFirebase from "@/components/ImageLoadFromFirebase.vue";
import BoardgameType from "@/type/BoardgameType";
import NoImage from "@/components/NoImage.vue";

@Component({
  components: { ImageLoadFromFirebase, NoImage },
})
export default class RegistrationBoardgameDetail extends Vue {
  @Prop() private boardgameId?: string;
  @Prop() private boardgameInfo?: BoardgameType;
  @Prop() private maxWidth?: number;

  @Emit("onSaveSuccessed") private onSaveSuccessed() {}

  private created() {
    if (!!this.boardgameInfo && !!this.boardgameId) {
      this.managedId = this.boardgameId;

      this.title = this.boardgameInfo.title;
      this.description = this.boardgameInfo.description;
      this.star = this.boardgameInfo.star;
      this.time = this.boardgameInfo.time;
      this.numberOfMaxPeople = this.boardgameInfo.numberOfMaxPeople;
      this.numberOfMinPeople = this.boardgameInfo.numberOfMinPeople;
      this.targetAges = this.boardgameInfo.targetAges;
      this.price = this.boardgameInfo.price;
      this.imagePath = this.boardgameInfo.imagePath;
      this.purchaseDate = this.boardgameInfo.purchaseDate;
      this.playCount = this.boardgameInfo.playCount;
    } else {
      this.generateUuid();
    }
  }

  private async generateUuid() {
    let isDuplicate: boolean = true;
    let uuid: string = "";
    while (isDuplicate) {
      uuid = uuidv4();
      await firebase
        .database()
        .ref(`boardgames/${uuid}`)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val() == null) {
            this.managedId = uuid;
            isDuplicate = false;
          }
        });
    }
  }

  // フォーム入力データのモデル
  private title: string = "";
  private description: string = "";
  private star: number = 0;
  private time: number = 0;
  private numberOfMaxPeople: number = 0;
  private numberOfMinPeople: number = 0;
  private targetAges: number = 0;
  private price: number = 0;
  private imagePath: string = "";
  private purchaseDate: string = new Date().toISOString().substr(0, 10);
  private playCount: number = 0;

  private pasetedFileName: string = "";
  private isDisplayPurchaseDate: boolean = false;
  private formData?: BoardgameType;
  private uploadButtonLoading: boolean = false;
  private isError: boolean = false;

  private displayText: object = {
    label: {
      title: "ボードゲームタイトル",
      description: "概要",
      star: "評価",
      time: "１ゲームあたりにかかる時間",
      numberOfPeople: "プレイ人数",
      targetAges: "対象年齢",
      price: "金額",
      playCount: "プレイ回数",
      purchaseDate: "購入日",
    },
    placeholder: {
      title: "カタン",
      description:
        "大航海時代に発見された無人島を複数の入植者たちが開拓していき、もっとも繁栄したプレイヤーが勝利するという内容のボードゲーム。",
    },
  };

  private putFormdataToFirebaseDb() {
    this.formData = {
      id: this.managedId,
      title: this.title,
      description: this.description,
      star: this.star,
      time: this.time,
      numberOfMaxPeople: this.numberOfMaxPeople,
      numberOfMinPeople: this.numberOfMinPeople,
      targetAges: this.targetAges,
      price: this.price,
      imagePath: this.imagePath,
      purchaseDate: this.purchaseDate,
      playCount: this.playCount,
      isDisplay: true,
    };
    return firebase
      .database()
      .ref(`boardgames/${this.managedId}`)
      .set(this.formData);
  }

  // fileアップロード周り
  private uploadedImage: string | ArrayBuffer | null = null;
  private isValidImage: boolean = false;
  private managedId: string = "";

  private onFileChange(file: File) {
    if (file !== undefined) {
      this.displayImage(file);
    } else {
      this.isValidImage = false;
      this.uploadedImage = null;
    }
  }

  // アップロードした画像を表示
  private displayImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImage = e.target !== null ? e.target.result : null;
      this.isValidImage = this.uploadedImage !== null;
    };
    reader.readAsDataURL(file);
  }

  private onPaste(event: {
    clipboardData: {
      items: {
        length: number;
        [key: number]: { type: { indexOf: Function }; getAsFile: Function };
      };
    };
    originalEvent: { clipboardData: { items: { length: number } } };
  }) {
    // use event.originalEvent.clipboard for newer chrome versions
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    // find pasted image among pasted items
    let blob = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }
    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target !== null ? e.target.result : null;
        this.isValidImage = this.uploadedImage !== null;
      };
      reader.readAsDataURL(blob);
    }
  }

  private uploadImageToFirebaseStorage(uploadedImage: string) {
    const imageFilePath: string = `boardgame-images/${this.managedId}`;
    return firebase
      .storage()
      .ref()
      .child(imageFilePath)
      .putString(uploadedImage, "data_url")
      .then((snapshot: object) => {
        if (snapshot !== null) {
          return imageFilePath;
        } else {
          return 0;
        }
      });
  }

  private _uploadImageToFirebaseStorageAndApplyResultToForm() {
    this.putFormdataToFirebaseDb()
      .then(() => {
        this.uploadButtonLoading = false;
        store.commit("addBoardgame", { [this.managedId]: this.formData });
        this.onSaveSuccessed();
      })
      .catch((e) => {
        console.error("putFormdataToFirebaseDb was failed.", e.message);
        this.isError = true;
        this.uploadButtonLoading = false;
      });
  }

  // ボタンクリック時の処理
  private execSave() {
    this.uploadButtonLoading = true;
    this.isError = false;

    if (this.uploadedImage === null) {
      this._uploadImageToFirebaseStorageAndApplyResultToForm();
    } else if (typeof this.uploadedImage === "string") {
      this.uploadImageToFirebaseStorage(this.uploadedImage).then((path) => {
        if (path) {
          this.imagePath = path;
          this._uploadImageToFirebaseStorageAndApplyResultToForm();
        } else {
          console.warn("Failed to upload file to firebase.");
        }
      });
    } else {
      console.warn("Unexpected type:", typeof this.uploadedImage);
      this.isError = true;
      this.uploadButtonLoading = false;
    }
  }
  private formReset() {
    this.title = "";
    this.description = "";
    this.star = 0;
    this.time = 0;
    this.numberOfMaxPeople = 0;
    this.numberOfMinPeople = 0;
    this.targetAges = 0;
    this.price = 0;
    this.imagePath = "";
    this.uploadedImage = null;
    this.isValidImage = false;
    this.purchaseDate = new Date().toISOString().substr(0, 10);
    this.playCount = 0;
    this.pasetedFileName = "";
  }

  private scopedStyle = {
    style: require("@/css/layout.css"),
  };
}
</script>
