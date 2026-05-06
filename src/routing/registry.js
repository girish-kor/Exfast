"use strict";

class RouteRegistry {
  constructor() {
    this._routes = [];
  }

  register(method, path, handler, meta = {}) {
    this._routes.push({ method: method.toUpperCase(), path, handler, meta });
    return this;
  }

  get(path, handler, meta) {
    return this.register("GET", path, handler, meta);
  }
  post(path, handler, meta) {
    return this.register("POST", path, handler, meta);
  }
  put(path, handler, meta) {
    return this.register("PUT", path, handler, meta);
  }
  patch(path, handler, meta) {
    return this.register("PATCH", path, handler, meta);
  }
  delete(path, handler, meta) {
    return this.register("DELETE", path, handler, meta);
  }

  all() {
    return this._routes;
  }
}

module.exports = RouteRegistry;
