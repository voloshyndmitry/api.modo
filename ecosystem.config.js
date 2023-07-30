module.exports = {
  apps : [{
    name: "app",
    script: "./dist/main.js",
    instances: "4",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}