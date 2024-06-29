const pool = require("../../../config/connection");

module.exports = {
  GetInstitue: (callback) => {
    pool.query(
      "select * from dh_institutes where is_active=1",
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

  GetInstitueRequirement: (callback) => {
    pool.query(
      "select * from dh_intitutes_requirement_info",
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

  GetCompletedVacancy: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 AND vacancy_status=2 order by ",
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

  GetPublishedVacancy: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 AND vacancy_status=0",
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

  GetAllVacancy: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 ",
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

  GetAllVacancyCustomer: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 And publish_to_id=2 And ins_id=?",
      [data.ins_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetCreatedByVacancyCustomer: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 And created_by=?",
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
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 And publish_to_id=3 ",
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

  GetVacancyDates: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_draft=0 AND is_active=1 AND vacancy_status=0",
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
  CheckUserPass: (data, callback) => {
    pool.query(
      "SELECT * FROM dh_express_pass_users where cons_id=? AND is_active=1",
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

  CheckAppoinment: (data, callback) => {
    pool.query(
      "SELECT * FROM dh_vacancy_new where  assigned_to_external=? AND vacancy_status=1 AND is_active=1",
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

  Get_Consultant: (data, callback) => {
    pool.query(
      "SELECT * FROM dh_substitute_consultant where  id=? AND is_active=1",
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

  GetVacancyDatesCustomer: (data, callback) => {
    pool.query(
      "SELECT * FROM dh_vacancy_new where created_by=? AND is_draft=0 AND is_active=1",
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
