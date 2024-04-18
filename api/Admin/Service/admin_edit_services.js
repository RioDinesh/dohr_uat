const pool = require("../../../config/connection");

module.exports = {
  ApproveSub: (data, callback) => {
    pool.query(
      "Update dh_substitute_consultant set is_approved=true ,password=? ,is_inactive=false where id=?",
      [
        data.password,
        data.id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  DenySub: (data, callback) => {
    pool.query(
      "Update dh_substitute_consultant set is_denied=? where id=?",
      [
        data.data,
        data.id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  ExpressPassUpdate: (data, callback) => {
    pool.query("select * from  dh_express_pass_users where date=? AND cons_id=? AND is_active=1", [data.date,

    data.cons_id], (err, response, fields) => {
      if (err) {
        return callback(error1);
      }
      console.log()
      if (response.length != 0) {
        return callback(null, "User Already Have Pass");
      }

      pool.query(
        `insert into dh_express_pass_users (
          date,
          pass_id,
          cons_id
          )
          VALUES(?,?,?)`,
        [
          data.date,
          data.pass_id,
          data.cons_id,
        ],
        (error1, result1, fields) => {
          if (error1) {
            return callback(error1);
          } else {
            pool.query(
              "Update dh_express_pass set filled_count=filled_count+1 where date=?",
              [
                data.date
              ],
              (error2, result2, fields) => {
                if (error2) {
                  return callback(error2);
                } else {
                  return callback(null, "Bookin Complete");
                }
              }
            );
            //return callback(null, result);
          }
        }
      );
    });

  },



  EditExpressPass: (data, callback) => {
    pool.query(
      "Update dh_express_pass set count=?, is_open=? where id=?",
      [
        data.count,
        data.open,
        data.id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  EditAdvertisment: (data, callback) => {
    pool.query(
      "Update dh_admin_advertisment set ad_title=?, location=?,sector_id=?,sector=?,descrption=?,published_date=?,end_date=? where id=?",
      [
        data.ad_title,
        data.location,
        data.sector_id,
        data.sector,
        data.descrption,
        data.published_date,
        data.end_date,
        data.id

      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },


  MakeCustomerActive: (data, callback) => {
    pool.query(
      "Update dh_customer set is_inactive=? where id=?",
      [
        data.data,
        data.id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  MakeConsultantActive: (data, callback) => {
    pool.query(
      "Update dh_substitute_consultant set is_inactive=? where id=?",
      [
        data.data,
        data.id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  // CancelExpressPass: (data, callback) => {
  //   pool.query(
  //     "Update dh_express_pass_users set is_active=0 where id=?",
  //     [data.id],
  //     (error, result, fields) => {
  //       if (error) {
  //         return callback(error);
  //       }else{
  //         return callback(null, result);
  //       }



  //     }
  //   );

  // }
};