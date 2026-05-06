"use strict";

const path = require("path");
const CONVENTIONS = require("./index");

class ConventionResolver {
  resolveModulePath(basePath, moduleName) {
    return path.join(basePath, CONVENTIONS.moduleDir, moduleName);
  }

  resolveRoutePath(modulePath) {
    return path.join(modulePath, CONVENTIONS.routeFilename);
  }

  resolveServicePath(modulePath) {
    return path.join(modulePath, CONVENTIONS.serviceFilename);
  }

  resolveManifestPath(modulePath) {
    return path.join(modulePath, CONVENTIONS.manifestFilename);
  }

  resolveServiceName(name) {
    return `${name}${CONVENTIONS.serviceSuffix}`;
  }

  resolveRepositoryName(name) {
    return `${name}${CONVENTIONS.repositorySuffix}`;
  }
}

module.exports = new ConventionResolver();
