<template>
  <v-img
    :src="src"
    height="100%"
    :contain="contain"
    lazy-src="@/assets/lazy.png"
    :aspect-ratio="aspectRatio"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from "firebase/app";
import "firebase/storage";

@Component({
  components: {},
})
export default class ImageLoadFromFirebase extends Vue {
  private src: string = "";

  @Prop() private imagePath?: string;
  @Prop() private contain?: boolean;
  @Prop() private aspectRatio?: number;

  private created() {
    if (this.imagePath) {
      firebase
        .storage()
        .ref()
        .child(`${this.imagePath}`)
        .getDownloadURL()
        .then((url) => (this.src = url));
    }
  }
}
</script>
