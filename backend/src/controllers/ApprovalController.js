const Sequelize = require('sequelize');
const config = require('../database/config.js');

const sequelize = new Sequelize(config);

const Booking = sequelize.import('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;
        const { answer_to } = req.body;

        const booking = await Booking.update({
            approved: true
        },{
            where: {
                id: booking_id
            }
        });

        const bookingUserSocket = req.connectedUsers[answer_to];

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}
