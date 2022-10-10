const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    payer: new Schema({
      email: String,
      name: String,
      surname: String,
    }),
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
