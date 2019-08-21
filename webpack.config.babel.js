var webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  // ExtractTextPlugin = require('extract-text-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV == 'production';
const pxToRem = require('postcss-pxtorem');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: ["@babel/polyfill", path.resolve(__dirname, './app.js')],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: isProd ? '/' : '/dist/',
    filename: `static/js/[name].js`,
    chunkFilename: `static/js/[name].chunk.js`
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://npd_admin.jd.com',
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'react/lib/Object.assign': 'object-assign',
    },
    extensions: ['.web.js', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.less']
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: ['react', ['es2015', { modules: false }], 'es2016'],
          // plugins: ['transform-runtime', 'transform-class-properties']
          cacheDirectory: true
        }
      },
      {
        loader: 'ts-loader'
      }
      ]
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?cacheDirectory',
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      },{
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, './src/web/css/common.scss'),
          ]
        }
      }],
      exclude: /\.m\.scss$/
    },
    {
      test: /\.m\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: '[name]__[local]-[hash:base64:5]'
        }
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      },{
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, './src/web/css/common.scss'),
          ]
        }
      }]
    },
    {
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      },{
        loader: 'css-loader',
        options: {
          minimize: isProd,
          sourceMap: !isProd
        }
      }, 'postcss-loader', {
        loader: 'less-loader'
      }],
      exclude: /.m.less$/
    },
    {
      test: /\.m.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]-[hash:base64:5]'
        }
      }, 'postcss-loader', 'less-loader']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name][hash:8].[ext]'
        }
      }]
    },
    {
      test: /\.(svg)$/i,
      loader: 'svg-sprite-loader',
      include: [
        path.resolve(__dirname, 'src/app/images')
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf|svg|ttc)(\?.*)?$/,
      exclude: [
        path.resolve(__dirname, 'src/app/images')
      ],
      use: ['url-loader?limit=10000&name=static/fonts/[name].[ext]?[hash]']
    }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          minChunks: 2,
        },
        default: {
          name: 'common',
          priority: -20,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
}


module.exports.plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        // pxToRem({
        //   rootValue: 100,
        //   propWhiteList: [],
        //   mediaQuery: true
        // })
      ]
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.template.html',
    templateParameters: {
      path: isProd ? '/static/js' : '../src/vendor',
    },
    inject: true,
    chunks: ['app'],
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    __ENV: isProd ? "'pro'" : "'dev'",
    __HOST: isProd ? "''" : "'http://localhost:8099/'",
    __HOST_OAUTH: isProd ? "''" : "'http://localhost:8199/'",
    'process.env': {
      'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    }
  }),
  new CopyWebpackPlugin([
    { from: './src/vendor/**', to: path.join(__dirname, './dist/static/js/[name].[ext]') },
  ]),
  new MiniCssExtractPlugin({
    filename: !isProd ? `static/css/[name].css` : `static/css/[name].css`,
    chunkFilename: !isProd ? `static/css/[id].css` : `static/css/[id].css`,
  }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  // new BundleAnalyzerPlugin(),
];

if (isProd) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new UglifyJSPlugin({
      exclude: /node_modules/,
      sourceMap: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ]);
  // module.exports.devtool = 'source-map'
} else {
  module.exports.devtool = 'source-map'
}
