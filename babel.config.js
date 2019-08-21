const presets = [
  [
    "@babel/preset-react",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    }
  ],
];

const plugins = [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  [
    'import',
    {
      libraryName: 'antd-mobile',
      style: 'css'
    },
    'antd-mobile'
  ],
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: "es",
      style: 'css'
    },
    'antd'
  ],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ["@babel/plugin-syntax-dynamic-import"],
  [
    'styled-jsx/babel',
    {
      plugins: ['styled-jsx-plugin-sass', 'styled-jsx-plugin-postcss']
    }
  ],
  ['jsx-plus'],
  // ["react-hot-loader/babel"],
  '@babel/plugin-transform-runtime',
];

module.exports = { 
  presets,  
  env: {
    development: {
      presets: ['@babel/preset-env']
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    },
    test: {
      presets: ['@babel/preset-env']
    }
  },
  plugins 
};
