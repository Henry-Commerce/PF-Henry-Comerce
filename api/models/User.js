const { Schema, model, Types } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
     // select: false
    },
    country: {
      type: String,
      required: true
    },
    boughtitems: {
        type: Array(Types.String)
      },
    reviews: {
        type: Array(Types.String)
      },
    isAdmin:{
        type: Boolean,
        required: true
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const UserModel = model("User", UserSchema);

module.exports = UserModel;
