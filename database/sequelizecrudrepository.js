const { Sequelize, DataTypes } = require("sequelize");
const conf = require("../dbconfig.js");

/*
const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
  host: conf.host,
  dialect: conf.dialect,
  define: {
    timestamps: false,
  },
});*/

const sequelize = new Sequelize("sqlite::memory:", {
  define: {
    timestamps: false,
  },
}); // Example for sqlite

// Location will be the table name to be Locations,
// even person -> people will work!
const Location = sequelize.define("Location", {
  latitude: { type: DataTypes.FLOAT, defaultValue: 60 },
  longitude: { type: DataTypes.FLOAT, defaultValue: 60 },
});

const connect = async () => {
  await sequelize.authenticate();
  // creates the table if it doesn't exist
  await Location.sync();
  console.log("database connection now open");
};
connect();

module.exports = {
  findAll: () => Location.findAll(),

  findById: (id) => Location.findAll({ where: { id } }),

  deleteById: (id) => Location.destroy({ where: { id } }),

  save: async (location) => {
    const loc = await Location.create(location);
    return loc;
  },

  updateOrCreate: async (location, id) => {
    location.id = id;
    let result = await Location.upsert(location);
    return 204;
  },

  update: async (location, id) => {
    let result = await Location.update(location, { where: { id } });
    // Bug: when updating row with exactly same content 404 is raised
    return result[0] === 0 ? 404 : 204;
  },
};
