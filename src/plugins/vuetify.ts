import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#986540", //6 haicha
        secondary: "#6E4C3E", // 3 kogecha
        accent: "#E4C654", //4 kihadairo
        error: "#CC5D3B", //2 kabairo

        kasshoku: "#8A3A00", //1
        kabairo: "#CC5D3B", //2
        kogecha: "#6E4C3E", //3
        kihadairo: "#E4C654", //4
        kareno: "#DAC18F", //5
        haicha: "#986540", //6
        shiroturubami: "#DAC7B4", //7
        choujiiro: "#CDA16E", //8
        gokukogecha: "#431200", //9

        font: "#431200", //9 gokukogecha
        background: "#F3EEE8",
        background2: "#F0E8E1",
        background3: "#ECE3D9",
        btn: "#6E4C3E", //3 kogecha
        btnIcon: "#CDA16E", //8 chujiiro
        btnText: "#DAC7B4", // 7 shiroturubami
        icon: "#CDA16E", //8 chujiiro
      },
    },
  },
});
