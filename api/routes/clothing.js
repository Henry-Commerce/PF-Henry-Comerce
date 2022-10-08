const { Router } = require('express');
const router = Router();
const ClothingModel = require('../models/Clothing');
const middlewares = require('../middlewares')

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

router.get('/oferts', async(req, res) => {
  try {
    const {size,category,pricemin,pricemax}=req.query
   
    const response = await ClothingModel.find({});
    var filtOffer=response.filter(el=>el.discount>0)
    if(category){filtOffer=filtOffer.filter(el=>el.category===category)}
    if(pricemin){filtOffer=filtOffer.filter(el=>el.price>pricemin)}
    if(pricemax){filtOffer=filtOffer.filter(el=>el.price<pricemax)}
    if(size){ 
  var talla=size.split(",")
  console.log(talla)
  if(talla.find(el=>el==="XS")){filtOffer=filtOffer.filter(el=>el.stock.XS>0)}
  if(talla.find(el=>el==="S")){filtOffer=filtOffer.filter(el=>el.stock.S>0)}
  if(talla.find(el=>el==="M")){filtOffer=filtOffer.filter(el=>el.stock.M>0)}
  if(talla.find(el=>el==="L")){filtOffer=filtOffer.filter(el=>el.stock.L>0)}
  if(talla.find(el=>el==="XL")){filtOffer=filtOffer.filter(el=>el.stock.XL>0)}
  if(talla.find(el=>el==="XXL")){filtOffer=filtOffer.filter(el=>el.stock.XXL>0)}
  }
    res.send(filtOffer);
  } catch(error) {
    console.log('Cannot GET /clothing/oferts', error);
  }
});


router.post('/add', middlewares.decodeToken, async (req, res) => {
  try {
    const { 
      name,
      category,
      price,
      stock,
      image,
      description
    } = req.body;
    const newCloth = new ClothingModel({
      name,
      category,
      price,
      stock,
      image,
      description
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

router.put('/restock/:name', async (req, res) => {
  const newstock = await ClothingModel.findOneAndUpdate(
    {name:req.params.name},
    {stock:req.body}
    );
    return res.json(newstock);
});

router.put('/rating', async (req, res) => {
  try{
    const rating=req.query.rating
    var newrating=[]
    if(req.query.name) {
      const foundcloth = await ClothingModel.find({name:req.query.name});
      if(foundcloth.length > 0) {
        const oldrating=foundcloth[0].rating
       newrating=[...oldrating]
       newrating.push(parseInt(rating))
        varfinrating=await ClothingModel.findOneAndUpdate(
          {name:req.query.name},
          {rating:newrating}
          );
        return res.json(varfinrating);
      } else {
        return res.status(404).send("No hay coincidencias")
      }
    } 
  } catch (error) {
    res.status(404).send("No hay coincidencias");
  }
});

router.put('/review', async (req, res) => {
  try{
    const review=req.query.review
    const user=req.query.user
    var newreview=[]
    if(req.query.name) {
      const foundcloth = await ClothingModel.find({name:req.query.name});
      if(foundcloth.length > 0) {
        const oldreview=foundcloth[0].comments
        console.log(foundcloth[0].comments)
       newreview=[...oldreview]
        var actreview={
          user:user,
          comment:review
        }
        newreview.push(actreview)
        var finreview=await ClothingModel.findOneAndUpdate(
          {name:req.query.name},
          {comments:newreview}
          );
        return res.json(finreview);
      } else {
        return res.status(404).send("No hay coincidencias")
      }
    } 
  } catch (error) {
    res.status(404).send("No hay coincidencias");
  }
});

router.get('/items/:name', async(req, res) => {
  const { name } = req.params;
  try {
    const response = await ClothingModel.find({name: name});
    res.send(response);
  } catch(error) {
    console.log('Cannot GET /clothing/:name', error);
  }
});
module.exports = router;
