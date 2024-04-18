const pool = require("../../../config/connection");

module.exports = {
  GetConsultantApproveList: (callback) => {
    pool.query("select * from dh_substitute_consultant where is_approved=0 AND is_active=1 AND is_denied=0", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetConsultantDenyList: (callback) => {
    pool.query("select * from dh_substitute_consultant where is_approved=0 AND is_active=1 AND is_denied=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetAllConsultant: (callback) => {
    pool.query("select * from dh_substitute_consultant where is_approved=1 where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetFeedBACKForDOHR: (callback) => {
    pool.query("select * from dh_feedback_for_dohr where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetSubEmail: (callback) => {
    pool.query("select * from dh_subscribe_email where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetExpressPass: (callback) => {
    pool.query("select * from dh_express_pass where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetTitle: (callback) => {
    pool.query("select * from dh_legal where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetDescription: (callback) => {
    pool.query("select * from dh_legal_description where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GETFAQ: (callback) => {
    pool.query("select * from dh_faq where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  FAQLIST: (callback) => {
    pool.query("select * from dh_faq_list where is_active=1", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },


  GetConsultantVacancy: (data,callback) => {
    pool.query("select * from dh_vacancy_new where assigned_to_external=? AND is_active=1", [data.cons_id], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },


};