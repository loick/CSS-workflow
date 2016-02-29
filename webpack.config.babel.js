// CSS Loaders
import cssnano from 'cssnano';
import cssnext from 'postcss-cssnext';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import variables from './config';

const conf = {
    entry: {
        index: [
            'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            './js/index.js'
        ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!jsontosass?vars=' + encodeURIComponent(JSON.stringify(variables)))
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
        ]
    },
    plugins: [ new ExtractTextPlugin('css/app.css', { allChunks: true }) ],
    postcss() {
        return [
            cssnext(
            {
                // Autoprefixer
                browsers: ['last 2 versions']
            }),
            cssnano,
        ];
    }
};

export default conf;