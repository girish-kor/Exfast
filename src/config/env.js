"use strict";

module.exports = function loadEnv() {
  return {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    env: process.env.NODE_ENV,
    logLevel: process.env.LOG_LEVEL,
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
  };
};
