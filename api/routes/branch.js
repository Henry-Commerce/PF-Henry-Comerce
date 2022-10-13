const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const OrderModel = require("../models/Order");
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');

router.get("/create", verifyToken, function (req, res) {});

module.exports = router;
