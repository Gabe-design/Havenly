const { sequelize } = require('./db/models');

const setup = async () => {
  try {
    await sequelize.showAllSchemas({ logging: false });
    if (process.env.NODE_ENV === "production") {
      const schema = process.env.SCHEMA;
      await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
    }
    console.log("Database setup complete!");
  } catch (error) {
    console.error("Database setup failed!", error);
  }
  process.exit();
};

setup();
