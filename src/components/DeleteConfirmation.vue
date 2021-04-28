<template>
  <v-card class="rounded-xl pa-5 d-flex flex-column justify-center">
    <v-icon class="mx-auto mb-5" x-large color="grey">mdi-bomb</v-icon>
    <div class="mx-auto mb-5">このボードゲームを削除しますか？</div>
    <v-card-actions class="d-flex justify-center">
      <v-btn @click="accceptedDelete(false)" class="mx-3">いいえ</v-btn>
      <v-btn @click="accceptedDelete(true)" color="error" class="mx-3">
        はい
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DeleteConfirmation extends Vue {
  @Emit("accceptedDelete")
  private accceptedDelete(isAccepted: boolean) {
    return isAccepted;
  }
}
</script>
