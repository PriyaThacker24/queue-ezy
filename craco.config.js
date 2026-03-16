module.exports = {
  style: {
    postcss: {
      // Workaround: some CRACO versions don't apply `plugins` unless we mutate loader options.
      // Ref: https://craco.js.org/docs/configuration/style
      loaderOptions: (postCssLoaderOptions) => {
        const tailwind = require("tailwindcss");
        const autoprefixer = require("autoprefixer");

        postCssLoaderOptions.postcssOptions = postCssLoaderOptions.postcssOptions ?? {};
        postCssLoaderOptions.postcssOptions.plugins = [tailwind, autoprefixer];
        return postCssLoaderOptions;
      },
    },
  },
};

