module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("jobs", "list_id", {
      type: Sequelize.INTEGER,
      references: { model: "lists", key: "id" },
      defaultValue: 1,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeCollumn("jobs", "list_id");
  }
};