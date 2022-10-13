const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const BrachSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    coordinates: {
      type: new Schema({
        lat: Number,
        lng: Number,
      }),
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      default:
        "https://res.cloudinary.com/dg50vvzpm/image/upload/v1665624920/Henry_marker_bgee17.ico",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BrachSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const BranchModel = model("Branch", BrachSchema);

module.exports = BranchModel;
