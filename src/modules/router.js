"use strict";

const express = require("express");

class BaseRouter {
  constructor(prefix = "/") {
    this.prefix = prefix;
    this.router = express.Router();
  }

  register() {
    throw new Error("BaseRouter.register() must be implemented by subclass");
  }

  getRouter() {
    this.register();
    return this.router;
  }
}

module.exports = BaseRouter;
