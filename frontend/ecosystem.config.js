module.exports = {
  apps: [{
    name: "Sysclub",
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
