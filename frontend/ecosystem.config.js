module.exports = {
  apps: [{
    name: "Sysclub",
    script: "npm",
    args: "dev",
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 80
    }
  }]
};