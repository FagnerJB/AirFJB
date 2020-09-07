module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('wk_Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'wk_Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      SpotId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'wk_Spots',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('wk_Bookings');
  }
};
