const Sequelize = require('sequelize');
const config = require('../database/config');

const sequelize = new Sequelize(config);

const User = sequelize.import('../models/User');

module.exports = {
    async store(req, res){
        const { email }  = req.body;

        const user = await User.findOrCreate({
            where: { email }
          });

        return res.json(user)
    }
}
