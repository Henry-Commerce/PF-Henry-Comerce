const { Router } = require('express');
const router = Router();

router.get('/create_preference', (req, res) => {
  res.sendStatus(200);
})

router.post("/create_preference", (req, res) => {

  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      }
    ],
    back_urls: {
      "success": "http://localhost:3001/api/feedback",
      "failure": "http://localhost:3001/api/feedback",
      "pending": "http://localhost:3001/api/feedback"
    },
    auto_return: "approved",
  };

  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id
      });
    }).catch(function (error) {
      console.log(error);
    });
});

router.get('/feedback', function(req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
});

module.exports = router;
