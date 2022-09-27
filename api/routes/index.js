const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const categoriesRouter = require('./clothing');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/clothing', categoriesRouter);

module.exports = router;
