const pool = require("../../../config/connection");

module.exports = {
  UpdateAbsenceStatus: (data, callback) => {
    pool.query("Update dh_absence_management set is_approved=1 where id=?", [data], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
};