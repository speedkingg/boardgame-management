<template>
  <v-sheet
    class="d-flex flex-column justify-center align-center py-12"
    color="background2"
    width="100%"
    height="100%"
  >
    <v-icon color="shiroturubami" x-large>mdi-image-off</v-icon>
    <div class="shiroturubami--text">No image</div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class NoImage extends Vue {}
</script>
