"use strict";

class ModuleManifest {
  constructor({
    name,
    version = "1.0.0",
    routes = [],
    services = [],
    dependencies = [],
  }) {
    if (!name) throw new Error("ModuleManifest requires a name");
    this.name = name;
    this.version = version;
    this.routes = routes;
    this.services = services;
    this.dependencies = dependencies;
  }
}

module.exports = ModuleManifest;
