"use strict";

class RepositoryBase {
  constructor(adapter) {
    if (!adapter) throw new Error("RepositoryBase requires a data adapter");
    this._adapter = adapter;
  }

  async findById(_id) {
    throw new Error("findById() must be implemented");
  }

  async findAll(_query = {}) {
    throw new Error("findAll() must be implemented");
  }

  async create(_data) {
    throw new Error("create() must be implemented");
  }

  async update(_id, _data) {
    throw new Error("update() must be implemented");
  }

  async delete(_id) {
    throw new Error("delete() must be implemented");
  }
}

module.exports = RepositoryBase;
