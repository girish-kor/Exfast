"use strict";

const path = require("path");
const ModuleManifest = require("./manifest");

class ModuleLoader {
  constructor() {
    this._loaded = new Map();
  }

  load(manifestOrPath) {
    if (typeof manifestOrPath === "string") {
      const raw = require(path.resolve(manifestOrPath));
      manifestOrPath = new ModuleManifest(raw);
    }
    if (this._loaded.has(manifestOrPath.name)) {
      return this._loaded.get(manifestOrPath.name);
    }
    this._loaded.set(manifestOrPath.name, manifestOrPath);
    return manifestOrPath;
  }

  getAll() {
    return Array.from(this._loaded.values());
  }
}

module.exports = new ModuleLoader();
