const webpack = require('webpack');
const htmlwebpackplugin = require('html-webpack-plugin');
const config = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js',
        publicPath: '/' // 打包上线
    },
    devServer: {
        historyApiFallback: true,
        host: '169.254.106.109',
        port: 3000,
        contentBase: __dirname + '/dist',
        inline: true,
        hot: true,
        setup(app){
             app.get('/list/data', (req, res) => {
                   let list = require('./src/client/mock/mock.json');
                   res.json(list);
             })
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                loader: ["style-loader",'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff|eot)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024
                }
            },
        ]
    },
    // resolveLoader: {
    //     modleExtensions:['-loader'] //加后缀
    // },
    plugins: [
        new htmlwebpackplugin({
            filename: 'index.html',
            template:  __dirname + '/public/index.html'
        })
    ]
}
module.exports = config;