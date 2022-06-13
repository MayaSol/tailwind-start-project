const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SvgStore = require("webpack-svgstore");
const CopyPlugin = require("copy-webpack-plugin");


const compiler = webpack({
    entry: {
        main: path.resolve(__dirname, './index.js'),
    },
    output: {
        filename: "[name].bundle.js",
        publicPath: './'
    },
    mode: 'development',
    module: {
        rules: [{
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            config: path.resolve(__dirname, 'postcss.config.js'),
                        },
                    },
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new SvgStore({
          path: path.resolve(__dirname, "./svg-icons/*.svg"),
          fileName: "./images/svg-sprite.svg",
          prefix: "icon-",
        }),
        new CopyPlugin({
          patterns: [
            { from: path.resolve(__dirname, './src/*.html'), 
              to: path.resolve(__dirname, './dist/'),
              force: true,
              context: path.resolve(__dirname, './src/')
            },
          ],
        }),
    ],
});

compiler.run((err, stats) => { // [Stats Object](#stats-object)
  console.log(stats.compilation.errors);

  compiler.close((closeErr) => {
    // ...
  });
});
