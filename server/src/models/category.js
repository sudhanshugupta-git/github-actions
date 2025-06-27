export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category",
    {
      category_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "category",
      timestamps: false,
    }
  );

  Category.associate = (models) => {
    Category.belongsToMany(models.Film, {
      through: models.FilmCategory, 
      as: "films",
      foreignKey: "category_id",
      otherKey: "film_id",
    });
  };

  return Category;
};
