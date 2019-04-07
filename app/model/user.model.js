module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pokedCount : {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    },
    {timestamps: false}
);
    
    return User;
  }