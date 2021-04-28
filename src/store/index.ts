import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import BoardgameListType from "@/type/BoardgameListType.ts";
import sortBoardgameList from "@/lib/sortBoardgameList.ts";

Vue.use(Vuex);

interface State {
  isLogin: boolean;
  loginUser: object;
  isInitBoardgameList: boolean;
  boardgameList: BoardgameListType;
}

export default new Vuex.Store<State>({
  state: {
    isLogin: false,
    loginUser: {},
    isInitBoardgameList: false,
    boardgameList: {},
  },
  mutations: {
    login(state, user) {
      state.isLogin = true;
      state.loginUser = user;
    },
    logout(state) {
      state.isLogin = false;
      state.loginUser = {};
    },
    initBoardgameList(state, newData) {
      state.boardgameList = newData;
      if (!state.isInitBoardgameList) state.isInitBoardgameList = true;
    },
    addBoardgame(state, boardgame: object) {
      state.boardgameList = Object.assign(state.boardgameList, boardgame);

      //dom反映用
      state.boardgameList = Object.assign({}, state.boardgameList);
    },
    deleteBoardgame(state, boardgameId: string) {
      if (boardgameId in state.boardgameList) {
        delete state.boardgameList[boardgameId];
        //dom反映用
        state.boardgameList = Object.assign({}, state.boardgameList);
      }
    },
    addBoardgamePlayCount(
      state,
      update: { boardgameId: string; count: number }
    ) {
      state.boardgameList[update.boardgameId].playCount = update.count;

      //dom反映用
      state.boardgameList = Object.assign({}, state.boardgameList);
    },
    updateBoardgameList(state, newData: BoardgameListType) {
      state.boardgameList = newData;
      //dom反映用
      state.boardgameList = Object.assign({}, state.boardgameList);
    },
  },
  actions: {
    getBoardgameList(context) {
      const sort = new sortBoardgameList();
      firebase
        .database()
        .ref(`boardgames/`)
        .once("value")
        .then((snapshot) => {
          context.commit(
            "initBoardgameList",
            sort.execSort(snapshot.val(), "title", "asc")
          );
        })
        .catch((e) => {
          console.error("getBoardgameList was failed", e);
        });
    },
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    isInitBoardgameList(state) {
      return state.isInitBoardgameList;
    },
    boardgameList(state) {
      return state.boardgameList;
    },
  },
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
