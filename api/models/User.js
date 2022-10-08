const { Schema, model, Types } = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require('bcryptjs');


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
        type: Array(Types.String),
        default:[]
      },
    reviews: {
        type: Array(Types.String),
        default:[]
      },
      cart:{
        type:Array(new Schema({
         name: String,
        count: Number
        }, {_id: false}))
        ,
        default:[]
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

UserSchema.statics.encyptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

UserSchema.statics.comparePassword = async (password, recievedPassword) => {
  return await bcrypt.compare(password, recievedPassword)
}
const UserModel = model("User", UserSchema);

module.exports = UserModel;
