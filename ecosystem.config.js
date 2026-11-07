module.exports = {
  apps: [
    {
      name: "pawan-traders",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

