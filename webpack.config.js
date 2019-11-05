const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: './index.jsx',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]-[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]
};
