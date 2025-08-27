export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-import-meta',
    'babel-plugin-transform-import-meta'
  ]
};