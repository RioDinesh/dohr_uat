const pool = require("../../../config/connection");

module.exports = {
    DeleteVacancy(data,callback){
        pool.query(
            "Update dh_vacancy_new set is_active=0 where id=?",
            [data.id],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                console.log(result);
                return callback(null, result);
              }
            }
          );
    },
    DeleteConsultant(data,callback){
        pool.query(
            "Update dh_substitute_consultant set is_active=0 where id=?",
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
    DeleteInactiveConsultant(data,callback){
      pool.query(
          "Update dh_substitute_consultant set inactive_delete=0 where id=?",
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
    DeleteDenyRequestList(data,callback){
        pool.query(
            "Update deny_request_list set is_active=0 where id=?",
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

    DeleteAbsenceRequest(data,callback){
        pool.query(
            "Update dh_absence_management set is_active=0 where id=?",
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
    DeleteCustomer(data,callback){
        pool.query(
            "Update dh_customer set is_active=0 where id=?",
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
    DeleteDescriptionMaster(data,callback){
        pool.query(
            "Update dh_description_tickbox_master set is_active=0 where id=?",
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

    DeleteExpressPass(data,callback){
        pool.query(
            "Update dh_express_pass set is_active=0 where id=?",
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
    DeleteExpressPassUsers(data,callback){
        pool.query(
            "Update dh_express_pass_users set is_active=0 where id=?",
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
    
    DeleteFaqMaster(data,callback){
        pool.query(
            "Update dh_faq set is_active=0 where id=?",
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
    DeleteFaqMasterList(data,callback){
        pool.query(
            "Update dh_faq_list set is_active=0 where id=?",
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
    DeleteFeedBack(data,callback){
        pool.query(
            "Update dh_feedback set is_active=0 where id=?",
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
    DeleteInstitutes(data,callback){
        pool.query(
            "Update dh_institutes set is_active=0 where id=?",
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
    DeleteInstituteReqInfo(data,callback){
        pool.query(
            "Update dh_intitutes_requirement_info set is_active=0 where id=?",
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
    DeleteLeaveMaster(data,callback){
        pool.query(
            "Update dh_leave_master set is_active=0 where id=?",
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
    DeleteLegalMaster(data,callback){
        pool.query(
            "Update dh_legal set is_active=0 where id=?",
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
    
    DeleteLegalDescription(data,callback){
        pool.query(
            "Update dh_legal_description set is_active=0 where id=?",
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

    DeleteMySchedule(data,callback){
        pool.query(
            "Update dh_my_schedule set is_active=0 where id=?",
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

    DeleteOrgTypeMaster(data,callback){
        pool.query(
            "Update dh_organization_type set is_active=0 where id=?",
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
    DeletePostionMaster(data,callback){
        pool.query(
            "Update dh_position set is_active=0 where id=?",
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
    DeletePublishToMaster(data,callback){
        pool.query(
            "Update dh_publish_to_master set is_active=0 where id=?",
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

    DeleteChatProfile(data,callback){
      pool.query(
          "Update dh_chat_profile set is_active=0 where id=?",
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
    DeleteTitleMaster(data,callback){
        pool.query(
            "Update dh_title set is_active=0 where id=?",
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

    DeleteMYConsultant(data,callback){
      pool.query(
          "Update dh_my_consultants set is_active=0 where id=?",
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


    DeleteContactUs(data,callback){
      pool.query(
          "Update dh_dohr_contactUs set is_active=0 where id=?",
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

  Deletedh_feedback_for_dohr(data,callback){
    pool.query(
        "Update dh_feedback_for_dohr set is_active=0 where id=?",
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

Delete_open_application(data,callback){
  pool.query(
      "Update dh_open_application set is_active=0 where id=?",
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

  Delete_ad_Advertisment(data,callback){
    pool.query(
        "Update dh_admin_advertisment set is_active=0 where id=?",
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

Delete_ad_Applications(data,callback){
  pool.query(
      "Update dh_vacancy_advertisement_form set is_active=0 where id=?",
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

Delete_subEmail(data,callback){
  pool.query(
      "Update dh_subscribe_email set is_active=0 where id=?",
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