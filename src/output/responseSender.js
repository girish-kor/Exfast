"use strict";

const envelopeBuilder = require("./envelopeBuilder");
function responseSender(req, res, next) {
  res.sendSuccess = function (data, statusCode = 200, meta = {}) {
    const envelope = envelopeBuilder.success(data, {
      requestId: req.id,
      ...meta,
    });
    res.status(statusCode).json(envelope);
  };

  res.sendPaginated = function (data, total, page, limit) {
    const envelope = envelopeBuilder.paginated(data, total, page, limit);
    res.status(200).json(envelope);
  };

  res.sendError = function (code, message, statusCode = 400, details) {
    const envelope = envelopeBuilder.error(code, message, details);
    res.status(statusCode).json(envelope);
  };

  next();
}

module.exports = responseSender;
