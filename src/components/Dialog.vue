<template>
  <v-dialog
    :value="isDisplayDialog"
    :max-width="maxWidth"
    @click:outside="clickedOutside"
    @keydown="isEscKeydown"
    class="mx-auto"
  >
    <div class="d-flex justify-end">
      <v-btn
        fab
        x-small
        elevation="0"
        absolute
        @click="closeButtonClicked"
        color="rgba(255,255,255,.2)"
      >
        <v-icon color="grey">mdi-close</v-icon>
      </v-btn>
    </div>
    <slot />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Dialog extends Vue {
  @Prop() private maxWidth?: boolean;
  @Prop() private isDisplayDialog?: boolean;
  @Emit("closeDialog") private closeDialog() {}

  private isEscKeydown(event: { key: string }) {
    if (event.key === "Escape") this.closeDialog();
  }
  private clickedOutside() {
    this.closeDialog();
  }

  private closeButtonClicked() {
    this.closeDialog();
  }
}
</script>
