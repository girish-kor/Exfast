"use strict";

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, coerceTypes: false });

class SchemaBuilder {
  build(schema) {
    return ajv.compile(schema);
  }

  addFormat(name, fn) {
    ajv.addFormat(name, fn);
    return this;
  }
}

module.exports = new SchemaBuilder();
