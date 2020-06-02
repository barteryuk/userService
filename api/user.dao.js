const mongoose = require("mongoose");
const userSchema = require("./user.model");
const { encryptPass } = require("../helpers/bcrypt");

userSchema.statics = {
  create: function (data, cb) {
    data.password = encryptPass(data.password);
    const user = new this(data);
    user.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  getById: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    updateData.password = encryptPass(updateData.password);
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
