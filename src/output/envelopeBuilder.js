"use strict";

class EnvelopeBuilder {
  success(data, meta = {}) {
    return {
      status: "success",
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    };
  }

  paginated(data, total, page, limit) {
    return this.success(data, {
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  }

  error(code, message, details) {
    const payload = {
      status: "error",
      error: { code, message },
      meta: { timestamp: new Date().toISOString() },
    };
    if (details) payload.error.details = details;
    return payload;
  }
}

module.exports = new EnvelopeBuilder();
