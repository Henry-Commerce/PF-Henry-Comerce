const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ClothingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    stock: new Schema(
      {
        XS: Number,
        S: Number,
        M: Number,
        L: Number,
        XL: Number,
        XXL: Number,
      },
      { _id: false }
    ),
    image: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 99,
    },
    description: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: Array(
        new Schema(
          {
            email: String,
            user: String,
            title: String,
            description: String,
            rating: Number,
          },
          { _id: false }
        )
      ),
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ClothingSchema.plugin(mongooseDelete, { overrideMethods: "all" });

const ClothingModel = model("Clothing", ClothingSchema);

module.exports = ClothingModel;
