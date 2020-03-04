const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'icons/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin([
            { from: path.resolve(__dirname, 'src/icons'), to: path.resolve(__dirname, 'dist/icons') }
        ]),
        new CleanWebpackPlugin()
    ]
}