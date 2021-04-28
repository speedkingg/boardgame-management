module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("fork-ts-checker").tap((args) => {
      args[0].memoryLimit = 4096;
      args[0].workers = 2;
      return args;
    });
  },
};
