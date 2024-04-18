const pool = require("../../../config/connection");

module.exports = {

  ApproveMyVacancy: (data, callback) => {
    pool.query("update dh_vacancy_new set vacancy_status=? where id=?", [data.status, data.id], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  EditMyProfileCustomer: (data, callback) => {
    pool.query("update dh_customer set first_name=?,last_name=?,telephone_number=?,Routine_instructions_for_the_substitutedh_customer=?,profile_img=?,company_name=?,organization_no=?,organization_type=?,organization_type_id=?,email_id=?,address=?,postal_code=?,area_name=?,invoice_address=?,invoice_postal_code=?,invoice_area_name=?,invoice_email_id=?,invoice_reference=? where id=?", [
      data.first_name,
      data.last_name,
      data.telephone_number,
      data.Routine_instructions_for_the_substitutedh_customer,
      data.profile_img,
      data.company_name,
      data.organization_no,
      data.organization_type,
      data.organization_type_id,
      data.email_id,
      data.address,
      data.postal_code,
      data.area_name,
      data.invoice_address,
      data.invoice_postal_code,
      data.invoice_area_name,
      data.invoice_email_id,
      data.invoice_reference,
      
      data.id
    ], (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
  },

  Approved_vacancy_req: (data, callback) => {
    if (data.save_cons == true) {
      pool.query("update dh_vacancy_new set approved_stime=?,approved_etime=?,feedback=?,total_approved_hrs=?,report_break_time=?,vacancy_is_approved=1 where id=?", [data.approved_stime, data.approved_etime, data.feedback, data.total_approved_hrs, data.reportBreakTime, data.id], (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          pool.query(
            "select * from dh_my_consultants where ins_id=? AND cons_id=? ",
            [
              data.unique_id,
              data.cons_id
            ],
            (error, result1, fields) => {
              if (error) {
                return callback(error);
              } else {
                if (result1.length != 0) {
                  return callback(null, { name: "The Consultant Already Added", stscode: 500 });
                }
                pool.query(
                  "insert into dh_my_consultants(ins_id,cons_id) values(?,?)",
                  [
                    data.unique_id,
                    data.cons_id
                  ],
                  (error, result, fields) => {
                    if (error) {
                      return callback(error);
                    } else {
                      return callback(null, result1);
                    }
                  }
                );
              }
            }
          );
          //return callback(null, result);
        }
      });
    } else {
      pool.query("update dh_vacancy_new set approved_stime=?,approved_etime=?,feedback=?,total_approved_hrs=?,report_break_time=?,vacancy_is_approved=1 where id=?", [data.approved_stime, data.approved_etime, data.feedback, data.total_approved_hrs, data.reportBreakTime, data.id], (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      });
    }


  },




  DenyMyVacancy: (data, callback) => {
    pool.query("update dh_vacancy_new set vacancy_status=0 ,assigned_to_internal=0,deny_reason=? where id=?", [data.reason, data.id], (error, result1, fields) => {
      if (error) {
        return callback(error);
      } else {
        pool.query("update dh_uncovered_management set is_covered=0  where id=?", [data.uncovered_id], (err, result2, fields) => {
          if (err) {
            return callback(err);
          } else {

            pool.query("insert into deny_request_list(cus_id,vid,reason) values(?,?,?)", [data.cus_id, data.id, data.reason], (error, result3, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result3);
              }
            });
          }
        });

      }
    });
  },

  Logout: (data, callback) => {

    if (data.type == 1) {


      pool.query("update dh_customer set notification_id='NA' where id=?", [data.cus_id], (err, result, fields) => {
        if (err) {
          return callback(err);
        } else {

          return callback(null, result);
        }
      });

    }

    if (data.type == 2) {
      pool.query("update dh_substitute_consultant set notification_id='NA' where id=?", [data.cons_id], (err, result, fields) => {
        if (err) {
          return callback(err);
        } else {

          return callback(null, result);
        }
      });
    }

  },


  getcons_by_id: (data, callback) => {
    pool.query("select * from dh_substitute_consultant where id=?", [data.cons_id], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result[0]);
      }
    });
  }



};