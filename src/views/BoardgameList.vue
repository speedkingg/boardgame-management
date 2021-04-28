<template>
  <v-card color="background2" class="px-2 px-md-6 pt-3 pb-5" flat>
    <v-row>
      <v-col
        cols="12"
        v-if="!this.$vuetify.breakpoint.lg && !this.$vuetify.breakpoint.xl"
      >
        <BoardgameListMenu class="mt-3 mb-10" />
        <div class="d-flex justify-end">
          <v-switch
            v-model="isGalleryView"
            inset
            label="ギャラリービュー"
            dense
          />
        </div>
      </v-col>

      <v-col cols="12" lg="9">
        <v-row class="d-flex flex-wrap pa-lg-10 pa-sm-5">
          <v-col
            cols="6"
            sm="3"
            md="3"
            lg="2"
            v-for="(item, key) in boardgameList"
            :key="key"
            v-show="item.isDisplay"
          >
            <BoardgameListItem
              :boardgameId="key"
              :boardgameInfo="item"
              :cardHight="cardHight"
              :cardPictureHight="cardPictureHight"
              :isGalleryView="isGalleryView"
            />
          </v-col>
          <v-col cols="6" sm="3" md="3" lg="2" v-if="isLogin">
            <RegistrationBoardgame :cardHight="cardHight" />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        lg="3"
        v-if="this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl"
      >
        <v-sheet class="d-flex justify-start pl-5" color="background">
          <v-switch
            v-model="isGalleryView"
            inset
            label="ギャラリービュー"
            dense
          />
        </v-sheet>
        <BoardgameListMenu class="mt-3 mb-10" :isStatic="true" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index.ts";

import BoardgameListItem from "@/components/BoardgameListItem.vue";
import BoardgameListMenu from "@/components/BoardgameListMenu.vue";
import RegistrationBoardgame from "@/components/RegistrationBoardgame.vue";

@Component({
  components: {
    BoardgameListMenu,
    BoardgameListItem,
    RegistrationBoardgame,
  },
})
export default class BoardgameList extends Vue {
  private isGalleryView: boolean = false;

  private get boardgameList() {
    return store.getters.boardgameList;
  }

  private get isLogin() {
    return store.getters.isLogin;
  }

  private get cardHight(): number {
    if (this.$vuetify.breakpoint.xs) {
      return 270;
    } else if (this.$vuetify.breakpoint.sm) {
      return 270;
    } else if (this.$vuetify.breakpoint.md) {
      return 290;
    } else if (this.$vuetify.breakpoint.lg) {
      return 340;
    } else {
      return 340;
    }
  }
  private get cardPictureHight(): number {
    if (this.$vuetify.breakpoint.xs) {
      return 150;
    } else if (this.$vuetify.breakpoint.sm) {
      return 150;
    } else if (this.$vuetify.breakpoint.md) {
      return 150;
    } else if (this.$vuetify.breakpoint.lg) {
      return 200;
    } else {
      return 200;
    }
  }
}
</script>
