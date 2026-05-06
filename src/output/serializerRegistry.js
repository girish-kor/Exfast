"use strict";

class SerializerRegistry {
  constructor() {
    this._serializers = new Map();
    this._serializers.set("application/json", (data) => JSON.stringify(data));
  }

  register(mimeType, fn) {
    this._serializers.set(mimeType, fn);
    return this;
  }

  serialize(mimeType, data) {
    const fn =
      this._serializers.get(mimeType) ||
      this._serializers.get("application/json");
    return fn(data);
  }

  supports(mimeType) {
    return this._serializers.has(mimeType);
  }
}

module.exports = new SerializerRegistry();
