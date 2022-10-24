module.exports = {
  apps: [
    {
      script: './build/main.js',
      node_args: "--experimental-specifier-resolution=node"
    }
  ]
}
