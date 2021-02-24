const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("sqlite::memory:"); // Example for sqlite

const sequelize = new Sequelize("exercises", "", "", {
  host: "localhost",
  dialect: "mariadb",
  define: {
    timestamps: false,
  },
});

// Location will be the table name to be Locations,
// even person -> people will work!
const Location = sequelize.define("Location", {
  latitude: { type: DataTypes.FLOAT, defaultValue: 60 },
  longitude: { type: DataTypes.FLOAT, defaultValue: 60 },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    // creates the table if it doesn't exist
    await Location.sync();
    console.log("Connection has been established successfully.");
    let result = await Location.findAll();
    console.log(result);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
