/*
?  Rutas de Usuarios / Auth
?  host + /api/auth 
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { fieldValidate } = require('../middlewares/fields-validate');
const { createUser, userLogin, tokenRenew } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

//! Rutas

router.post('/new',
            [
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El nombre es obligatorio').isEmail(),
                check('password', 'El nombre es obligatorio').isLength({min:6}),
                fieldValidate
                
            ],
            createUser );

router.post('/',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe contener mas de 6 caracteres').isLength({min:6}),
                fieldValidate
            ], 
            userLogin);

router.get('/renew', 
            [ 
                validateJwt 
            ],
            tokenRenew)


module.exports = router;