const pool = require("../../../config/connection");

module.exports = {
  GetTestimonials: (callback) => {
    pool.query("select * from docare_testimonials  where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetStayConnected: (callback) => {
    pool.query("select * from docare_stay_connected where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetPricePlans: (callback) => {
    pool.query("select * from docare_price_plans  where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetContactus: (callback) => {
    pool.query("select * from docare_contact_us  where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetWorkWithUs: (callback) => {
    pool.query("select * from docare_work_with_us  where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GETTeamMember: (callback) => {
    pool.query("select * from docare_team_member where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },


 
};