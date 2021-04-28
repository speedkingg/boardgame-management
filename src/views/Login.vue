<template>
  <div class="d-flex flex-column align-center justify-center">
    <LoginForm class="mt-16" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {}
</script>
