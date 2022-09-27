const { Schema, model, Types } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    country: {
      type: String,
      default: "",
    },
    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    boughtitems: {
        type: ARRAY(Types.STRING)
      },
      reseñas: {
        type: ARRAY(Types.STRING)
      },
      isAdmin:{
        type: Boolean,
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
