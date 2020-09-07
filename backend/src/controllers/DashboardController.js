const Sequelize = require('sequelize');
const config = require('../database/config.js');

const sequelize = new Sequelize(config);

const Spot = sequelize.import('../models/Spot');

module.exports = {
    async show(req, res){
        const { user_id } = req.headers;

        const spots = await Spot.findAll({
            where: {
                UserId: user_id
            }
        });

        return res.json(spots);

    }
}
