const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) =>{

    const events = await Event.find()
                                .populate( 'user', 'name' );

    res.status(200).json({
        ok:true,
        events
    });

}

const createEvent = async (req, res = response) =>{

    const event = new Event ( req.body );

    try {

        event.user = req.uid;

        const savedEvent = await event.save();
        
        return res.status(201).json({

            ok:true,
            savedEvent

        });
    

    } catch (error) {
       
        console.log( error )

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }

    
}

const updateEvent = async (req, res = response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if( !event ){

            res.status(400).json({
               ok: false,
               msg: 'No existe un evento con ese id' 
            })
        };

        if( event.user.toString() !== uid ){

            return  res.status(401).json({
                ok: false,
                msg: 'No privilegios para editar este evento' 
             })

        };

        const newEvent = {

            ...req.body,
            user: uid

        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } )
        
        res.status(200).json({
            ok:true,
            event: updatedEvent
        })
    

    } catch (error) {
       
        console.log( error );

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }


  
}

const deleteEvent = async (req, res = response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if( !event ){

            res.status(400).json({
               ok: false,
               msg: 'No existe un evento con ese id' 
            })
        };

        if( event.user.toString() !== uid ){

            return  res.status(401).json({
                ok: false,
                msg: 'No privilegios para eliminar este evento' 
             })

        };


        const deletedEvent = await Event.findByIdAndDelete( eventId )
        
        res.status(200).json({
            ok:true,
            event: deletedEvent
        })
    

    } catch (error) {
       
        console.log( error );

        return res.status(500).json({

            ok: false,
            msg: 'Comunicate con el administrador'

        });

    }


}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent

};