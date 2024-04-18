const pool = require("../../../config/connection");

module.exports = {



  ///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>Cornjob<><><><><><>>><><<><><><<<><><<<<><><<<><><><><><><>><>

  getvacancydata: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_active=1 AND is_draft=0 AND publish_to_id=2 AND vacancy_status=0 AND to_all_30=1",
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

  getUnfilledvacancydata: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_active=1 AND is_draft=0 AND vacancy_status=0",
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

  getfilledvacancydata: (callback) => {
    pool.query(
      "select A.*,B.notification_id from dh_vacancy_new A join dh_substitute_consultant B on A.assigned_to_external=B.id where A.is_active=1 AND A.is_draft=0  AND A.vacancy_status=1",
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

  getUnfilledpooldata: (callback) => {
    pool.query(
      "SELECT * FROM dh_express_pass where is_active=1",
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

  getfilledExpressPass: (callback) => {
    pool.query(
      "SELECT A.*,B.notification_id FROM dh_express_pass_users A join dh_substitute_consultant B on A.cons_id=B.id where A.is_active=1",
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

  updatevacancy: (data, callback) => {

    pool.query(
      `update dh_vacancy_new set publish_to_id=1,publish_to="Publish to all consultants (299kr/hr + VAT)" where id IN (?)`,
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },


  getvacancydata20: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_active=1 AND is_draft=0 AND publish_to_id=3 AND vacancy_status=0 AND to_all_20=1",
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

  updatevacancy20: (data, callback) => {

    pool.query(
      `update dh_vacancy_new set publish_to_id=1,publish_to="Publish to all consultants (299kr/hr + VAT)",assigned_to_external=0 where id IN (?)`,
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  not_approved: (callback) => {
    pool.query(
      "select * from dh_vacancy_new where is_active=1 AND is_draft=0 AND vacancy_status=2 AND vacancy_is_approved=0",
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

  MakeApprove: (data,callback) => {
    pool.query(
      "Update dh_vacancy_new set vacancy_is_approved=1 where id IN(?)",
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },


  GetCustomer: (data,callback) => {
    pool.query(
      "select * from dh_customer where unique_id IN(?) AND is_active=1",
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetALLConsultant: (callback) => {
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

  getvacancynotfilled: (callback) => {
    pool.query(
    "select A.*,B.notification_id,B.email_id from dh_vacancy_new A join dh_customer B on A.created_by=B.unique_id where A.is_active=1 AND A.is_draft=0 AND A.assigned_to_internal=0 AND A.assigned_to_external=0",
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

  getVacancyfilled: (callback) => {
    pool.query(
      "select A.*,B.notification_id from dh_vacancy_new A join dh_substitute_consultant B on A.assigned_to_external=B.id where A.is_active=1 AND A.is_draft=0 AND A.vacancy_status=1 AND A.is_canceled=0",
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

  updatevacancyisExpried: (data, callback) => {

    pool.query(
      `update dh_vacancy_new set is_active=0 ,is_expired=1 where id IN (?)`,
      [data],
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
