# awesome-esbuild-loader

[![npm version](https://badge.fury.io/js/awesome-esbuild-loader.svg)](https://badge.fury.io/js/awesome-esbuild-loader)

[esbuild](https://github.com/evanw/esbuild) is by far one of the fastest TS/ESNext to ES6 compilers, so it makes sense to use it over Babel/TSC with webpack to take advantage of both worlds (Speed and the webpack ecosytem).

## Install

```bash
npm install --save-dev awesome-esbuild-loader
```

## Usage

In `webpack.config.js`:

```js
const { ESBuildPlugin } = require('awesome-esbuild-loader')

module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'awesome-esbuild-loader',
        options: {
          // All options are optional
          target: 'es2015', // default, or 'es20XX', 'esnext'
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
          sourceMap: false, // Enable sourcemap
        },
      },
    ],
  },
  plugins: [new ESBuildPlugin()],
}
```

## License

MIT &copy; [mathew-kurian (Mathew Kurian)](https://github.com/mathew-kurian)

## Original

MIT &copy; [EGOIST (Kevin Titor)](https://github.com/sponsors/egoist) - https://github.com/egoist/esbuild-loader
