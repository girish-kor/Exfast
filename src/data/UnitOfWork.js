"use strict";

class UnitOfWork {
  constructor(adapter) {
    this._adapter = adapter;
    this._operations = [];
  }

  enqueue(operation) {
    this._operations.push(operation);
    return this;
  }

  async commit() {
    await this._adapter.beginTransaction();
    try {
      for (const op of this._operations) {
        await op(this._adapter);
      }
      await this._adapter.commit();
      this._operations = [];
    } catch (err) {
      await this._adapter.rollback();
      throw err;
    }
  }

  rollback() {
    this._operations = [];
    return this._adapter.rollback();
  }
}

module.exports = UnitOfWork;
