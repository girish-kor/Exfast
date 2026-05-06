"use strict";

class RouteCompiler {
  compile(routes, version) {
    return routes.map((route) => ({
      ...route,
      path: version ? `/v${version}${route.path}` : route.path,
    }));
  }

  autoMount(app, routes) {
    for (const route of routes) {
      const method = route.method.toLowerCase();
      if (typeof app[method] !== "function") {
        throw new Error(`Unsupported HTTP method: ${route.method}`);
      }
      app[method](route.path, route.handler);
    }
  }
}

module.exports = new RouteCompiler();
