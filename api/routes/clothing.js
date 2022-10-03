const { Router } = require('express');
const router = Router();
const ClothingModel = require('../models/Clothing');

router.get('/', async (req, res) => {
  try {
    const response = await ClothingModel.find({});
    if (req.query.categories  && req.query.size === ''  && req.query.price === '') {
      const categories = req.query.categories.split(',');
      const responseArray = [];
      categories.forEach(element => {
        responseArray.push(response.filter(elementFilter => elementFilter.category === element));
      });
      return res.status(200).send(responseArray.flat());
    } else if (req.query.categories  && req.query.size  && req.query.price === '') {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach(element => {
        responseArrayCat.push(response.filter(elementFilter => elementFilter.category === element));
      });
      responseArrayCat.flat();
      const size = req.query.size.split(',');
      const responseArraySize = [];
      size.forEach(element => {
        responseArraySize.push(responseArrayCat[0].filter(elementFilter => elementFilter.stock[element] > 0));
      });
      return res.status(200).send(responseArraySize.flat());
    } else if (req.query.categories  && !req.query.size  && req.query.price) {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach(element => {
        responseArrayCat.push(response.filter(elementFilter => elementFilter.category === element));
      });
      responseArrayCat.flat();
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(responseArrayCat[0].filter(elementFilter => elementFilter.price > parseInt(price[0]) && elementFilter.price < parseInt(price[1])));
      return res.status(200).send(responseArrayPrice[0]);
    } else if (req.query.categories  && req.query.size  && req.query.price ) {
      const categories = req.query.categories.split(',');
      const responseArrayCat = [];
      categories.forEach(element => {
        responseArrayCat.push(response.filter(elementFilter => elementFilter.category === element));
      });
      responseArrayCat.flat();
      const size = req.query.size.split(',');
      const responseArraySize = [];
      size.forEach(element => {
        responseArraySize.push(responseArrayCat[0].filter(elementFilter => elementFilter.stock[element] > 0));
      });
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(responseArraySize[0].filter(elementFilter => elementFilter.price > parseInt(price[0]) && elementFilter.price < parseInt(price[1])));
      return res.status(200).send(responseArrayPrice[0]);
     } 
     if (req.query.categories === ''  && req.query.size  && req.query.price === '') {
      const size = req.query.size.split(',');
      const responseArray = [];
      size.forEach(element => {
        responseArray.push(response.filter(elementFilter => elementFilter.stock[element] > 0));
      });
      return res.status(200).send(responseArray.flat());
    }
    if (!req.query.categories && !req.query.size  && req.query.price ) {
      const price = req.query.price.split('-');
      const responseArrayPrice = response.filter(elementFilter => elementFilter.price > parseInt(price[0]) && elementFilter.price < parseInt(price[1]));
      return res.status(200).send(responseArrayPrice.flat());
    }
    if (!req.query.categories && req.query.size  && req.query.price ) {
      const size = req.query.size.split(',');
      const responseArray = [];
      size.forEach(element => {
        responseArray.push(response.filter(elementFilter => elementFilter.stock[element] > 0));
      });
      responseArray.flat();
      const price = req.query.price.split('-');
      const responseArrayPrice = [];
      responseArrayPrice.push(response.filter(elementFilter => elementFilter.price > parseInt(price[0]) && elementFilter.price < parseInt(price[1])));
      return res.status(200).send(responseArrayPrice[0]);
    } else return res.status(200).send(response);
  } catch (error) {
    console.log('GET /clothing', error);
  }
});

router.get('/search', async(req, res) => {
  try{
    if(req.query.name) {
      const name = req.query.name;
      const foundName = await ClothingModel.find({name: {'$regex' : name, '$options' : 'i'}});
      if(foundName.length > 0) {
        return res.json(foundName);
      } else {
        return res.status(404).send("No hay coincidencias")
      }
    } 
  } catch (error) {
    res.status(404).send("No hay coincidencias");
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
      price,
      stock,
      image
    } = req.body;
    const newCloth = new ClothingModel({
      name,
      category,
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
});

module.exports = router;
