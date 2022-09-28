const { Router } = require('express');
const router = Router();
const UserModel = require('../models/User');

router.get('', async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
    console.log('GET /user', console.log(error));
  }
})

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

module.exports = router;
