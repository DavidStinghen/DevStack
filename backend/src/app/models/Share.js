import { Model } from "sequelize";

class Share extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Job, { foreignKey: "job_id"});
    this.belongsTo(models.User, { foreignKey: "user_id", as: "dev" });
  }
}

export default Share;