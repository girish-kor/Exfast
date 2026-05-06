"use strict";

const jwt = require("jsonwebtoken");

function JwtGuard(options = {}) {
  const secret = options.secret || process.env.JWT_SECRET;
  if (!secret) throw new Error("JwtGuard: JWT_SECRET is required");

  return function jwtGuard(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Missing bearer token" },
      });
    }
    const token = authHeader.slice(7);
    try {
      req.user = jwt.verify(token, secret, options.verify || {});
      next();
    } catch (err) {
      res
        .status(401)
        .json({ error: { code: "UNAUTHORIZED", message: err.message } });
    }
  };
}

module.exports = JwtGuard;
