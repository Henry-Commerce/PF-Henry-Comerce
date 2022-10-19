/** @format */

const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const ClothingModel = require('../models/Clothing');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { verifyToken, isAdmin } = require('../middlewares/utils');
const mail = require('./add-ons/nodemailer');

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

router.get('/info', [verifyToken, isAdmin], async (req, res) => {
  try {
    const resultUN = await UserModel.find();
    var filt = resultUN
      .filter((el) => el.isAdmin == false)
      .map((el) => ({
        username: el.username,
        email: el.email,
        image: el.image,
        country: el.country,
        boughtitems: el.boughtitems,
        reviews: el.reviews,
        isAdmin: el.isAdmin,
      }));
    res.send(filt);
  } catch (error) {
    console.log('Cannot GET /info', error);
  }
});

router.get('/adminsinfo', [verifyToken, isAdmin], async (req, res) => {
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
        isAdmin: el.isAdmin,
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
      image: resultUN.image,
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

  const user = await UserModel.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json({ mesagge: 'User not found' });
  if (user.isAdmin === false) return res.status(401).json({ isAdmin: false });
  res.status(200).json({ isAdmin: true });
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
    const { username, email, password, country, isAdmin, image,form } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (foundUser)
      return res.json({ message: `Email: ${email} is already in use` });
    const newUser = new UserModel({
      username,
      email: email.toLocaleLowerCase(),
      password: await UserModel.encyptPassword(password),
      image: image,
      form:form,
      country,
      isAdmin,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, {
      expiresIn: 86400, // 24h
    });
    res.json({ token });
  } catch (error) {
    console.log('GET /', error);
  }
});
router.post('/welcome', async (req, res) => {
  const { name, email } = req.body;
  try {
    const transporter = mail.transporter;
    const mailwelcome = mail.mailWelcome(email, name);
    transporter.sendMail(mailwelcome, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado');
      }
    });
    res.status(201).send('ok');
  } catch (error) {
    console.log('error' + error);
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
  //añadir correo
  var newcart = await UserModel.findOneAndUpdate(
    { username: req.query.username },
    { cart: req.body }
  );
  return res.json(newcart);
});

router.put('/newadmin', [verifyToken, isAdmin], async (req, res) => {
  //añadir correo
  const { email, isAdmin } = req.body;
  try {
    var newadmin = await UserModel.findOneAndUpdate({ email }, { isAdmin });
    return res.json(newadmin);
  } catch (err) {
    console.log(err);
  }
});

router.put('/edituser', verifyToken, async (req, res) => {
  const { email, username, country, oldPassword, newPassword } = req.body;
  try {
    const userChange = await UserModel.findOneAndUpdate(
      {
        email,
      },
      {
        username,
        country,
      }
    );
    if (!oldPassword || !newPassword) {
      // añadir correo
      res.status(200).send(userChange);
    } else {
      const userComparePassword = await UserModel.comparePassword(
        oldPassword,
        userChange.password
      );
      if (userComparePassword) {
        const changedPassword = await UserModel.encyptPassword(newPassword);
        userChange.password = changedPassword;
        await userChange.save();
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.error(error);
  }
});



router.put('/edit/image', [verifyToken, isAdmin], async (req, res) => {// añadir correo
  const { email ,image } = req.body;
  if (!email || !image){return res.json({ message: "Expected info isn't provided" })};//
  console.log(email,image)
  const foundUser = await UserModel.findOne({ email: email });
  if (!foundUser) return res.json({ message: 'User not found' });
  if (!image.includes('http')) {
    return res.json({ message: 'invalid link' });
  }

  await UserModel.findOneAndUpdate(
    { email: email },
    { image: image, }
  );
  res.json({ message: 'image updated' });
});

router.put('/edit/pass/:email', [verifyToken, isAdmin], async (req, res) => {
  // añadir correo

  // añadir correo
  const { password } = req.body;
  const { email } = req.params;

  console.log(email, password);
  if (!email || !password)
    return res.json({ message: "Expected info isn't provided" }); //
  const foundUser = await UserModel.findOne({ email: email });

  if (!foundUser) return res.json({ message: 'User not found' });
  const matchPassword = await UserModel.comparePassword(
    password,
    foundUser.password
  );
  if (matchPassword)
    return res.json({
      message: 'Password should be difrent from the last one',
    }); //
  await UserModel.findOneAndUpdate(
    { email: email },
    {
      password: await UserModel.encyptPassword(password),
    }
  );
  res.json({ message: 'Updated password methods' });
});

router.put('/edit/info', verifyToken, async (req, res) => {
  const { username, country, email } = req.body;
  try {
    if (email) {
      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser)
        return res.status(404).json({ message: 'User not found' });
      if (username && country) {
        await UserModel.findOneAndUpdate({ email }, { username, country });
        return res.json({ message: 'Updated User' });
      }
      if (username && !country) {
        await UserModel.findOneAndUpdate({ email: email }, { username });
        return res.json({ message: 'Updated Username' });
      }
      if (!username && country) {
        await UserModel.findOneAndUpdate({ email: email }, { country });
        return res.json({ message: 'Updated Country' });
      }
      if (!username && !country)
        return res.status(404).json({ mesagge: 'No data provided' });
    } else {
      return res.json({ message: "Email isn't provided" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Internal error', error });
  }
});
module.exports = router;
