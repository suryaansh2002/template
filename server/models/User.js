const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    verified:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

// export model user with UserSchema
module.exports = mongoose.model("Users", UserSchema);
