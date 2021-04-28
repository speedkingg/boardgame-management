<template>
  <div>
    <v-btn depressed @click="showDialog" color="kogecha">
      <v-icon color="choujiiro">mdi-trash-can</v-icon>
    </v-btn>
    <Dialog
      :maxWidth="maxWidth"
      :isDisplayDialog="isDisplayDialog"
      @closeDialog="closeDialog"
    >
      <div class="d-flex justify-end">
        <v-btn
          fab
          x-small
          elevation="0"
          absolute
          @click="closeDialog"
          class="ma-2"
          color="rgba(255,255,255,.2)"
        >
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </div>

      <DeleteConfirmation @accceptedDelete="accceptedDelete" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import DeleteConfirmation from "@/components/DeleteConfirmation.vue";
import Dialog from "@/components/Dialog.vue";

@Component({
  components: { DeleteConfirmation, Dialog },
})
export default class DeleteButton extends Vue {
  @Emit("execDelete") private execDelete() {}

  private accceptedDelete(isAccepted: boolean) {
    if (isAccepted) this.execDelete();
    this.closeDialog();
  }

  // dialog control
  private maxWidth: number = 400;
  private isDisplayDialog: boolean = false;
  private showDialog() {
    this.isDisplayDialog = true;
  }
  private closeDialog() {
    this.isDisplayDialog = false;
  }
}
</script>
