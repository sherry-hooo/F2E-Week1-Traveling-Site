module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/F2E-Week1-Traveling-Site/" : "/",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@use "@/assets/scss/abstract/_breakpoint.scss";
        @use "@/assets/scss/abstract/_typography.scss";
        `,
      },
    },
  },
};
