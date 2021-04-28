<template>
  <div class="d-flex justify-center align-center">
    <div class="d-flex mt-3 mb-1" :class="`${titleColor}--text`">
      <v-icon :color="iconColor" class="mr-1">{{ icon }}</v-icon>
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class CardTitle extends Vue {
  @Prop() title?: string;
  @Prop() icon?: string;
  @Prop() iconColor?: string;
  @Prop() titleColor?: string;
}
</script>
