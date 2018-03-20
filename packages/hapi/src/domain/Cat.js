const Sequelize = require('sequelize');

const catSchema = {
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },

  image: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
};

module.exports = sequelize => {
  const Cat = sequelize.define('Cat', catSchema, {
    tableName: 'cats',
    timestamps: false,
    paranoid: false,
    underscored: true
  });

  return Cat;
};
