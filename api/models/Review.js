const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReviewModel = model("Review", ReviewSchema);

module.exports = ReviewModel;
