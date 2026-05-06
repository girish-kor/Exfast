"use strict";

function handlerInvoker(handler) {
  return async function invoke(req, res, next) {
    try {
      const result = await handler(req, res, next);
      if (result !== undefined && !res.headersSent) {
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = handlerInvoker;
