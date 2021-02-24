let counter = 1;

let database = [
  { id: counter++, latitude: 60, longitude: 70 },
  { id: counter++, latitude: 40, longitude: 80 },
];

const generateTime = () => Math.random() * 1000;

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(database);
      }, generateTime());
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(database.find((item) => item.id === id)),
        generateTime()
      );
    });
  },
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let newDB = database.filter((item) => item.id != id);

        if (newDB.length == database.length) {
          resolve(false);
        } else {
          database = newDB;
          resolve(true);
        }
      }, generateTime());
    });
  },

  save: (location) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        location.id = counter++;
        database.push(location);
        resolve(location);
      }, generateTime());
    });
  },

  updateOrCreate: (location, id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = database.findIndex((item) => item.id === id);
        location.id = id;

        if (index == -1) {
          database.push(location);
          resolve(201);
        } else {
          database[index] = location;
          resolve(204);
        }
      }, generateTime());
    });
  },

  update: (location, id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = database.findIndex((item) => item.id === id);

        if (index == -1) {
          resolve(404);
        } else {
          // merging object
          database[index] = { ...database[index], ...location };
          resolve(204);
        }
      }, generateTime());
    });
  },
};
