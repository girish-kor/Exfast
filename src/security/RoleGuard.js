"use strict";

function RoleGuard(...allowedRoles) {
  return function roleGuard(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      });
    }
    const userRoles = Array.isArray(req.user.roles)
      ? req.user.roles
      : [req.user.role].filter(Boolean);
    const hasRole = allowedRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return res
        .status(403)
        .json({ error: { code: "FORBIDDEN", message: "Insufficient role" } });
    }
    next();
  };
}

module.exports = RoleGuard;
