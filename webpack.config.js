/*
 * @desc: 
 * @Author: Yi Zhou
 * @Date: 2022-03-23 14:11:07
 * @Last Modified by: Yi Zhou
 * @Last Modified time: 
 */
const path = require('path');
const ExtraTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        // 2.loader的使用：loader就相当于翻译官的作用将其他格式的文件转成js，因为webpack只认识js；
        // loader的执行顺序后向前；
        // loader?的方式告诉loader开启什么功能  minimize压缩css；
        // test匹配需要转成js的文件后缀，use通过什么loader转；
        // 关于loader的疑问：
        // style-loader的作用是将css-loader打包好的css代码以<style>标签的形式插入到html文件中；
        rules: [
            {
                test: /\.css$/, 
                // use: ['style-loader', 'css-loader?minimize']  // style-loader是将css-loader打包好的css代码以<style>标签的形式插入到html文件中
                // use: ['style-loader', {
                //     loader: 'css-loader',
                //     options: {
                //         minimize: true
                //     }
                // }] 
                use: ExtraTextWebpackPlugin.extract({ // css 单独提取出来了但是没有插入到html中
                    // 转换 .css 文件需要使用的 Loader
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }],
                  })
            }
        ]
    },
    plugins: [
        // 3.plugins：扩展webpack的功能
        new ExtraTextWebpackPlugin({
            // 从js中提取css文件
            filename: `[name]_[contenthash:8].css`
        })
    ]
    // 4.dev-server: 通过开启服务的方式来运行html文件，支持热更新、sourcemap（调试使用）
    // 运行dev-server需要通过配置一些npm scripts脚本来实现
    // "start": "webpack-dev-server --hot --devtool source-map" 
}