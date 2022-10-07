const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');

router.get('/create_preference', (req, res) => {
  res.sendStatus(200);
})

router.post("/create_preference", (req, res) => {

  let preference = {
    items: req.body.map(element => {
      return (
        {
          title: element.name,
          description: element.size,
          unit_price: Number(element.price),
          quantity: Number(element.count)
        }
      )
    }),
    back_urls: {
      "success": "http://localhost:3001/api/checkout/feedback",
      "failure": "http://localhost:3001/api/checkout/feedback",
      "pending": "http://localhost:3001/api/checkout/feedback"
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
