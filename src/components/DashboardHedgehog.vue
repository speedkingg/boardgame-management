<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center"
    :height="height"
    color="background3"
    flat
  >
    <v-sheet
      style="cursor: pointer"
      @click="shuffle"
      height="130"
      width="70%"
      class="rounded-xl pa-4"
      color="background3"
      flat
    >
      <HedgehogSvg style="height: 100%; width: 100%" :fillColor="colors[5]" />
    </v-sheet>
    <div class="d-flex text-h5">
      <div :style="`color: ${colors[6]};`">L</div>
      <div :style="`color: ${colors[8]};`">e</div>
      <div :style="`color: ${colors[7]};`">t</div>
      <div :style="`color: ${colors[6]};`">'</div>
      <div :style="`color: ${colors[5]};`" class="mr-2">s</div>
      <div :style="`color: ${colors[4]};`">e</div>
      <div :style="`color: ${colors[3]};`">n</div>
      <div :style="`color: ${colors[2]};`">j</div>
      <div :style="`color: ${colors[1]};`">o</div>
      <div :style="`color: ${colors[0]};`">y</div>
    </div>

    <div class="d-flex text-h5">
      <div :style="`color: ${colors[0]};`">B</div>
      <div :style="`color: ${colors[1]};`">o</div>
      <div :style="`color: ${colors[2]};`">a</div>
      <div :style="`color: ${colors[3]};`">r</div>
      <div :style="`color: ${colors[4]};`">d</div>
      <div :style="`color: ${colors[5]};`">g</div>
      <div :style="`color: ${colors[6]};`">a</div>
      <div :style="`color: ${colors[7]};`">m</div>
      <div :style="`color: ${colors[8]};`">e</div>
      <div :style="`color: ${colors[4]};`">!</div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HedgehogSvg from "@/components/svg/HedgehogSvg.vue";

@Component({
  components: { HedgehogSvg },
})
export default class Hedgehog extends Vue {
  @Prop() height?: number;

  private colors: string[] = [
    "#8A3A00",
    "#CC5D3B",
    "#6E4C3E",
    "#E4C654",
    "#DAC18F",
    "#986540",
    "#DAC7B4",
    "#CDA16E",
    "#431200",
  ];

  private shuffle() {
    const arr = this.colors;
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.colors = arr.reverse(); //reverse()はdom更新用
  }
}
</script>
