/** @format */

const { Router } = require('express');
const { verifyToken, isAdmin } = require('../middlewares/utils');
const router = Router();
const BranchModel = require('../models/Branch');

router.get('/', async (req, res) => {
  try {
    const response = await BranchModel.find({});
    res.status(200).send(response);
  } catch (error) {
    console.log('Cannot GET /branch', error);
  }
});

router.post('/add', [verifyToken, isAdmin], (req, res) => {
  const { street, coordinates } = req.body;
  try {
    const newBranch = new BranchModel({
      street,
      coordinates,
    });
    newBranch
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
    console.log('Cannot POST /branch/add', error);
  }
});

router.delete('/delete', async (req, res) => {
  const { _id } = req.body;
  try {
  } catch (error) {
    console.log('Cannot DELETE /branch/delete', error);
  }
});

module.exports = router;
