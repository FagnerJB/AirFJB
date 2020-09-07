const Sequelize = require('sequelize');
const config = require('../database/config.js');
const Op = Sequelize.Op;

const sequelize = new Sequelize(config);

const Spot = sequelize.import('../models/Spot');
const User = sequelize.import('../models/User');

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.findAll({
            where: {
                techs: {
                    [Op.like]: `%${tech}%`
                }
            }
        });

        return res.json(spots);

    },

    async store(req, res){
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;
        
        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exists' });
        }

        const spot = await Spot.create({
            UserId: user_id,
            thumbnail: filename,
            company,
            techs,
            price
        });

        return res.json( spot );
    }
}
