const { response } = require('express');
const bcrypt = require('bcryptjs')
const User  = require('../models/User');
const { generateJWT } = require('../helpers/jwt')


const createUser = async ( req, res = response )=> {

    const { email, password } = req.body;


    try{
        let usuario = await User.findOne({ email });
    
        if( usuario ){

            return res.status(400).json({

                ok:false,
                msg:'El correo electronico se encuentra en uso'

            });
        }

        usuario = new User ( req.body );

    //? Encriptado de contrase;a 

        const salt = bcrypt.genSaltSync( );
        usuario.password = bcrypt.hashSync( password, salt );

    //? Guardando el Usuario en base de datos

        await usuario.save();

    //? Generar JWT

        const token = await generateJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token

        })
    } catch (error){

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })

    }
    

};

const userLogin = async (req, res = response)=> {

    const { email, password } = req.body;  

    try {
        
        const usuario = await User.findOne({ email });
    
        if( !usuario ){

            return res.status(400).json({

                ok:false,
                msg:'Email no existe'

            });
        };

    //? Validando contrase;a

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){

            return res.status(400).json({
                ok: false,
                msg: 'contrase;a incorrecta'
            });

        };

    //? Genarando el jsonWebToken

        const token = await generateJWT( usuario.id, usuario.name );

    res.json({
        ok:true,
        uid: usuario.id,
        name: usuario.name,
        token
    });

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el admin'
        })

    }

};

const tokenRenew = async (req, res = response )=> {

    const { uid, name } = req;

    try{

        const token = await generateJWT( uid, name );

        res.json({
            ok:true,
            token,
        })


    } catch (error) {
        console.log(error)
    }

   

};

module.exports = {
    createUser,
    userLogin,
    tokenRenew

}