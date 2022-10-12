const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const BrachSchema = new Schema(
  {
    name: {
      type: String,
    },
    street: {
      type: String,
      required: true,
      unique: true,
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
