module.exports = {
  apps : [{
    name: "app",
    script: "./dist/main.js",
    instances: "2",
    max_memory_restart: '500M',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}