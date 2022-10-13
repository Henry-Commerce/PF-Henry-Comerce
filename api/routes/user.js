/** @format */

const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const ClothingModel = require('../models/Clothing');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');

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

router.get('/info',[verifyToken, isAdmin], async (req, res) => {
  try {
    const resultUN = await UserModel.find();
    var filt = resultUN
      .filter((el) => el.isAdmin == false)
      .map((el) => ({
        username: el.username,
        email: el.email,
        country: el.country,
        boughtitems: el.boughtitems,
        reviews: el.reviews,
      }));
    res.send(filt);
  } catch (error) {
    console.log('Cannot GET /info', error);
  }
});

router.get('/adminsinfo',[verifyToken, isAdmin], async (req, res) => {
  try {
    const resultUN = await UserModel.find();
    var filt = resultUN
      .filter((el) => el.isAdmin == true)
      .map((el) => ({
        username: el.username,
        email: el.email,
        country: el.country,
        boughtitems: el.boughtitems,
        reviews: el.reviews,
      }));

    res.send(filt);
  } catch (error) {
    console.log('Cannot GET /adminsinfo', error);
  }
});

router.get('/info/:email', verifyToken, async (req, res) => {
  const { email } = req.params;
  try {
    const resultUN = await UserModel.findOne({ email: email });
    const User = {
      username: resultUN.username,
      email: resultUN.email,
      country: resultUN.country,
      boughtitems: resultUN.boughtitems,
      reviews: resultUN.reviews,
      isAdmin: resultUN.isAdmin,
      cart: resultUN.cart,
    };
    res.send(User);
  } catch (error) {
    console.log('Cannot GET /user/:email', error);
    res.send('error');
  }
});

router.get('/cartdetail/:username', verifyToken, async (req, res) => {
  const { username } = req.params;
  let arr = [];
  try {
    const resultUN = await UserModel.findOne({ username: username });
    const User = {
      cart: resultUN.cart,
    };
    for (let x = 0; x < User.cart.length; x++) {
      try {
        const response = await ClothingModel.find({ name: User.cart[x].name });
        arr.push(response);
      } catch (error) {
        console.log(error);
      }
    }
    res.send(arr);
  } catch (error) {
    console.log('Cannot GET /user/:username', error);
  }
});

router.get('/isadmin/:token', async (req, res) => {

  const { token } = req.params;
  const decoded = jwt.verify(token, SECRET);
  req.userId = decoded.id;

  const user = await UserModel.findById(req.userId, {password: 0});
  if (!user) return res.status(404).json({ mesagge: 'User not found' });
  if(user.isAdmin === false) return res.status(401).json({ isAdmin: false});
  res.status(200).json({isAdmin: true});

})

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

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const resultUN = await UserModel.findOne({ email: email });
    if (!resultUN) return res.status(400).json({ message: 'User not found' });
    const matchPassword = await UserModel.comparePassword(
      password,
      resultUN.password
    );
    if (!matchPassword)
      return res.status(401).json({ message: 'Invalid password' });
    if (matchPassword) {
      const token = jwt.sign({ id: resultUN._id }, SECRET, {
        expiresIn: 86400, // 24h
      });
      return res.status(200).json({ token });
    }
  } catch (error) {
    res.sendStatus(404);
    console.log('GET /login', console.log(error));
  }
});

router.post('/register', async (req, res) => {
  try {
    const { 
      username,
      email,
      password,
      country,
      isAdmin
    } = req.body;
    const foundUser = await UserModel.findOne({email});
    if(foundUser) return res.json({message: `Email: ${email} is already in use`})
    const newUser = new UserModel({
      username,
      email: email.toLocaleLowerCase(),
      password: await UserModel.encyptPassword(password),
      country,
      isAdmin
    });
    await newUser.save()
    const token = jwt.sign({id: newUser._id}, SECRET, {
      expiresIn: 86400 // 24h
    })
    res.json({token})
  } catch (error) {
    console.log('GET /', error);
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
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { username, country } = req.body;
  try {
    if (id) {
      const foundUser = await UserModel.findById(id);
      if (!foundUser) return res.json({ message: 'User not found' });
      await UserModel.findByIdAndUpdate(id, { username, country });
      return res.json({ message: 'Updated User' });
    } else {
      return res.json({ message: "ID isn't provided" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Internal error', error });
  }
});

router.put('/:id/login_methods', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  if (!email && !password)
    return res.json({ message: "Expected info isn't provided" });
  const foundUser = await UserModel.findById(id);
  if (!foundUser) return res.json({ message: 'User not found' });
  if (email === foundUser.email)
    return res.json({ message: 'Email should be difrent from the last one' });
  const matchPassword = await UserModel.comparePassword(
    password,
    foundUser.password
  );
  if (matchPassword)
    return res.json({
      message: 'Password should be difrent from the last one',
    });
  await UserModel.findByIdAndUpdate(id, {
    email,
    password: await UserModel.encyptPassword(password),
  });
  res.json({ message: 'Updated login methods' });
});

router.put('/shopitems', verifyToken, async (req, res) => {
  const { username } = req.query;
  var newhistorial = [];
  const { items, orderid } = req.body;
  var historial = [];
  try {
    const resultUN = await UserModel.find({ username: username });
    historial = resultUN[0].boughtitems;
    newhistorial = {
      orderid: orderid,
      items: items,
    };
    historial.push(newhistorial);
    const newcompra = await UserModel.findOneAndUpdate(
      { username: username },
      { boughtitems: historial }
    );

    res.send(newcompra);
  } catch (error) {
    console.log(error);
  }
});

router.put('/addcart', async (req, res) => {
  var newcart = await UserModel.findOneAndUpdate(
    { username: req.query.username },
    { cart: req.body }
  );
  return res.json(newcart);
});

router.put('/newadmin', [verifyToken, isAdmin], async (req, res) => {
  var newadmin = await UserModel.findOneAndUpdate(
    { username: req.query.username },
    { isAdmin: req.query.isAdmin }
  );
  return res.json(newadmin);
});

module.exports = router;
