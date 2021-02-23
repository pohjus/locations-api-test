let counter = 1;

let database = [
  { id: counter++, latitude: 60, longitude: 70 },
  { id: counter++, latitude: 40, longitude: 80 },
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
  save: (location) => {
    console.log("save");
    location.id = counter++;
    database.push(location);
    return location;
  },
};
