var webpack = require('webpack');

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist"
	},
	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: true,
			mangle: true
		})
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"redux": "Redux",
		"immutable": "Immutable",
	},
};
