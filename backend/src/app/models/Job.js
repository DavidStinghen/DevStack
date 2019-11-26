import Sequelize, { Model } from "sequelize";

class Job extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id"});
    this.belongsTo(models.List, { foreignKey: "list_id"});
    this.hasMany(models.JobFile, { foreignKey: "job_id", as: 'job'});
  }
}

export default Job;
