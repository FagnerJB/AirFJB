module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('wk_Bookings', {
        date:     DataTypes.DATE,
        approved: DataTypes.BOOLEAN,
        UserId:   DataTypes.INTEGER,
        SpotId:   DataTypes.INTEGER
    });

    Booking.associate = models => {
        Booking.belongsTo(models.User);
        Booking.belongsTo(models.Spot);
      };
  
    return Booking;
}
