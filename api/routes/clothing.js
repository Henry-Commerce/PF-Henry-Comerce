/** @format */

const { Router } = require('express');
const router = Router();
const ClothingModel = require('../models/Clothing');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');
const mail = require('./add-ons/nodemailer');
const { mailOffer } = require('./add-ons/nodemailer');

/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          GET                                                 *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/

router.get('/', async (req, res) => {
  try {
    const response = await ClothingModel.find({});
    if (
      req.query.categories &&
      req.query.size === '' &&
      req.query.price === ''
    ) {
      const categories = req.query.categories.split(',');
      const responseArray = [];
      categories.forEach((element) => {
        responseArray.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      return res.status(200).send(responseArray.flat());
    } else if (
      req.query.categories &&
      req.query.size &&
      req.query.price === ''
    ) {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const size = req.query.size.split(',');
      const responseArraySize = [];
      size.forEach((element) => {
        responseArraySize.push(
          responseArrayCat[0].filter(
            (elementFilter) => elementFilter.stock[element] > 0
          )
        );
      });
      return res.status(200).send(responseArraySize.flat());
    } else if (req.query.categories && !req.query.size && req.query.price) {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(
        responseArrayCat[0].filter(
          (elementFilter) =>
            elementFilter.price > parseInt(price[0]) &&
            elementFilter.price < parseInt(price[1])
        )
      );
      return res.status(200).send(responseArrayPrice[0]);
    } else if (req.query.categories && req.query.size && req.query.price) {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const size = req.query.size.split(',');
      const responseArraySize = [];
      size.forEach((element) => {
        responseArraySize.push(
          responseArrayCat[0].filter(
            (elementFilter) => elementFilter.stock[element] > 0
          )
        );
      });
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(
        responseArraySize[0].filter(
          (elementFilter) =>
            elementFilter.price > parseInt(price[0]) &&
            elementFilter.price < parseInt(price[1])
        )
      );
      return res.status(200).send(responseArrayPrice[0]);
    }
    if (
      req.query.categories === '' &&
      req.query.size &&
      req.query.price === ''
    ) {
      const size = req.query.size.split(',');
      const responseArray = [];
      size.forEach((element) => {
        responseArray.push(
          response.filter((elementFilter) => elementFilter.stock[element] > 0)
        );
      });
      return res.status(200).send(responseArray.flat());
    }
    if (!req.query.categories && !req.query.size && req.query.price) {
      const price = req.query.price.split('-');
      const responseArrayPrice = response.filter(
        (elementFilter) =>
          elementFilter.price > parseInt(price[0]) &&
          elementFilter.price < parseInt(price[1])
      );
      return res.status(200).send(responseArrayPrice.flat());
    }
    if (!req.query.categories && req.query.size && req.query.price) {
      const size = req.query.size.split(',');
      const responseArray = [];
      size.forEach((element) => {
        responseArray.push(
          response.filter((elementFilter) => elementFilter.stock[element] > 0)
        );
      });
      responseArray.flat();
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(
        response.filter(
          (elementFilter) =>
            elementFilter.price > parseInt(price[0]) &&
            elementFilter.price < parseInt(price[1])
        )
      );
      return res.status(200).send(responseArrayPrice[0]);
    } else return res.status(200).send(response);
  } catch (error) {
    console.log('GET /clothing', error);
  }
});

router.get('/search', async (req, res) => {
  try {
    if (req.query.name) {
      const name = req.query.name;
      const foundName = await ClothingModel.find({
        name: { $regex: name, $options: 'i' },
      });
      if (foundName.length > 0) {
        return res.json(foundName);
      } else {
        return res.status(404).send('No hay coincidencias');
      }
    }
  } catch (error) {
    res.status(404).send('No hay coincidencias');
  }
});

router.get('/oferts', async (req, res) => {
  try {
    const { size, category, pricemin, pricemax } = req.query;

    const response = await ClothingModel.find({});
    var filtOffer = response.filter((el) => el.discount > 0);
    filtOffer = filtOffer.filter((el) => el.show == true);
    if (category) {
      filtOffer = filtOffer.filter((el) => el.category === category);
    }
    if (pricemin) {
      filtOffer = filtOffer.filter((el) => el.price > pricemin);
    }
    if (pricemax) {
      filtOffer = filtOffer.filter((el) => el.price < pricemax);
    }
    if (size) {
      var talla = size.split(',');
      if (talla.find((el) => el === 'XS')) {
        filtOffer = filtOffer.filter((el) => el.stock.XS > 0);
      }
      if (talla.find((el) => el === 'S')) {
        filtOffer = filtOffer.filter((el) => el.stock.S > 0);
      }
      if (talla.find((el) => el === 'M')) {
        filtOffer = filtOffer.filter((el) => el.stock.M > 0);
      }
      if (talla.find((el) => el === 'L')) {
        filtOffer = filtOffer.filter((el) => el.stock.L > 0);
      }
      if (talla.find((el) => el === 'XL')) {
        filtOffer = filtOffer.filter((el) => el.stock.XL > 0);
      }
      if (talla.find((el) => el === 'XXL')) {
        filtOffer = filtOffer.filter((el) => el.stock.XXL > 0);
      }
    }
    res.send(filtOffer);
  } catch (error) {
    console.log('Cannot GET /clothing/oferts', error);
  }
});

router.get('/items/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const response = await ClothingModel.find({ name: name });
    res.send(response);
  } catch (error) {
    console.log('Cannot GET /clothing/:name', error);
  }
});
/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          POST                                                *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/

router.post('/add', [verifyToken, isAdmin], async (req, res) => {
  try {
    const { name, category, price, stock, image, description } = req.body;
    const newCloth = new ClothingModel({
      name,
      category,
      price,
      stock,
      image,
      description,
    });
    newCloth
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(404).json(error);
        console.log(error);
      });
  } catch (error) {
    res.sendStatus(404);
    console.log('POST /add', error);
  }
});
/************************************************************************************************
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                          PUT                                                 *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 *                                                                                              *
 ************************************************************************************************/

router.put('/restock/:name', [verifyToken, isAdmin], async (req, res) => {
  //restock de la prenda
  const newstock = await ClothingModel.findOneAndUpdate(
    { name: req.params.name },
    { stock: req.body }
  );
  return res.json(newstock);
});

router.put('/showable', [verifyToken, isAdmin], async (req, res) => {
  //APARECERLA O DESAPARECERLA
  const show = await ClothingModel.findOneAndUpdate(
    { name: req.body.name },
    { show: req.body.show }
  );
  const result = await ClothingModel.find({ name: req.body.name });
  return res.json(result);
});

router.put('/reviewupdate', verifyToken, async (req, res) => {
  //Actualizar las reviews de la prenda
  try {
    const { name } = req.query;
    const { user, title, description, rating, isDeleting, email } = req.body;
    const foundCloth = await ClothingModel.findOne({
      name,
    });
    const commentsArray = foundCloth.comments;
    if (isDeleting) {
      const leftoverReviews = commentsArray.filter(element => element.email !== email);
      await ClothingModel.findOneAndUpdate(
        { name },
        { comments: leftoverReviews }
      );
      res.status(200).json(leftoverReviews);
    } else {
      const newReview = {
        email,
        user,
        title,
        description,
        rating,
      };
      Object.keys(newReview).forEach(
        (element) =>
          (newReview[element] =
            typeof newReview[element] == 'string'
              ? newReview[element].trim()
              : newReview[element])
      );
      commentsArray.push(newReview);
      await ClothingModel.findOneAndUpdate(
        { name },
        { comments: commentsArray }
      );
      res.status(200).json(foundCloth);
    }
  } catch (error) {
    console.error(error);
  }
});

router.put('/updateprice', [verifyToken, isAdmin], async (req, res) => {
  const { name, price } = req.body;
  try {
    const change = await ClothingModel.findOneAndUpdate(
      { name: name },
      { price: price }
    );

    const response = await ClothingModel.findOne({ name: name });
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
  }
});

router.put('/updateoffer', [verifyToken, isAdmin], async (req, res) => {
  // actualizar descuentos
  const { name, offer } = req.body;
  try {
    const response = await ClothingModel.findOne({ name: name });
    const change = await ClothingModel.findOneAndUpdate(
      { name: name },
      { discount: offer }
    );
    const oldoffer = response.discount;
    const users = await UserModel.find({});
    if (offer > oldoffer) {
      const filtuser = users.filter((el) =>
        el.cart.find((le) => le.name === name)
      );
      var correos = [];
      filtuser.forEach((el) => correos.push(el.email));
      const email = correos.join(',');
      const transporter = mail.transporter;
      const mailOffer = mail.mailOffer(email, name);
      transporter.sendMail(mailOffer, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado');
        }
      });
      res.status(201).send('ok');
    } else {
      res.status(200).send(change);
    }
  } catch (error) {
    console.log('error' + error);
  }
});

module.exports = router;
