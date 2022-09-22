export default {
  apps: [
    {
      script: 'build/main.js',
      watch: true,
      ignore_watch: ['node_modules'],
      node_args: "--experimental-specifier-resolution=node"
    }
  ]
}
