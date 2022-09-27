const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log('GET /', error);
  }
});

module.exports = router;
