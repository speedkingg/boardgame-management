<template>
  <v-card
    class="rounded-xl d-flex flex-column justify-center align-center pa-10"
    max-width="400"
    color="background2"
  >
    <div>
      <v-sheet height="130" color="background2" flat class="mt-10">
        <HedgehogSvg style="height: 100%; width: 100%" fillColor="#986540" />
      </v-sheet>
      <div v-if="!isLogin" class="d-flex flex-column">
        <v-text-field v-model="id" label="id" />
        <v-text-field
          v-model="pass"
          label="pass"
          :type="isShowPass ? 'text' : 'password'"
          :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="isShowPass = !isShowPass"
        />
        <div class="mt-5 error--text">{{ errorMessage }}</div>
        <v-btn color="primary" class="mb-5" @click="login">ログイン</v-btn>
      </div>
      <div v-else class="d-flex flex-column">
        <v-btn color="secondary" class="my-5" @click="logout">ログアウト</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";
import router from "@/router/index.ts";
import firebase from "firebase/app";
import "firebase/auth";

import HedgehogSvg from "@/components/svg/HedgehogSvg.vue";

@Component({
  components: { HedgehogSvg },
})
export default class LoginForm extends Vue {
  private id: string = "";
  private pass: string = "";
  private isShowPass: boolean = false;
  private errorMessage: string = "";

  private get isLogin() {
    return store.getters.isLogin;
  }

  login() {
    this.errorMessage = "";
    firebase
      .auth()
      .signInWithEmailAndPassword(this.id, this.pass)
      .then((result) => {
        store.commit("login", result.user);
        router.push(
          "/",
          () => {},
          () => {}
        );
      })
      .catch(() => {
        this.errorMessage = "認証エラーです。";
      });
  }

  logout() {
    store.commit("logout");
  }
}
</script>
