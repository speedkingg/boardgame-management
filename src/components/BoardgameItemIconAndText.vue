<template>
  <div class="d-flex justify-center align-center" :style="`width: ${width}px`">
    <v-icon :color="color"> {{ icon }} </v-icon>
    <div class="caption" :class="`${color}--text`">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BoardgameItemIconAndText extends Vue {
  @Prop() private icon!: string;
  @Prop() private text!: string;
  @Prop() private color!: string;
  @Prop() private width!: number;
}
</script>
