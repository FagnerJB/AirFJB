const Sequelize = require('sequelize');
const config = require('../database/config.js');

const sequelize = new Sequelize(config);

const User = sequelize.import('../models/User');
const Spot = sequelize.import('../models/Spot');
const Booking = sequelize.import('../models/Booking');

module.exports = {
    
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            UserId: user_id,
            SpotId: spot_id,
            date
        });

        booking.dataValues.user = await User.findByPk(booking.UserId);
        const spot = await Spot.findByPk(booking.SpotId);
        booking.dataValues.spot = spot;

        const ownerSocket = req.connectedUsers[spot.UserId];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);

    }
}
