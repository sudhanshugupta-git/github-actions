export default (sequelize, DataTypes) => {
  const Film = sequelize.define("Film",
    {
      film_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      
      description: DataTypes.TEXT,
      
      release_year: DataTypes.INTEGER,
      
      language_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      original_language_id: DataTypes.TINYINT.UNSIGNED,
      rental_duration: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 3,
      },
      rental_rate: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        defaultValue: 4.99,
      },
      length: DataTypes.SMALLINT.UNSIGNED,
      replacement_cost: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 19.99,
      },
      rating: {
        type: DataTypes.ENUM("G", "PG", "PG-13", "R", "NC-17"),
        defaultValue: "G",
      },
      special_features: {
        type: DataTypes.STRING,
        get() {
          const raw = this.getDataValue("special_features");
          return raw ? raw.split(",") : [];
        },
        set(value) {
          this.setDataValue(
            "special_features",
            Array.isArray(value) ? value.join(",") : value
          );
        },
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "film",
      timestamps: false,
    }
  );

  Film.associate = (models) => {
    Film.belongsTo(models.Language, {
      foreignKey: "language_id",
      as: "language",
    });

    Film.belongsToMany(models.Category, {
      through: models.FilmCategory, // join table, pivot table or junction table
      as: "categories",
      foreignKey: "film_id",     // This is the name of the key in the junction table (FilmCategory) that points back to the Film.
      otherKey: "category_id",  // key in the junction table that point back to Category
    });

    Film.belongsToMany(models.Actor, {
      through: "film_actor", 
      as: "actors",
      foreignKey: "film_id",
      otherKey: "actor_id",
    });
  };

  return Film;
};
