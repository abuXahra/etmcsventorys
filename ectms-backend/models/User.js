const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    taxNumber: {
      type: String,
    },

    role: {
      type: String,
      require: true,
      enum: ["super-admin", "admin", "user"],
      default: "super-admin",
    },

    address: {
      type: String,
    },

    imgUrl: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
