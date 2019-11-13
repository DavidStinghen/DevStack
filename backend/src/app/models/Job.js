import Sequelize, { Model } from "sequelize";

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        status: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "provider_id"});
  }
}

export default Job;
