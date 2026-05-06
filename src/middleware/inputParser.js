"use strict";

const express = require("express");

const jsonParser = express.json({ limit: "1mb" });
const urlencodedParser = express.urlencoded({ extended: true, limit: "1mb" });

function inputParser(req, res, next) {
  jsonParser(req, res, (err) => {
    if (err) return next(err);
    urlencodedParser(req, res, next);
  });
}

module.exports = inputParser;
