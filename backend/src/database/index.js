import Sequelize from "sequelize";

import dataBaseConfig from "../config/database";
import User from "../app/models/User";
import File from "../app/models/File";
import Job from "../app/models/Job";
import JobFile from "../app/models/JobFile";
import Share from "../app/models/Share";
import List from "../app/models/List";

const models = [User, File, Job, JobFile, Share, List];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
