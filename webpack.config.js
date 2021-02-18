const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		home: [
			'./src/js/index.js',
		]
	},
	output: {
		path: path.resolve(__dirname, 'public/build/js'),
		publicPath: '/build/js',
		filename: '[name].js',
	},
	devServer: {
		contentBase: [
			path.join(__dirname, 'src')
		],
		compress: true,
		port: 9000,
		writeToDisk: true,
	},
	module: {
		rules: [
		    {
		      test: /\.m?js$/,
		      exclude: /(node_modules)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['@babel/preset-env'],
		          plugins: ['@babel/plugin-transform-react-jsx']
		        }
		      }
		    },
		    {
		    	test: /\.s[ac]ss$/i,
		    	use: [
		    		// Creates `style` nodes from JS strings
		    		"style-loader",
		    		// Translates CSS into CommonJS
		    		"css-loader",
		    		// Compiles Sass to CSS
		    		"sass-loader",
		    	],
		    },
		]
	}
};