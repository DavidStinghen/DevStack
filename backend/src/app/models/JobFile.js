import { Model } from "sequelize";

class JobFile extends Model {
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
    this.belongsTo(models.Job, { foreignKey: "job_id"}, 'job');
    this.belongsTo(models.File, { foreignKey: "file_id"}, 'file');
  }
}

export default JobFile;