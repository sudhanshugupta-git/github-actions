export default (sequelize, DataTypes) => {
  const Actor = sequelize.define('Actor', {
    actor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    last_update: DataTypes.DATE
  }, {
    tableName: 'actor',
    timestamps: false
  });

  Actor.associate = models => {
    Actor.belongsToMany(models.Film, {
      through: 'film_actor',
      as: 'films',
      foreignKey: 'actor_id',
      otherKey: 'film_id'
    });
  };

  return Actor;
};