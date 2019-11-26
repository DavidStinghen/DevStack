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
    this.belongsTo(models.Job, { foreignKey: "job_id", as:'job'});
    this.belongsTo(models.File, { foreignKey: "file_id", as: 'file'});
  }
}

export default JobFile;