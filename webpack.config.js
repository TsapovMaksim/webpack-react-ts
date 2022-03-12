const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = env => {
  const config = {
    context: __dirname,
    entry: './src/index.tsx',
    mode: env.production ? 'production' : 'development',
    target: 'browserslist',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
      runtimeChunk: /* 'single' */ true,
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|jsx|js)$/i,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(csv|tsv)$/i,
          use: ['csv-loader'],
        },
        {
          test: /\.xml$/i,
          use: ['xml-loader'],
        },
      ],
    },
  };

  if (!env.production) {
    config.devtool = 'inline-source-map';
    config.devServer = {
      static: path.join(__dirname, 'dist'),
      port: 8010,
      historyApiFallback: true,
      hot: true,
      open: true,
      proxy: {
        '/api/**': {
          target: 'http://example.front.ylab.io',
          secure: false,
          changeOrigin: true,
        },
        '/uploads/**': {
          target: 'http://example.front.ylab.io',
          secure: false,
          changeOrigin: true,
        },
      },
    };
  }
  return config;
};
