module.exports = {
  apps: [
    {
      script: './bin/start-apps-extra',
      instances: 1,
      autorestart: false,
      interpreter: 'bash'
    },
    {
      script: './build/main.js',
      node_args: "--experimental-specifier-resolution=node"
    }
  ]
}
