module.exports = {
    mode: 'development',
    module: {
	    rules: [
	        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
	    ]
	}
}
