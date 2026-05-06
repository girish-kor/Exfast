"use strict";

const ProviderRegistry = require("./ProviderRegistry");
const ServiceFactory = require("./ServiceFactory");
const LifecycleHooks = require("./LifecycleHooks");

const registry = new ProviderRegistry();
const lifecycle = new LifecycleHooks();

function bootstrap(app, config = {}) {
  const factory = new ServiceFactory(registry);
  return { app, factory, lifecycle, config };
}

module.exports = {
  registry,
  lifecycle,
  bootstrap,
  ProviderRegistry,
  ServiceFactory,
  LifecycleHooks,
};
