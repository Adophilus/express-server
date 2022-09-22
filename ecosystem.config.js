module.exports = {
  apps: [
    {
      script: 'build/main.js',
      watch: '.',
      ignore_watch: ['node_modules']
    }
  ]
}
