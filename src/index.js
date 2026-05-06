"use strict";

const { createApp } = require("./core");
const { bootstrap } = require("./container");
const { serve } = require("./observability");

function createModule(manifest) {
  const { loader } = require("./modules");
  return loader.load(manifest);
}

module.exports = { createApp, createModule, bootstrap, serve };
