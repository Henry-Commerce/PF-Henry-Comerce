const { Router } = require('express');
const router = Router();
const ClothingModel = require('../models/Clothing');

router.get('/', async (req, res) => {
  try {
    const response = await ClothingModel.find({});
    if (req.query.categories) {
      const categories = req.query.categories.split(',');
      const responseArray = [];
      categories.forEach(element => {
        responseArray.push(response.filter(elementFilter => elementFilter.category === element));
      });
      return res.status(200).send(responseArray.flat());
    }
    else return res.status(200).send(response);
  } catch (error) {
    console.log('GET /clothing', error);
  }
});

router.get('/:name', async(req, res) => {
  const { name } = req.params;
  try {
    const response = await ClothingModel.find({name: name});
    res.send(response);
  } catch(error) {
    console.log('Cannot GET /clothing/:name', error);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { 
      name,
      category,
      size,
      price,
      stock,
      image
    } = req.body;
    const newCloth = new ClothingModel({
      name,
      category,
      size,
      price,
      stock,
      image
    });
    newCloth.save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(404).json(error);
      console.log(error);
    });
  } catch (error) {
    res.sendStatus(404);
    console.log('POST /add', error);
  }
})

module.exports = router;
