module.exports = {
  apps: [
    {
      script: 'build/server.js',
      watch: '.',
      ignore_watch: ['node_modules']
    }
  ]
}
