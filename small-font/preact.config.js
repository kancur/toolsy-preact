module.exports = function(config) {
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[name].chunk.js';
};

export default (config, env, helpers) => {
  if (env.isProd) {
    config.devtool = false;
  }
}