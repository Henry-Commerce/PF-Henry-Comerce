const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');
const ClothingModel = require('../models/Clothing');


router.get('/login', async (req, res) => {
  try {
    const username=req.body.username;
    const password=req.body.password;
    console.log(req.query)
    const resultUN= await UserModel.findOne({username: username})
    if(!resultUN) return res.status(400).json({message: "User not found"});
    const matchPassword = await UserModel.comparePassword(password, resultUN.password);
    if(!matchPassword) return res.status(401).json({message: "Invalid password"})
    if(matchPassword){
      const User={
        username: resultUN.username,
        email: resultUN.email,
        country:resultUN.country,
        boughtitems: resultUN.boughtitems,
        reviews: resultUN.reviews,
        isAdmin: resultUN.isAdmin,
      }
      return res.status(200).send(User);
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

router.get('/adminsinfo',async(req, res) => {

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

router.get('/info/:username', async (req, res) => {
  const { username } = req.params;
  console.log(username)
  try {
    const resultUN = await UserModel.findOne({username: username});
    if(resultUN) {
      const User={
        username: resultUN.username,
        email: resultUN.email,
        country:resultUN.country,
        boughtitems: resultUN.boughtitems,
        reviews: resultUN.reviews,
        isAdmin: resultUN.isAdmin,
        cart:resultUN.cart
      }
      return res.json(User);
    } else {
      return res.send("User not found")
    }
  } catch(error) {
    console.log('Cannot GET /user/:username', error);
  }
});

router.get('/cartdetail/:username', async(req, res) => {
  const { username } = req.params;
  let arr=[]
  try {
    const resultUN = await UserModel.findOne({username: username});
    if(!resultUN) {
      return res.send("User not found")
    }
    const User={
      cart:resultUN.cart
    }
    for(let x=0;x<User.cart.length;x++){
      try {
        const response = await ClothingModel.find({name:User.cart[x].name})
        arr.push(response)
      } catch (error) {
        console.log(error)
      }
  }
    res.send(arr);
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
    const foundUser = await UserModel.findOne({email});
    if(foundUser) return res.json({message: `Email: ${email} is already in use`})
    const newUser = new UserModel({
      username,
      email,
      password: await UserModel.encyptPassword(password),
      country,
      isAdmin
    });
    await newUser.save()
    res.send("New user created")
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

router.put('/newadmin', async (req, res) => {
  console.log(req.query)
  console.log(req.query.isAdmin)
  var newadmin = await UserModel.findOneAndUpdate(
    {username:req.query.username},
    {isAdmin:req.query.isAdmin}
    );
    return res.json(newadmin);
});


module.exports = router;
