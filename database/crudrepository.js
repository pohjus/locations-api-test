let counter = 1;

let database = [
  { id: counter++, latitude: 60, longitude: 70 },
  { id: counter++, latitude: 40, longitude: 80 },
];

const generateTime = () => Math.random() * 3000;

module.exports = {
  findAll: (callback) => setTimeout(() => callback(database), generateTime()),

  findById: (id, callback) =>
    setTimeout(
      () => callback(database.find((item) => item.id === id)),
      generateTime()
    ),

  deleteById: (id, callback) => {
    setTimeout(() => {
      let newDB = database.filter((item) => item.id != id);

      if (newDB.length == database.length) {
        callback(false);
      } else {
        database = newDB;
        callback(true);
      }
    }, generateTime());
  },

  save: (location, callback) => {
    setTimeout(() => {
      location.id = counter++;
      database.push(location);
      callback(location);
    }, generateTime());
  },
};
