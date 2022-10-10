const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const OrderModel = require("../models/Order");

router.post("/create_preference", (req, res) => {
  const preference = {
    items: req.body.map((element) => {
      return {
        title: element.name,
        description: element.size,
        unit_price: Number(element.price),
        quantity: Number(element.count),
      };
    }),
    back_urls: {
      success: "http://localhost:5173/success",
      failure: "http://localhost:5173/failure",
      pending: "http://localhost:5173/pending",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const newOrder = new OrderModel({
        id: response.body.id,
        items: response.body.items,
        payer: response.body.payer,
      });
      newOrder
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(404).json(error);
          console.log(error);
        });
    })
    .catch((error) => {
      console.log("Mercadopago Preferences", error);
    });
});

router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = router;
