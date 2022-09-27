const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ver index.js de api

router.get('/', async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log('GET /', error);
  }
});

module.exports = router;
