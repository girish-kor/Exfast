"use strict";

class MetricsCollector {
  constructor() {
    this._counters = new Map();
    this._histograms = new Map();
    this._startTime = Date.now();
  }

  increment(name, labels = {}) {
    const key = this._key(name, labels);
    this._counters.set(key, (this._counters.get(key) || 0) + 1);
  }

  record(name, value, labels = {}) {
    const key = this._key(name, labels);
    if (!this._histograms.has(key)) this._histograms.set(key, []);
    this._histograms.get(key).push(value);
  }

  snapshot() {
    return {
      uptime: Date.now() - this._startTime,
      counters: Object.fromEntries(this._counters),
      histograms: Object.fromEntries(this._histograms),
    };
  }

  _key(name, labels) {
    const labelStr = Object.entries(labels)
      .map(([k, v]) => `${k}="${v}"`)
      .join(",");
    return labelStr ? `${name}{${labelStr}}` : name;
  }
}

module.exports = new MetricsCollector();
