module.exports = {
	entry: [
		'babel-polyfill',
		`${__dirname}/source/js/index`,
		`${__dirname}/node_modules/webpack/hot/dev-server`
	],
	output: {
		path: `${__dirname}/build/`,
		publicPath: "/build/",
		filename: "main.min.js"
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|otf)$/,
				exclude: /node_modules/,
				use: {
					loader: "file-loader",
					options: {
						name: "[path][name].[ext]"
					}
				}
			},
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.json/,
				type: 'javascript/auto',
				use: [require.resolve('json-loader')],
			  },
		]
	},
	devServer: {
		contentBase: "./",
		inline: true,
		hot: true
	}
};
