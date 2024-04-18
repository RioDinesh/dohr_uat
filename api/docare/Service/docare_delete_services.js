const pool = require("../../../config/connection");

module.exports={
    DeleteTestimonials: (data, callback) => {
        pool.query(
          "update docare_testimonials set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },
      DeleteContactUs: (data, callback) => {
        pool.query(
          "update docare_contact_us set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },
      DeletePricePlans: (data, callback) => {
        pool.query(
          "update docare_price_plans set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },
      DeleteStayConnected: (data, callback) => {
        pool.query(
          "update docare_stay_connected set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },
      DeleteTeamMember: (data, callback) => {
        pool.query(
          "update docare_team_member set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },
      DeleteWorkWithUs: (data, callback) => {
        pool.query(
          "update docare_work_with_us set is_active=0 where id=?",
          [data.id],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      },


      
};