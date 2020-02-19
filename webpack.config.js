const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        // Entry - Where to start
        entry: './src/app.js',
        // Output - Where to output file
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        // Module rules - Define what to do when certain file is loaded
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        // When using 3rd party webpack, we need to tell webpack in the plugins array.
        plugins: [
            CSSExtract
        ],
        // Devtool - Help us debug. We can see where the error is in the original file instead of showing on bundle.js
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        // DevServer - This is a server designed for webpack. contentBase need the absolute path of /public
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true    // To use the client side routing with react-router-dom, we need this
        }
    };
}



