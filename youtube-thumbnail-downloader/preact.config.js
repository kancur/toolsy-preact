module.exports = function(config) {
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[name].chunk.js';
  config.output.publicPath = '';
};

export default {
	webpack(config, env, helpers, options) {
		const [ css ] = helpers.getLoadersByName(config, 'css-loader');
		css.loader.options.modules = false;
	}
};