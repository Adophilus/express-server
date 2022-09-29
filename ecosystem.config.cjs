module.exports = {
  apps: [
    {
      script: './bin/start-apps-extra',
      interpreter: 'bash'
    },
    {
      script: './build/main.js',
      node_args: "--experimental-specifier-resolution=node"
    }
  ]
}
