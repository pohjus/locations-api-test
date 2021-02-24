const mysql = require("mysql");
const conf = require("../mariadbconfig.js");

const connection = mysql.createConnection(conf);

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from locations", (err, locations) => {
        if (err) {
          reject(err);
        } else {
          resolve(locations);
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "select * from locations where id = ?",
        id,
        (err, locations) => {
          if (err) {
            reject(err);
          } else {
            resolve(locations);
          }
        }
      );
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "delete from locations where id = ?",
        id,
        (err, locations) => {
          if (err) {
            reject();
          } else {
            console.log(locations);
            resolve(locations.affectedRows > 0);
          }
        }
      );
    });
  },

  save: (location) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO locations (latitude, longitude) values (?)",
        location,
        (err, results, fields) => {
          if (err) {
            reject();
          } else {
            location.id = results.insertId;
            resolve(location);
          }
        }
      );
    });
  },

  updateOrCreate: (location, id) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO locations (id, latitude, longitude)
                   VALUES (${id}, ${location.latitude}, ${location.longitude})
                   ON DUPLICATE KEY UPDATE
                   latitude = ${location.latitude}, longitude = ${location.longitude}`;

      console.log(sql);

      connection.query(sql, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results);

          if (results.insertId == 0) {
            resolve(204);
          } else {
            resolve(201);
          }
        }
      });
    });
  },

  update: (location, id) => {
    return new Promise((resolve, reject) => {
      let columns = "";
      for (let key in location) {
        columns += `${key} = ${location[key]},`;
      }
      columns = columns.slice(0, -1);
      console.log(columns);
      const sql = `UPDATE locations SET ${columns} WHERE id = (?)`;

      connection.query(sql, id, (err, results, fields) => {
        if (err) {
          reject();
        } else {
          if (results.affectedRows > 0) {
            resolve(204);
          } else {
            resolve(404);
          }
        }
      });
    });
  },
};
