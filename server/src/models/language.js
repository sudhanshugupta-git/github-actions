export default (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    language_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'language',
    timestamps: false
  });

  return Language;
};
