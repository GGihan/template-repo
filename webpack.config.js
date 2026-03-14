const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },

    mode: isProduction ? 'production' : 'development',

    devtool: isProduction ? "source-map" : "eval-source-map",

    devServer: {
        watchFiles: ["./src/index.html"],
    },

    plugins: [
        new HtmlWebpackPlugin({
        title: 'Todo-List',
        template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    !isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]' 
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]' 
                },
            },
        ],
    },
};