const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const OrderModel = require("../models/Order");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require("../middlewares/utils");

router.get("/", async (req, res) => {
  const { email } = req.query;
  const query = await OrderModel.find({ identifier: email });
  res.status(200).send(query);
});

router.post("/create_preference", (req, res) => {
  const { email, lsCartProducts } = req.body;
  const preference = {
    items: lsCartProducts.map((element) => {
      return {
        title: element.name,
        description: element.size,
        unit_price: Number(element.price),
        quantity: Number(element.count),
      };
    }),
    back_urls: {
      success: "https://henry-commerce.netlify.app/success",
      failure: "https://henry-commerce.netlify.app/failure",
      pending: "https://henry-commerce.netlify.app/pending",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const newOrder = new OrderModel({
        id: response.body.id,
        items: lsCartProducts,
        payer: response.body.payer,
        identifier: email,
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

router.put("/collectionstatus", async (req, res) => {
  const { id, status, paymentid } = req.body;
  try {
    const foundOrder = await OrderModel.findOne({ id });
    if (paymentid) {
      foundOrder.payment.paymentid = paymentid;
    }
    foundOrder.payment.status = status;
    await foundOrder.save();
  } catch (error) {
    console.log("Cannot PUT /checkout/collectionstatus", error);
  }
});

router.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = router;
