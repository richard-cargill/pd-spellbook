const isProduction = process.env.NODE_ENV === 'production';
const cwd = isProduction ? '.' : './src';
const root = isProduction ? './src' : '.';

module.exports = {
  "plugins": {
    "posthtml-inline-assets": {
      cwd,
      root
    }
  }
}