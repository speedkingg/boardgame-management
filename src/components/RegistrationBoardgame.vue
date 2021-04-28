<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-sheet
        style="cursor: pointer"
        class="rounded-xl pb-4 d-flex align-center justify-center"
        :elevation="hover ? 10 : 1"
        :height="cardHight"
        @click="showDialog"
        color="background"
      >
        <div class="d-fex flex-column">
          <div class="d-flex justify-center">
            <v-icon x-large color="haicha">mdi-card-plus</v-icon>
          </div>
          <div class="caption haicha--text">ボードゲームを追加する</div>
        </div>
      </v-sheet>
    </v-hover>
    <Dialog
      :maxWidth="maxWidth"
      :isDisplayDialog="isDisplayDialog"
      @closeDialog="closeDialog"
    >
      <RegistrationBoardgameDetail
        @onSaveSuccessed="closeDialog"
        v-if="isDisplayDialog"
      />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import RegistrationBoardgameDetail from "@/components/RegistrationBoardgameDetail.vue";
import Dialog from "@/components/Dialog.vue";

@Component({
  components: { RegistrationBoardgameDetail, Dialog },
})
export default class RegistrationBoardgame extends Vue {
  @Prop() private cardHight?: Function;

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
