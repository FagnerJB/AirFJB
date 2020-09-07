module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('wk_Users', {
      email: DataTypes.STRING,
    });

    User.associate = models => {
      User.hasMany(models.Spot);
      User.hasMany(models.Booking);
    };
  
    return User;
}
