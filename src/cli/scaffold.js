"use strict";

const fs = require("fs");
const path = require("path");

const TEMPLATES = {
  "manifest.js": (name) =>
    `'use strict';\nmodule.exports = { name: '${name}', version: '1.0.0', routes: [], services: [] };\n`,
  "router.js": (name) =>
    `'use strict';\nconst BaseRouter = require('../../modules/router');\nclass ${name}Router extends BaseRouter {\n  constructor() { super('/${name.toLowerCase()}'); }\n  register() {}\n}\nmodule.exports = ${name}Router;\n`,
  "service.js": (name) =>
    `'use strict';\nconst BaseService = require('../../modules/service');\nclass ${name}Service extends BaseService {}\nmodule.exports = ${name}Service;\n`,
};

function createModule(name, basePath = process.cwd()) {
  const modulePath = path.join(basePath, "modules", name);
  if (fs.existsSync(modulePath)) {
    throw new Error(`Module already exists: ${modulePath}`);
  }
  fs.mkdirSync(modulePath, { recursive: true });
  for (const [file, tpl] of Object.entries(TEMPLATES)) {
    fs.writeFileSync(path.join(modulePath, file), tpl(name));
  }
  return modulePath;
}

if (require.main === module) {
  const name = process.argv[2];
  if (!name) {
    process.stderr.write("Usage: node scaffold.js <ModuleName>\n");
    process.exit(1);
  }
  createModule(name);
}

module.exports = { createModule };
