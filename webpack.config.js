const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// The default NODE_ENV is undefined at development mode, set it to developmnet so we can use if statement 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Tell dotenv to setup environmental variable with different file according to NODE_ENV
if(process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'});
}else if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        // Entry - Where to start
        entry: ['babel-polyfill', './src/app.js'],
        // Output - Where to output file
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
            })
        ],
        // Devtool - Help us debug. We can see where the error is in the original file instead of showing on bundle.js
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        // DevServer - This is a server designed for webpack. contentBase need the absolute path of /public
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,    // To use the client side routing with react-router-dom, we need this
            publicPath: '/dist/'        // Add a path to dist folder since 'output' has the dist folder under public
        }
    };
}



