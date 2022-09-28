const { Schema, model, Types } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ClothingSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: new Schema({
      XS: Number,
      S: Number,
      M: Number,
      L: Number,
      XL: Number,
      XXL: Number
    }, {_id: false}),
    image: {
      type: String
    },
    discount: {
      type: Number,
      Min: 0,
      Max: 99
    },
    show: {
      type: Boolean
    },
    rating: {
      type: Number,
      default: 0
    },
    comments: {
      user: [{type: String}],
      comment: [{type: String}]
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ClothingSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const ClothingModel = model("Clothing", ClothingSchema);

module.exports = ClothingModel;
