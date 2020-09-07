module.exports = (sequelize, DataTypes) => {
    const Spot = sequelize.define('wk_Spots', {
      thumbnail: DataTypes.STRING,
      company:   DataTypes.STRING,
      price:     DataTypes.FLOAT,
      techs:     DataTypes.STRING,
      UserId:    DataTypes.INTEGER,
      img_src:   {
        type: DataTypes.VIRTUAL,
        get: function(){
          const tb = this.get('thumbnail');
          return `http://192.168.2.10:3333/files/${tb}`;
        }
    }});

    Spot.associate = models => {
      Spot.belongsTo(models.User);
      Spot.hasMany(models.Booking);
    };
  
    return Spot;
}
