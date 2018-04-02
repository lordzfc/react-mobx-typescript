const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
let gitRevisionPlugin = new GitRevisionPlugin();


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  nodeModules: path.join(__dirname, 'node_modules')
};

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js',
    chunkFilename: 'bundle.[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { 
        test: /\.jpg$/, 
        use: 'file-loader',
        include: PATHS.app
      },
      { 
        test: /\.svg$/, 
        use: 'file-loader', 
        include: PATHS.app
      },
      { 
        test: /\.png$/, 
        use: 'file-loader',
        include: PATHS.app
      },
      { 
        test: /\.gif$/, 
        use: 'file-loader',
        include: PATHS.app
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/,
        use: "awesome-typescript-loader" 
      },
      { 
        enforce: "pre", 
        test: /\.js$/, 
        use: "source-map-loader"
      }

    ],
    
  },
  plugins: [
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      ogTags: {
        type: 'website',
        title: 'React Mobx Typescript Seed',
        description: 'Lorem ipsum',
      }
    }),
    new WebpackAutoInject({
      componentsOptions: {
        InjectAsComment: {
          tag: 'Build {date} - commithash - ' + JSON.stringify(gitRevisionPlugin.commithash()) + ' - branch - ' + JSON.stringify(gitRevisionPlugin.branch()),
          dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT' // default
        }
      }
    })
  ],
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },

};

if(TARGET === 'serve' || TARGET === 'serve-local' ||  !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new NpmInstallPlugin({
      //   save: true // --save
      // })
    ]
  });
}

if(TARGET === 'build' || TARGET === "ci:prepare") {
  module.exports = merge(common, {
    output: {
      path: PATHS.build,
      filename: 'bundle.[hash].js',
      chunkFilename: 'bundle.[hash].js',
      publicPath: '/'
    }
  });
}
