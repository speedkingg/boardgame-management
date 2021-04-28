<template>
  <v-btn depressed @click="asondayo" color="haicha">
    <v-icon color="shiroturubami">mdi-jellyfish-outline</v-icon>
    <div class="mt-1 shiroturubami--text text-subtitle-1">遊んだよ！</div>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/database";

import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class AddPlayCountBtn extends Vue {
  @Prop() private boardgameId!: string;

  private asondayo() {
    firebase
      .database()
      .ref(`boardgames/${this.boardgameId}/playCount`)
      .once("value")
      .then((snapshot) => {
        this.updatePlayCount(snapshot.val() + 1);
        const commit = {
          boardgameId: this.boardgameId,
          count: snapshot.val() + 1,
        };
        store.commit("addBoardgamePlayCount", commit);
      })
      .catch((e) => {
        console.error(
          "get Boardgame playCount was failed",
          this.boardgameId,
          e
        );
      });
  }
  private updatePlayCount(count: number) {
    firebase
      .database()
      .ref(`boardgames/${this.boardgameId}/playCount/`)
      .set(count)
      .catch((e) => {
        console.error(
          "set Boardgame playCount was failed",
          this.boardgameId,
          e
        );
      });
  }
}
</script>
