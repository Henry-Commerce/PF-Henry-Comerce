const { Router } = require("express");
const router = Router();
const ClothingModel = require("../models/Clothing");
const UserModel = require('../models/User');
const nodeMailer = require('nodemailer');
const {
  Mail_USER,
  Mail_PASSWORD2
} = process.env;

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: Mail_USER,
      pass: Mail_PASSWORD2
  }
}); 

router.get("/", async (req, res) => {
  try {
    const response = await ClothingModel.find({});
    if (
      req.query.categories &&
      req.query.size === "" &&
      req.query.price === ""
    ) {
      const categories = req.query.categories.split(",");
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
      req.query.price === ""
    ) {
      const categories = req.query.categories.split(",");
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const size = req.query.size.split(",");
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
      const categories = req.query.categories.split(",");
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const price = req.query.price.split("-");
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
      const categories = req.query.categories.split(",");
      const responseArrayCat = [];
      categories.forEach((element) => {
        responseArrayCat.push(
          response.filter((elementFilter) => elementFilter.category === element)
        );
      });
      responseArrayCat.flat();
      const size = req.query.size.split(",");
      const responseArraySize = [];
      size.forEach((element) => {
        responseArraySize.push(
          responseArrayCat[0].filter(
            (elementFilter) => elementFilter.stock[element] > 0
          )
        );
      });
      const price = req.query.price.split("-");
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
      req.query.categories === "" &&
      req.query.size &&
      req.query.price === ""
    ) {
      const size = req.query.size.split(",");
      const responseArray = [];
      size.forEach((element) => {
        responseArray.push(
          response.filter((elementFilter) => elementFilter.stock[element] > 0)
        );
      });
      return res.status(200).send(responseArray.flat());
    }
    if (!req.query.categories && !req.query.size && req.query.price) {
      const price = req.query.price.split("-");
      const responseArrayPrice = response.filter(
        (elementFilter) =>
          elementFilter.price > parseInt(price[0]) &&
          elementFilter.price < parseInt(price[1])
      );
      return res.status(200).send(responseArrayPrice.flat());
    }
    if (!req.query.categories && req.query.size && req.query.price) {
      const size = req.query.size.split(",");
      const responseArray = [];
      size.forEach((element) => {
        responseArray.push(
          response.filter((elementFilter) => elementFilter.stock[element] > 0)
        );
      });
      responseArray.flat();
      const price = req.query.price.split("-");
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
    console.log("GET /clothing", error);
  }
});

router.get("/search", async (req, res) => {
  try {
    if (req.query.name) {
      const name = req.query.name;
      const foundName = await ClothingModel.find({
        name: { $regex: name, $options: "i" },
      });
      if (foundName.length > 0) {
        return res.json(foundName);
      } else {
        return res.status(404).send("No hay coincidencias");
      }
    }
  } catch (error) {
    res.status(404).send("No hay coincidencias");
  }
});

router.get("/oferts", async (req, res) => {
  try {
    const { size, category, pricemin, pricemax } = req.query;

    const response = await ClothingModel.find({});
    var filtOffer = response.filter((el) => el.discount > 0);
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
      var talla = size.split(",");
      console.log(talla);
      if (talla.find((el) => el === "XS")) {
        filtOffer = filtOffer.filter((el) => el.stock.XS > 0);
      }
      if (talla.find((el) => el === "S")) {
        filtOffer = filtOffer.filter((el) => el.stock.S > 0);
      }
      if (talla.find((el) => el === "M")) {
        filtOffer = filtOffer.filter((el) => el.stock.M > 0);
      }
      if (talla.find((el) => el === "L")) {
        filtOffer = filtOffer.filter((el) => el.stock.L > 0);
      }
      if (talla.find((el) => el === "XL")) {
        filtOffer = filtOffer.filter((el) => el.stock.XL > 0);
      }
      if (talla.find((el) => el === "XXL")) {
        filtOffer = filtOffer.filter((el) => el.stock.XXL > 0);
      }
    }
    res.send(filtOffer);
  } catch (error) {
    console.log("Cannot GET /clothing/oferts", error);
  }
});

router.post("/add", async (req, res) => {
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
    console.log("POST /add", error);
  }
});

router.put("/restock/:name", async (req, res) => {
  const newstock = await ClothingModel.findOneAndUpdate(
    { name: req.params.name },
    { stock: req.body }
  );
  return res.json(newstock);
});



router.put("/review", async (req, res) => {
  try {
    const {name} = req.query
    const {user, title,rating, description} = req.body
    const foundCloth = await ClothingModel.findOne({
      name,
    })
    const data = foundCloth.comments
    console.log(foundCloth)
    data.push({
      user,
      title,
      rating,
      description
    })
    await ClothingModel.findOneAndUpdate({name},{comments:data})
    res.status(200).json(foundCloth)
    if(user && title){
      const foundUser = await ClothingModel.find({
        comments:{
          $elemMatch:{user,title} 
        }
      })
      
    }
    /* if (req.query.name) {
      const foundcloth = await ClothingModel.find({ name: req.query.name });
      if (foundcloth.length > 0) {
        const oldreview = foundcloth[0].comments;
        console.log(foundcloth[0].comments);
        newreview = [...oldreview];
        var actreview = {
          user: user,
          comment: review,
        };
        newreview.push(actreview);
        var finreview = await ClothingModel.findOneAndUpdate(
          { name: req.query.name },
          { comments: newreview }
        );
        return res.json(finreview);
      } else {
        return res.status(404).send("No hay coincidencias");
      }
    } */

  } catch (error) {
    res.status(404).send("No hay coincidencias");
  }
});

router.get("/items/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await ClothingModel.find({ name: name });
    res.send(response);
  } catch (error) {
    console.log("Cannot GET /clothing/:name", error);
  }
});

router.put('/send-email', async (req, res)=> {
  const {name,offer}=req.body
  try {
    const response = await ClothingModel.findOne({ name: name });
    const change= await ClothingModel.findOneAndUpdate(
      {name: name},
      {discount:offer}
      );
    const oldoffer=response.discount;
    const users=await UserModel.find({});
    if(offer>oldoffer){
    const filtuser=users.filter(el=>
      el.cart.find(le=>le.name==="SudaderaCeleste"))
    var correos=[]
    filtuser.forEach(el=>correos.push(el.email))
      const int=correos.join(",")
        let info= transporter.sendMail({
          from: '"Henry bot asistant" <bootcamphenry.ecommerce@gmail.com>', // sender address
          to: `${int}`,    //req.body.to, // list of receivers
          subject:`hubo un cambio en el precio de ${name}`,  // Subject line
          text:"aaaaaaaaaaa", //req.body.body, // plain text body // a modificar con front
          html: '<b>Esta wea se va a desconrtolaaaaaaaaaaaa</b><br/><h1>sebaaaas careeame en ow2</h1>' // html body // a modificar con front
        });
        res.status(200).send(change+info)
    }else{
      res.status(200).send(change)
    }   
  
  } catch (error) {
    console.log("error"+error)
  }
    });
    
module.exports = router;
