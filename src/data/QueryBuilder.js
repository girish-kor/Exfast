"use strict";

class QueryBuilder {
  constructor() {
    this._table = null;
    this._conditions = [];
    this._fields = ["*"];
    this._limit = null;
    this._offset = null;
    this._order = null;
  }

  from(table) {
    this._table = table;
    return this;
  }
  select(...fields) {
    this._fields = fields;
    return this;
  }
  where(condition, params) {
    this._conditions.push({ condition, params });
    return this;
  }
  limit(n) {
    this._limit = n;
    return this;
  }
  offset(n) {
    this._offset = n;
    return this;
  }
  orderBy(field, dir = "ASC") {
    this._order = `${field} ${dir}`;
    return this;
  }

  build() {
    if (!this._table) throw new Error("QueryBuilder: table not specified");
    let sql = `SELECT ${this._fields.join(", ")} FROM ${this._table}`;
    const params = [];
    if (this._conditions.length) {
      sql += " WHERE " + this._conditions.map((c) => c.condition).join(" AND ");
      this._conditions.forEach((c) => params.push(...(c.params || [])));
    }
    if (this._order) sql += ` ORDER BY ${this._order}`;
    if (this._limit !== null) sql += ` LIMIT ${this._limit}`;
    if (this._offset !== null) sql += ` OFFSET ${this._offset}`;
    return { sql, params };
  }
}

module.exports = QueryBuilder;
