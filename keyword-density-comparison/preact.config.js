export default {
  webpack(config, env, helpers, options) {
    const [css] = helpers.getLoadersByName(config, 'css-loader');

    const cssExtractPlugin = helpers.getPluginsByName(config, "MiniCssExtractPlugin")
    cssExtractPlugin.forEach(
      ({ plugin }) =>
        (plugin.options.filename = "bundle.css")
    );

    css.loader.options.modules = false;
    config.output.filename = '[name].js';
    config.output.chunkFilename = '[name].chunk.js';
    config.output.publicPath = '';
  }
};