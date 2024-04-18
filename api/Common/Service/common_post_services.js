const pool = require("../../../config/connection");

module.exports = {
  AddTitle: (data, callback) => {
    pool.query(
      "insert into dh_title (title) values(?)",
      [data.title],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  AddFeedbackCompletedVacancy: (data, callback) => {
    pool.query(
      "update dh_vacancy_new set rate_your_day=?,rate_info=?,rate_sufficiency=? where id=?",
      [data.rate_your_day, data.rate_info, data.rate_sufficiency, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  AddLeaveMaster: (data, callback) => {
    pool.query(
      "insert into dh_leave_master (leave_type,description) values(?,?)",
      [data.leave_type, data.description],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  AddOrganizationType: (data, callback) => {
    pool.query(
      "insert into dh_organization_type (organization_type) values(?)",
      [data.organization_type],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  GetAdressByPostCode: (data, callback) => {
    pool.query(
      "select * from dh_postcodes where Code=?",
      [data.postcode],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetMyVacancy: (data, callback) => {
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id from dh_vacancy_new V join dh_institutes I  where V.is_active=1 And I.id= V.ins_id AND V.assigned_to_external=? AND V.vacancy_status=1",
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

  GetMyCompletedVacancyCus: (data, callback) => {
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id from dh_vacancy_new V join dh_customer I  on V.assigned_to_internal=I.id where V.ins_id=? AND V.vacancy_status=2",
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

  GetMyCompletedVacancyCons: (data, callback) => {
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id from dh_vacancy_new V join dh_substitute_consultant I  on V.assigned_to_external=I.id where V.ins_id=? AND V.vacancy_status=2",
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

  GetMyCompletedVacancyCons2: (data, callback) => {
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id ,I.postalcode as c_postal_code,I.area_name as c_area_name,I.address as c_address,D.postcode,D.locality,D.address from dh_vacancy_new V join dh_substitute_consultant I  on V.assigned_to_external=I.id join  dh_institutes D on V.ins_id=D.id where V.assigned_to_external=? AND V.vacancy_status=2 AND V.is_active=1",
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
  GetVacancyByDate: (data, callback) => {
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id from dh_vacancy_new V join dh_institutes I  where I.id= V.ins_id AND V.v_date=? AND V.is_active=1 AND V.publish_to_id=1",
      [data.date],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  CheckConsOnlyVacancy: (data, callback) => {
    pool.query(
      "SELECT * FROM dh_my_consultants where cons_id=?",
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
  GetConsOnlyVacancy: (data, callback) => {
    //select A.institute_name,A.institute_type,A.id as INS_MASTER_ID,C.address,C.postal_code,C.area_name,C.unique_id,B.* from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.ins_id=? AND B.vacancy_status=? AND B.is_active=1 AND B.is_draft=0
    pool.query(
      "select V.*,V.id as vid,I.* ,I.id as in_id from dh_vacancy_new V join dh_institutes I  where I.id= V.ins_id AND V.v_date=? AND V.is_active=1 AND V.publish_to_id=3",
      [data.date],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  CustomerFeebBack: (data, callback) => {
    pool.query(
      "insert into dh_feedback(rating,feedback,cus_id,created_by) values(?,?,?,?)",
      [data.rating, data.feedback, data.cus_id,data.created_by],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  ConsultantFeebBack: (data, callback) => {
    pool.query(
      "insert into dh_feedback(rating,feedback,cons_id,created_by,postion,V_date,vid) values(?,?,?,?,?,?,?)",
      [data.rating, data.feedback, data.cons_id,data.created_by,data.postion,data.v_date,data.vid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          pool.query(
            "Update dh_vacancy_new set is_feedback_given=1 where id=?",
            [data.vid],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result);
              }
            });
         // return callback(null, result);
        }
      }
    );
  },

  GetConsultantLocations: (data, callback) => {
   
    pool.query(
      "select * from dh_substitute_consultant where id=?",
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

  CusChat: (data, callback) => {
    console.log(data);
    pool.query(
      "update dh_chat_profile set consultant_has_new_message=1 where id=?",
      [data.chat_id],
      (erroru, resultupdate, fields) => {
        if (erroru) {
          return callback(erroru);
        } else {

          pool.query(
            "insert into dh_chats(cus_message,chat_id) values(?,?)",
            [data.message, data.chat_id],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result);
              }
            }
          );
        }
      }
    );
    
    
  },

  GetNotificationIDCon: (data, callback) => {
    pool.query(
      "select C.*,S.id,S.notification_id from dh_chat_profile C join dh_substitute_consultant S on C.cons_id=S.id where C.id=?",
      [data.chat_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          console.log(result[0]);
          return callback(null, result[0]);
        }
      }
    );
  },

  GetNotificationIDCus: (data, callback) => {
    pool.query(
      "select C.*,S.id,S.notification_id from dh_chat_profile C join dh_customer S on C.unique_id=S.unique_id where C.id=?",
      [data.chat_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          console.log(result[0]);
          return callback(null, result[0]);
        }
      }
    );
  },

  GetChat: (data, callback) => {
    if(data.type==1){
      pool.query(
        "update dh_chat_profile set customer_has_new_message=0 where id=?",
        [data.chat_id],
        (erroru, resultupdate, fields) => {
          if (erroru) {
            return callback(erroru);
          } else {
            pool.query(
              "select * from dh_chats where chat_id=?",
              [data.chat_id],
              (error, result, fields) => {
                if (error) {
                  return callback(error);
                } else {
                  return callback(null, result);
                }
              }
            );
          }
        }
      );
    }
    if(data.type==2){
      pool.query(
        "update dh_chat_profile set consultant_has_new_message=0 where id=?",
        [data.chat_id],
        (erroru, resultupdate, fields) => {
          if (erroru) {
            return callback(erroru);
          } else {
            pool.query(
              "select * ,DATE_ADD(created_at, INTERVAL 2 HOUR) as time  from dh_chats where chat_id=?",
              [data.chat_id],
              (error, result, fields) => {
                if (error) {
                  return callback(error);
                } else {
                  return callback(null, result);
                }
              }
            );
          }
        }
      );
    }
    
    
   
  },

  ConChat: (data, callback) => {
    console.log(data);
    pool.query(
      "update dh_chat_profile set customer_has_new_message=1 where id=?",
      [data.chat_id],
      (error, resultu, fields) => {
        if (error) {
          return callback(error);
        } else {
          console.log(resultu);
          pool.query(
            "insert into dh_chats(con_message,chat_id) values(?,?)",
            [data.message, data.chat_id],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result);
              }
            }
          );
        }
      }
    );
    
    
  },

  GetRating: (data, callback) => {
    if (data.type == 1) {
      pool.query(
        "select C.*,F.* from dh_feedback F join  dh_substitute_consultant C on F.cons_id=C.id where F.cons_id=?",
        [data.id],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    } else {
      pool.query(
        "select C.*,F.* from dh_feedback F join  dh_customer C on F.cus_id=C.id where F.cus_id=?",
        [data.id],
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

  GetAllCustomer: (data, callback) => {
    if (data.type == 1) {
      pool.query(
        "select * from dh_customer ",
        [data.id],
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
  GetCusByUniqueId: (data, callback) => {
    pool.query(
      "select * from dh_customer where unique_id=?",
      [data.unique_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },

  GetConsById: (data, callback) => {
    pool.query(
      "select * from dh_substitute_consultant where id=?",
      [data.cons_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },

  GetAllVacancyByDateAndType: (data, callback) => {
    pool.query(
      `select A.*,
      B.id as cus_id,
      B.first_name as customer_firstname,
      B.last_name as customer_lastname,
      B.email_id as customer_emailID,
      B.telephone_number as customer_telephone_number,
      B.company_name as customer_company_name,
      B.title as customer_title,
      B.title_id as customer_title_id,
      B.ins_id as customer_ins_id,
      B.organization_no as customer_organization_no,
      B.organization_type_id as customer_organization_type_id,
      B.organization_type as customer_organization_type,
      B.address as customer_address,
      B.postal_code as customer_postal_code,
      B.area_name as customer_area_name,
      B.invoice_address as customer_invoice_address,
      B.invoice_postal_code as customer_invoice_postal_code,
      B.invoice_area_name as customer_invoice_area_name,
      B.invoice_email_id as customer_invoice_email_id,
      B.invoice_reference as customer_invoice_reference,
      B.job_description as customer_job_description,
      B.short_description as customer_short_description,
      B.unique_id as customer_unique_id,
      B.Routine_instructions_for_the_substitutedh_customer as customer_Routine_instructions_for_the_substitutedh_customer,
      B.notification_id as customer_notification_id,
      B.is_verfied as customer_is_verfied,
      B.profile_img as customer_profile_img,
      C.id as cons_id,
      C.first_name as consultant_first_name,
      C.last_name as consultant_last_name,
      C.email_id as consultant_email_id,
      C.phone_number as consultant_phone_number,
      C.swedish_personal_number as consultant_swedish_personal_number,
      C.self_employed as consultant_self_employed,
      C.swedish_bank_account as consultant_swedish_bank_account,
      C.bank_account_number as consultant_bank_account_number,
      C.emergency_contact_number as consultant_emergency_contact_number,
      C.emergency_contact_lastname as consultant_emergency_contact_lastname,
      C.emergency_contact_firstname as consultant_emergency_contact_firstname,
      C.clearing_number as consultant_clearing_number,
      C.bank_name as consultant_bank_name,
      C.preferred_location_5 as consultant_preferred_location_5,
      C.preferred_location_4 as consultant_preferred_location_4,
      C.preferred_location_3 as consultant_preferred_location_3,
      C.preferred_location_2 as consultant_preferred_location_2,
      C.preferred_location_1 as consultant_preferred_location_1,
      C.postalcode as consultant_postalcode,
      C.area_name as consultant_area_name,
      C.address as consultant_address,
      C.preferred_work_institution as consultant_preferred_work_institution,
      C.description as consultant_description,
      C.iam_student as consultant_iam_student,
      C.name_of_institutition as consultant_name_of_institutition,
      C.work_exp_in_school as consultant_work_exp_in_school,
      C.info_work_exp_in_school as consultant_info_work_exp_in_school,
      C.work_exp_out_school as consultant_work_exp_out_school,
      C.info_work_exp_out_school as consultant_info_work_exp_out_school,
      C.other_occupations as consultant_other_occupations,
      C.info_other_occupations as consultant_info_other_occupations,
      C.as_soon_as_possible as as_soon_as_possible,
      C.specify_date as consultant_specify_date,
      C.language_skills as consultant_language_skills,
      C.police_clearance_report as consultant_police_clearance_report,
      C.police_report as consultant_police_report,
      C.Driving_license as consultant_Driving_license,
      C.terms_and_condition as consultant_terms_and_condition,
      C.is_active as consultant_is_active,
      C.is_approved as consultant_is_approved,
      C.notification_id as consultant_notification_id,
      C.profile_img as consultant_profile_img,
   
      A.id as v_id 
      from dh_vacancy_new A join dh_customer B on A.created_by=B.unique_id LEFt join dh_substitute_consultant C on A.assigned_to_external=C.id where A.is_active=1`,
      [data.cons_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetAllVacancyByDateAndSatus: (data, callback) => {
    pool.query(
      `select A.*,
      B.id as cus_id,
      B.first_name as customer_firstname,
      B.last_name as customer_lastname,
      B.email_id as customer_emailID,
      B.telephone_number as customer_telephone_number,
      B.company_name as customer_company_name,
      B.title as customer_title,
      B.title_id as customer_title_id,
      B.ins_id as customer_ins_id,
      B.organization_no as customer_organization_no,
      B.organization_type_id as customer_organization_type_id,
      B.address as customer_address,
      B.postal_code as customer_postal_code,
      B.area_name as customer_area_name,
      B.invoice_address as customer_invoice_address,
      B.invoice_postal_code as customer_invoice_postal_code,
      B.invoice_area_name as customer_invoice_area_name,
      B.invoice_email_id as customer_invoice_email_id,
      B.invoice_reference as customer_invoice_reference,
      B.job_description as customer_job_description,
      B.short_description as customer_short_description,
      B.unique_id as customer_unique_id,
      B.Routine_instructions_for_the_substitutedh_customer as customer_Routine_instructions_for_the_substitutedh_customer,
      B.notification_id as customer_notification_id,
      B.is_verfied as customer_is_verfied,
      B.profile_img as customer_profile_img,
      C.id as cons_id,
      C.first_name as consultant_first_name,
      C.last_name as consultant_last_name,
      C.email_id as consultant_email_id,
      C.phone_number as consultant_phone_number,
      C.swedish_personal_number as consultant_swedish_personal_number,
      C.self_employed as consultant_self_employed,
      C.swedish_bank_account as consultant_swedish_bank_account,
      C.bank_account_number as consultant_bank_account_number,
      C.emergency_contact_number as consultant_emergency_contact_number,
      C.emergency_contact_lastname as consultant_emergency_contact_lastname,
      C.emergency_contact_firstname as consultant_emergency_contact_firstname,
      C.clearing_number as consultant_clearing_number,
      C.bank_name as consultant_bank_name,
      C.preferred_location_5 as consultant_preferred_location_5,
      C.preferred_location_4 as consultant_preferred_location_4,
      C.preferred_location_3 as consultant_preferred_location_3,
      C.preferred_location_2 as consultant_preferred_location_2,
      C.preferred_location_1 as consultant_preferred_location_1,
      C.postalcode as consultant_postalcode,
      C.area_name as consultant_area_name,
      C.address as consultant_address,
      C.preferred_work_institution as consultant_preferred_work_institution,
      C.description as consultant_description,
      C.iam_student as consultant_iam_student,
      C.name_of_institutition as consultant_name_of_institutition,
      C.work_exp_in_school as consultant_work_exp_in_school,
      C.info_work_exp_in_school as consultant_info_work_exp_in_school,
      C.work_exp_out_school as consultant_work_exp_out_school,
      C.info_work_exp_out_school as consultant_info_work_exp_out_school,
      C.other_occupations as consultant_other_occupations,
      C.info_other_occupations as consultant_info_other_occupations,
      C.as_soon_as_possible as as_soon_as_possible,
      C.specify_date as consultant_specify_date,
      C.language_skills as consultant_language_skills,
      C.police_clearance_report as consultant_police_clearance_report,
      C.police_report as consultant_police_report,
      C.Driving_license as consultant_Driving_license,
      C.terms_and_condition as consultant_terms_and_condition,
      C.is_active as consultant_is_active,
      C.is_approved as consultant_is_approved,
      C.notification_id as consultant_notification_id,
      C.profile_img as consultant_profile_img,
   
      A.id as v_id 
      from dh_vacancy_new A join dh_customer B on A.created_by=B.unique_id join dh_substitute_consultant C on A.assigned_to_external=C.id where A.is_active=1 AND A.vacancy_is_approved=1`,
      [data.cons_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  CreateChat: (data, callback) => {
    pool.query(
      "select * from dh_chat_profile where unique_id=? AND cons_id=? AND vid=? AND is_active=1",
      [data.unique_id, data.cons_id,data.vid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          if(result.length!=0){
            console.log(result);
            return callback(null,{"message":"Chat Already exist",chat_id:result[0].id});
          }

          pool.query(
            "insert into dh_chat_profile (unique_id,cons_id,cons_device_id,title,vid,vdate) values(?,?,?,?,?,?)",
            [data.unique_id, data.cons_id, data.consdeviceId,data.title,data.vid,data.vdate],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                if (result.length != 0) {
                  return callback(null, {"message":"Chat Created",
                  chat_id:result.insertId
                });
                }



              }
            }
          );

        }
      }
    );


  },

  GetChatProfileById:(data, callback)=>{
    pool.query(
      "select C.*,A.ins_id,A.first_name as customer_fname, A.last_name as customer_lname ,A.profile_img,B.first_name as consultant_fname,B.last_name as consultant_lname,I.institute_name from dh_chat_profile C join dh_customer A on C.unique_id = A.unique_id join dh_substitute_consultant B on C.cons_id=B.id join dh_institutes I on A.ins_id = I.id where C.id=? AND C.is_active=1",
      [data.chat_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetChatprofile: (data, callback) => {
    if (data.type == 1) {
      pool.query(
        "select D.*,A.ins_id,A.first_name as customer_fname, A.last_name as customer_lname ,B.profile_img,B.first_name as consultant_fname,B.last_name as consultant_lname,I.institute_name from dh_chat_profile D join dh_customer A on D.unique_id = A.unique_id join dh_substitute_consultant B on D.cons_id=B.id join dh_institutes I on A.ins_id = I.id where D.unique_id=?  AND D.is_active=1",
        [data.id,],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    } else {
      pool.query(
        "select C.*,A.ins_id,A.first_name as customer_fname, A.last_name as customer_lname ,A.profile_img,B.first_name as consultant_fname,B.last_name as consultant_lname,I.institute_name from dh_chat_profile C join dh_customer A on C.unique_id = A.unique_id join dh_substitute_consultant B on C.cons_id=B.id join dh_institutes I on A.ins_id = I.id where C.cons_id=?  AND C.is_active=1",
        [data.id,],
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

  MyProfile: (data, callback) => {
    if (data.type == 1) {
      pool.query(
        "select * from dh_customer where id=?",
        [data.id],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    } else if (data.type == 2) {
      pool.query(
        "select * from dh_substitute_consultant where id=?",
        [data.id],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    } else if (data.type == 3) {
      console.log("1")
      pool.query(
        "select * from dh_institutes where id=?",
        [data.id],
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
  ADDTICKBOX: (data, callback) => {
    pool.query(
      "insert into dh_description_tickbox_master(value) values (?)",
      [data.value],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  ADDPAIDSTATUS: (data, callback) => {
    pool.query(
      "update dh_vacancy_new set is_paid=? where id=?",
      [data.is_paid,data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  ADDTICKBOX: (data, callback) => {
    pool.query(
      "insert into dh_description_tickbox_master(value) values (?)",
      [data.value],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetAllCustomer: (data, callback) => {
    pool.query(
      "select * from dh_customer where is_active=1",
      [data.value],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetAllConsultant: (data, callback) => {
    pool.query(
      "select * from dh_substitute_consultant where is_active=1",
      [data.value],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },



  ExpressPassCancel: (data, callback) => {
    pool.query("Update dh_express_pass_users join dh_express_pass ON dh_express_pass_users.pass_id= dh_express_pass.id set dh_express_pass_users.is_active=0,dh_express_pass.filled_count=dh_express_pass.filled_count-1 where  dh_express_pass_users.id=?",
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

  UpdatePassword: (data, callback) => {
console.log(data.type);
if(data.type=="customer"){
  pool.query("Update dh_customer  set password=? where email_id=?",
  [data.password,data.email_id],
  (error, result, fields) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, result);
    }
  }
);
}else{
  console.log("passss");
  pool.query("Update dh_substitute_consultant  set password=? where email_id=?",
  [data.password,data.email_id],
  (error, result, fields) => {
    if (error) {
      return callback(error);
    } else {
      console.log(result);
      return callback(null, result);
    }
  }
);
}

  },

  ForgotPasswordEmailCheck: (data, callback) => {
    pool.query("select * from dh_customer where email_id=? AND is_active=1",
      [data.email_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          if(result.length==0){
            pool.query("select * from dh_substitute_consultant where email_id=? AND is_active=1",
            [data.email_id],
            (error, result2, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, {result:result2,type:"consultant"});
              }
            }
          );
          }else{
            return callback(null, {result:result,type:"customer"});
          }
        }
      }
    );
  },
};