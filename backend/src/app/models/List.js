import Sequelize, { Model } from "sequelize";

class List extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id"});
    this.hasMany(models.Job);
  }
}

export default List;
