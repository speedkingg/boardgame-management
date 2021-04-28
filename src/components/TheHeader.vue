<template>
  <v-app-bar app fixed flat color="background">
    <div
      class="logo d-flex flex-column align-center"
      @click="toHome()"
      style="cursor: pointer"
    >
      <div class="main-title mr-auto primary--text">Hedgehog</div>
      <div class="sub-title-1 mr-auto font--text">with</div>
      <div class="sub-title-2 mr-auto font--text">Boardgame</div>
    </div>

    <v-spacer />
    <v-toolbar-items v-if="!isXs">
      <v-btn
        v-if="!isLogin"
        @click="toLogin()"
        text
        class="text-capitalize font--text"
      >
        <v-icon left color="font">mdi-login</v-icon>Login
      </v-btn>
      <v-btn v-else @click="toLogin()" text class="text-capitalize font--text">
        <v-icon left color="font">mdi-logout</v-icon>Logout
      </v-btn>
    </v-toolbar-items>

    <v-menu offset-y v-else>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" text>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list rounded color="background">
        <v-list-item-title>
          <v-btn
            v-if="!isLogin"
            @click="toLogin()"
            text
            class="text-capitalize font--text"
          >
            <v-icon left color="font">mdi-login</v-icon>Login
          </v-btn>
          <v-btn
            v-else
            @click="toLogin()"
            text
            class="text-capitalize font--text"
          >
            <v-icon left color="font">mdi-logout</v-icon>Logout
          </v-btn>
        </v-list-item-title>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router/index.ts";
import store from "@/store/index.ts";

@Component({
  components: {},
})
export default class TheHeader extends Vue {
  private toHome() {
    router.push(
      "/",
      () => {},
      () => {}
    );
  }
  private toList() {
    router.push(
      "/list",
      () => {},
      () => {}
    );
  }
  private toLogin() {
    router.push(
      "/login",
      () => {},
      () => {}
    );
  }
  private get isXs(): boolean {
    return this.$vuetify.breakpoint.xs;
  }
  private get isLogin() {
    return store.getters.isLogin;
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Goldman&display=swap");
.logo-icon {
  height: 50px;
  width: 50px;
}

.logo {
  font-family: "Goldman", cursive;
  font-size: 18px;
}
.main-title {
  position: relative;
  top: 14px;
}
.sub-title-1 {
  position: relative;
  top: 0px;
}
.sub-title-2 {
  position: relative;
  top: -14px;
}
</style>
