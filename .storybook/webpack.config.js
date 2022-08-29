const path = require("path");

module.exports = async ({ config, mode }) => {
  
  return {
    ...config,
    module:{
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
  },
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules],
    }
  };
};