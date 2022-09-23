module.exports = {
  apps: [
    {
      script: './build/main.js',
      watch: true,
      ignore_watch: ['./**/node_modules'],
      node_args: "--experimental-specifier-resolution=node"
    },
    {
      name: "start apps",
      cwd: "./",
      script: "./bin/start-apps.sh",
      exec_interpreter: "bash"
    }
  ]
}
