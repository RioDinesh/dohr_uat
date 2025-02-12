const pool = require("../../../config/connection");

module.exports = {
  CreateAdmin: (data, callback) => {
    pool.query(
      "insert into dh_admin(email_id,password) values(?,?)",
      [data.email_id, data.password],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  AdminLogin: (data, callback) => {
    pool.query(
      "select * from dh_admin where email_id=? ",
      [data.email_id],
      (error, admin, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, { Role: "ADMIN", data: admin[0], type: "ADMIN" });
      }
    );
  },

  GetAllCons: (callback) => {
    pool.query(
      "select * from dh_substitute_consultant where is_active=1 AND  is_approved=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  ExpressPass: (data, callback) => {
    pool.query(
      "select * from  dh_express_pass where date=?",
      [data.date],
      (error1, ress, fields) => {
        if (error1) {
          return callback(error1);
        }
        console.log(ress.length);
        if (ress.length != 0) {
          return callback(null, "already pass available at this date");
        }
        pool.query(
          "insert into dh_express_pass(date,count)values(?,?)",
          [data.date, data.count],
          (error, admin, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, "Pass Added");
          }
        );
      }
    );
  },

  CreateInstitute: (data, callback) => {
    var requirement_info = [];
    pool.query(
      "insert into dh_institutes(institute_name,institute_id,address,locality,postcode,institute_type,institute_type_id,institute_domin,email_id,contact_number,password) values (?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.institute_name,
        data.institute_id,
        data.address,
        data.locality,
        data.postcode,
        data.institute_type.name,
        data.institute_type.id,
        data.institute_domin,
        data.email_id,
        data.contact_number,
        data.password,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          // data.requirement_info.forEach((val) => {
          //   requirement_info.push([
          //     result.insertId,
          //     val.count,
          //     val.id,
          //     val.name,
          //   ]);
          // });

          // pool.query(
          //   "insert into dh_intitutes_requirement_info(ins_id,count,title_id,title) values ?",
          //   [requirement_info],
          //   (err, res, fields) => {
          //     if (err) {
          //       console.log(err);
          //       return callback(err);
          //     }

          //   }
          // );

          return callback(null, result);
        }
      }
    );
  },
  Validation: (data, callback) => {
    pool.query(
      `select 1 
          from (
              select email_id as email_id from dh_substitute_consultant
              union all
              select email_id from dh_customer
              union all
              select email_id from dh_institutes
          ) a
          where email_id = ?`,
      [data.email_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  ValidationINS: (data, callback) => {
    pool.query(
      `select * from dh_institutes where institute_domin =  ?`,
      [data.institute_domin],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  AddLegal: (data, callback) => {
    pool.query(
      `insert into dh_legal(legal_type,inEnglish,inSwedish,pdf) values(?,?,?,?)`,
      [data.legal_type, data.inEnglish, data.inSwedish, data.pdf],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  AddContactUsMaster: (data, callback) => {
    pool.query(
      `insert into dh_contact_us_master(phone_number,email_id) values(?,?)`,
      [data.phone_number, data.email_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  AddContactUsMessage: (data, callback) => {
    pool.query(
      `insert into dh_dohr_contactUs(first_name,last_name,cons_id,cus_id,message,email,know_more,from_web) values(?,?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.cons_id,
        data.cus_id,
        data.message,
        data.email,
        data.know_more,
        data.from_web,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  GetContactUsCustomer: (callback) => {
    pool.query(
      `select A.*,B.id as cus_id from dh_dohr_contactUs A inner join dh_customer B on A.cus_id=B.id  where A.is_active=1`,
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  GetContactUsWeb: (callback) => {
    pool.query(
      `select * from dh_dohr_contactUs  where is_active=1 AND from_web=1`,
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  GetFeedBackDohrConsultant: (callback) => {
    pool.query(
      "select A.*,B.id as cons_id  from dh_dohr_contactUs A inner join dh_substitute_consultant B on A.cons_id=B.id  where A.is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  AddLegalDescription: (data, callback) => {
    pool.query(
      `insert into dh_legal_description(description,title_id) values(?,?)`,
      [data.description, data.title_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },

  ADDFAQ: (data, callback) => {
    pool.query(
      `insert into dh_faq(faq_title,for_consultant,for_customer) values(?,?,?)`,
      [data.title, data.for_consultant, data.for_customer],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  Get_contactus_master: (callback) => {
    pool.query(
      `select * from dh_contact_us_master where is_active=1`,

      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },

  ADDFAQLIST: (data, callback) => {
    pool.query(
      `insert into dh_faq_list(faq_list,faq_id) values(?,?)`,
      [data.faq_list, data.faq_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },

  Add_feedback_for_dohr: (data, callback) => {
    pool.query(
      `insert into dh_feedback_for_dohr(dohr_service,dohr_help_service,other_feedback,cons_id,cus_id) values(?,?,?,?,?)`,
      [
        data.dohr_service,
        data.dohr_help_service,
        data.other_feedback,
        data.cons_id,
        data.cus_id,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },

  GetReservedPool: (data, callback) => {
    pool.query(
      "select * from dh_express_pass_users where cons_id=? AND is_active=1",
      [data.cons_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  GetFeedBackDohrCustomer: (callback) => {
    pool.query(
      "select A.*,A.id as feedback_id,B.id as cus_id,B.*  from dh_feedback_for_dohr A inner join dh_customer B on A.cus_id=B.id  where A.is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },

  //

  GetTickBoxIsPresent: (data, callback) => {
    pool.query(
      "select * from dh_customer where is_active=1 AND id=?",
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

  GetTickBox: (callback) => {
    pool.query(
      "select * from dh_description_tickbox_master where is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetContactUs: (callback) => {
    pool.query(
      "select * from dh_dohr_contactUs where is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetCustomerDetailsForContactUs: (data, callback) => {
    pool.query(
      "select * from dh_customer where email_id=?",
      [data.email],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetConsultantDetailsForContactUs: (data, callback) => {
    pool.query(
      "select * from dh_substitute_consultant where email_id=?",
      [data.email],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetCustomerDetails: (data, callback) => {
    pool.query(
      "select * from dh_customer where is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetConsultantDetails: (data, callback) => {
    pool.query(
      "select * from dh_substitute_consultant where is_active=1",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  EditIamConsultantDetails: (data, callback) => {
    pool.query(
      "UPDATE dh_substitute_consultant SET iam_student = ? WHERE id = ?",
      [data.iam_student, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetExpressPassUserDetails: (data, callback) => {
    pool.query(
      "select A.*,B.* from dh_express_pass_users A left join dh_substitute_consultant B on A.cons_id=B.id where A.is_active=1 AND A.pass_id=?",
      [data.pass_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetVacancyCanceledUserDetails: (data, callback) => {
    pool.query(
      "select A.*, A.created_at as vacancy_created_at,B.* from dh_canceled_vacancy_info A left join dh_substitute_consultant B on A.consultant_id=B.id where A.is_active=1 AND A.vacancy_id=? ORDER BY A.id DESC LIMIT 1",
      [data.vacancy_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  Add_Advertisment: (data, callback) => {
    pool.query(
      `insert into dh_admin_advertisment(ad_title,location,sector_id,sector,descrption,published_date,end_date) values(?,?,?,?,?,?,?)`,
      [
        data.ad_title,
        data.location,
        data.sector_id,
        data.sector,
        data.descrption,
        data.published_date,
        data.end_date,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },

  Add_sub_email: (data, callback) => {
    pool.query(
      `insert into dh_subscribe_email(email_id)values(?)`,
      [data.email],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },

  Get_Advertisment: (data, callback) => {
    pool.query(
      `Select * from dh_admin_advertisment where is_active=1`,
      [
        data.ad_title,
        data.location,
        data.sector_id,
        data.sector,
        data.descrption,
        data.published_date,
        data.end_date,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        }

        return callback(null, result);
      }
    );
  },
};

//
