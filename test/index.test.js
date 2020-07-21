const { promisify } = require('util')
const webpack = require('webpack')
const { ESBuildPlugin } = require('../src')

const esbuildLoader = require.resolve('../src')

const exec = async (options, { outputFile }) => {
  const compiler = webpack({
    mode: 'development',
    devtool: false,
    entry: __dirname + '/fixture/index.js',
    output: {
      path: __dirname + '/fixture/dist',
      filename: outputFile,
      libraryTarget: 'commonjs2',
    },
    resolve: {
      extensions: ['.js', '.tsx', '.ts', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          loader: esbuildLoader,
          options: options || {},
        },
      ],
    },
    plugins: [new ESBuildPlugin()],
  })

  let assets

  compiler.hooks.done.tap('test', (stats) => {
    console.log(stats.toString('minimal'))
    assets = stats.compilation.assets
  })

  await promisify(compiler.run.bind(compiler))()

  expect(Object.keys(assets)).toMatchSnapshot()
  expect(assets[outputFile].source()).toMatchSnapshot()
}

test('simple', async () => {
  await exec(null, { outputFile: 'index.js' })
})

test('minified', async () => {
  await exec(
    {
      minify: true,
    },
    { outputFile: 'minify.js' }
  )
})

test('sourceMap', async () => {
  await exec(
    {
      sourceMap: true,
    },
    { outputFile: 'sourceMap.js' }
  )
})
