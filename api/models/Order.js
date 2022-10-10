const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;
