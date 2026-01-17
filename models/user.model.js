const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    // ✅ always required (anonymous identity)
    anonId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ optional credentials for future login
    username: {
      type: String,
      unique: true,
      sparse: true,    // ✅ allows multiple docs with missing username
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,    // ✅ allows many anonymous users without email
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,    // store hashed password later
      minlength: 6,
      select: false,   // ✅ won't return in queries by default
      sparse: true
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive:{
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
