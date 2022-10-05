const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');


router.get('/login', async (req, res) => {
  try {
    const username=req.query.username;
    const password=req.query.password
    const resultUN= await UserModel.find({username: username})
    if(resultUN[0].password===password){
      const User={
        username: resultUN[0].username,
        email: resultUN[0].email,
        country:resultUN[0].country,
        boughtitems: resultUN[0].boughtitems,
        reviews: resultUN[0].reviews,
        isAdmin: resultUN[0].isAdmin,
      }
      return res.status(200).send(User);
    }
    else{
      console.log("aaa")
      return res.status(200).send("Usuario no encontrado")
    }

  } catch (error) {
    res.sendStatus(404);
    console.log('GET /login', console.log(error));
  }
})

router.get('/info', async(req, res) => {

  try {
    const resultUN = await UserModel.find();
    var filt= resultUN
.filter(el=>el.isAdmin==false)
.map(el=>({
  username:el.username,
  email:el.email,
  country:el.country,
  boughtitems:el.boughtitems,
  reviews:el.reviews,}))

    res.send(filt);
  } catch(error) {
    console.log('Cannot GET /info', error);
  }
});

router.get('/adminsinfo', async(req, res) => {

  try {
    const resultUN = await UserModel.find();
    var filt= resultUN
.filter(el=>el.isAdmin==true)
.map(el=>({
  username:el.username,
  email:el.email,
  country:el.country,
  boughtitems:el.boughtitems,
  reviews:el.reviews,}))

    res.send(filt);
  } catch(error) {
    console.log('Cannot GET /adminsinfo', error);
  }
});

router.get('/info/:username', async(req, res) => {
  const { username } = req.params;
  try {
    const resultUN = await UserModel.find({username: username});
    const User={
      username: resultUN[0].username,
      email: resultUN[0].email,
      country:resultUN[0].country,
      boughtitems: resultUN[0].boughtitems,
      reviews: resultUN[0].reviews,
      isAdmin: resultUN[0].isAdmin,
      cart:resultUN[0].cart
    }
    res.send(User);
  } catch(error) {
    console.log('Cannot GET /user/:username', error);
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
    const newUser = new UserModel({
      username,
      email,
      password,
      country,
      isAdmin
    });
    newUser.save()
    .then(data => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(404);
      console.log(error);
    })
  } catch (error) {
    console.log('GET /', error);
  }
});

router.put('/addcart', async (req, res) => {
  console.log(req.query)
  var newcart = await UserModel.findOneAndUpdate(
    {username:req.query.username},
    {cart:req.body}
    );
    return res.json(newcart);
});



module.exports = router;
