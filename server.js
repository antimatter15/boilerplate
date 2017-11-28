const port = 1995;

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
    contentBase: config.output.publicPath,
    hot: true,
    host: 'localhost',
    historyApiFallback: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', () => {
  console.log('dev server listening on http://localhost:' + port);
});
