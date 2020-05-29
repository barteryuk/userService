const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    hp: {
      type: String,
      required: [true, "Hp is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    quota: {
      type: Number,
      required: [true, "Quota is required"],
    },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
