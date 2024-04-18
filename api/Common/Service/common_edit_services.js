const pool = require("../../../config/connection");

module.exports = {
  AssignVacancy: (data, callback) => {
    if(data.vacancy_primary==true){
      pool.query(
        "update dh_vacancy_new set assigned_to_external=?,vacancy_status=1,I_am_a_full_time_student=?,self_employed_F_Skatt_or_freelancer_third_party=?,agree_terms_of_employment_contract=?,vacancy_is_Accepted_Primary=true,first_Accepted_cons_id=? where id=?",
        [data.id,data.I_am_a_full_time_student,data.self_employed_F_Skatt_or_freelancer_third_party,data.agree_terms_of_employment_contract,data.cons_id,data.vid],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            console.log(result);
            return callback(null, result);
          }
        }
      );  
    }else{
      pool.query(
        "update dh_vacancy_new set assigned_to_external=?,vacancy_status=1,I_am_a_full_time_student=?,self_employed_F_Skatt_or_freelancer_third_party=?,agree_terms_of_employment_contract=? where id=?",
        [data.id,data.I_am_a_full_time_student,data.self_employed_F_Skatt_or_freelancer_third_party,data.agree_terms_of_employment_contract,data.vid],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    }
    
  },

  GetCustomerNotificationId: (data, callback) => {
    pool.query(
      "select A.created_by,B.notification_id from dh_vacancy_new A join dh_customer B on A.created_by=B.unique_id where A.id=?",
      [data.vid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  CompleteMyVacancy: (data, callback) => {
    console.log(data);
    pool.query(
      "update dh_vacancy_new set vacancy_status=2, report_start_time=?,report_end_time=?,report_break_time=?,report_total_whours=?,report_reason=? where id=?",
      [data.report_start_time, data.report_end_time, data.report_break_time, data.report_total_whours, data.report_reason, data.vid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {


          return callback(null, result);
        }
      }
    );
  },

  GetConsNotification: (data, callback) => {
    console.log(data);
    pool.query(
      "select * from dh_customer where unique_id=? AND is_active=1 ",
      [data.created_by],
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