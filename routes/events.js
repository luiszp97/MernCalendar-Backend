/*
?  Rutas de CRUD 
?  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');


const { isDate } = require('../helpers/isDate')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJwt } = require('../middlewares/validateJwt');
const { fieldValidate } =  require('../middlewares/fields-validate');

const router = Router();

//! Todas las rutas deben pasar por las siguiente validacion 

router.use( validateJwt );

//* RUTAS

router.get('/', getEvents);


router.post('/', 
            [
                check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
                check( 'start', 'Fecha de inicio es obligatoria' ).custom( isDate ),
                check( 'end', 'Fecha de finalizacion es obligatoria' ).custom( isDate ),
                fieldValidate,
            ], 
            createEvent);


router.put('/:id', 
            [
                check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
                check( 'start', 'Fecha de inicio es obligatoria' ).custom( isDate ),
                check( 'end', 'Fecha de finalizacion es obligatoria' ).custom( isDate ),
                fieldValidate,
            ],
            updateEvent);
            

router.delete('/:id', deleteEvent);

module.exports = router;