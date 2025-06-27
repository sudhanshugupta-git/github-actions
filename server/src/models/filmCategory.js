export default (sequelize, DataTypes) => {
  const FilmCategory = sequelize.define('FilmCategory', {
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false
    },
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'film_category',
    timestamps: false
  });

  return FilmCategory;
};
