const { users } = require("../models");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports = {
  create: (req, res) => {},
  generateOtp: (req, res) => {},
  verifyOtp: (req, res) => {},
};
