const path = require("path")
    //1.在内存中个鞥局指定页面成成一个内存的页面 2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
    //提取css到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    //配置vue render渲染,还需在plugins中new一下
const VueLoaderPlugin = require("vue-loader/lib/plugin")


module.exports = {
    //入口文件
    entry: path.join(__dirname, "./src/main.js"),
    //输出文件
    output: {
        path: path.join(__dirname, "./dist"),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        new VueLoaderPlugin()
    ],
    module: { //配置第三方模块
        rules: [ //第三方匹配规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.(woff2?|woff|eot|ttf|otf|svg)(\?.*)?$/, use: 'file-loader' },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }, //转换高级语法,排除node_modules
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
    // resolve: { 重新配置vue引入路径
    //     alias: {
    //         "vue$": 'vue/dist/vue.js'
    //     }
    // }
}