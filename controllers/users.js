const { users } = require("../models");
const otpGenerator = require("otp-generator");
const moment = require("moment");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;
      if (!name || !phoneNumber) {
        throw { status: 400, message: "Fields cannot be empty" };
      }
      const ifUser = await users.findOne({
        where: { phone_number: phoneNumber },
      });
      if (ifUser) {
        throw {
          status: 401,
          message: "User with this phone number already exists",
        };
      }
      const User = await users.create({
        name: name,
        phone_number: phoneNumber,
      });
      res.status(200).json({ message: "User Created", User });
    } catch (err) {
      res.status(err.status || 500).json(err.message || err);
    }
  },
  generateOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        throw { status: 400, message: "Phone number is empty" };
      }
      const userFound = await users.findOne({
        where: { phone_number: phoneNumber },
      });
      if (!userFound) {
        res
          .status(403)
          .json({ message: "User with this phone number does not exists" });
      }
      const otp = otpGenerator.generate(4, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      const userOtpGenerated = await userFound.update({
        otp: otp,
        otp_expiration_date: moment().unix() + 3000,
      });
      res.status(200).json({
        message: "Otp assigned to user successfully",
        userOtpGenerated,
      });
    } catch (err) {
      res.status(err.status || 500).json(err.message || err);
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { userId } = req.params;
      const { otp } = req.query;
      if (!otp) {
        throw { status: 400, message: "Otp is not provided" };
      }
      const User = await users.findOne({ where: { id: userId } });
      if (!User) {
        throw { status: 404, message: "user not found" };
      }
      const currentTimeStamp = moment().unix();
      if (User.otp_expiration_date < currentTimeStamp || User.otp != otp) {
        res.status(401).json({ message: "otp might be wrong or expired" });
      } else {
        res.status(200).json(User);
      }
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err.message || err);
    }
  },
};
