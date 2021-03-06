/* eslint-disable import/no-commonjs */
/*
 * @Author: Luo Wei
 * @Date: 2022-04-02 20:55:44
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-08 15:53:13
 */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Authorization: String,
  list: [
    {
      title: String,
      date: String,
      time: String
    }
  ],
  focusTimes: Number,
  listLength: Number,
});

module.exports = mongoose.model("users", UserSchema);
