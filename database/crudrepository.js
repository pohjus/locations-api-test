let database = [
  { id: 1, latitude: 60, longitude: 70 },
  { id: 2, latitude: 40, longitude: 80 },
];

module.exports = {
  findAll: () => database,
  findById: (id) => database.find((item) => item.id === id),
  deleteById: (id) => {
    let newDB = database.filter((item) => item.id != id);

    if (newDB.length == database.length) return false;

    database = newDB;

    return true;
  },
};
