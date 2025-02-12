const pool = require("../../../config/connection");

module.exports = {
  GetMySchedule: (data, callback) => {
    pool.query(
      "select * from dh_my_schedule where cus_id=? and is_active=1",
      [data.unique_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  CreateSchedule: (data, callback) => {
    pool.query(
      "insert into dh_my_schedule(unique_id,cus_id,ins_id,day,start_time,end_time,year_group,classroom,subject) values ? ",
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

  UpadteSchedulePdf: (data, callback) => {
    pool.query(
      "update dh_my_schedule set schedule_pdf=? where id=?",
      [data.pdfname, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetMyAbsence: (data, callback) => {
    pool.query(
      "select * from dh_absence_management where unique_id=? and is_active=1",
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
  // newtablechange
  GetMyCovered: (data, callback) => {
    pool.query(
      "select * ,dh_vacancy_new.id as vid from dh_vacancy_new  join dh_customer on dh_vacancy_new.assigned_to_internal=dh_customer.id join dh_uncovered_management on dh_uncovered_management.id=dh_vacancy_new.uncovered_id join dh_my_schedule on dh_uncovered_management.schedule_id= dh_my_schedule.id  where dh_vacancy_new.assigned_from=? AND dh_vacancy_new.vacancy_status=2",
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
  // newtable change

  GetICovered: (data, callback) => {
    pool.query(
      "select  *,dh_vacancy_new.id as vid  from dh_vacancy_new join dh_customer on dh_vacancy_new.assigned_to_internal=dh_customer.id join dh_uncovered_management on dh_uncovered_management.id=dh_vacancy_new.uncovered_id join dh_my_schedule on dh_uncovered_management.schedule_id= dh_my_schedule.id  where dh_vacancy_new.assigned_to_internal=17 AND dh_vacancy_new.vacancy_status=2",
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
  GetCoveredCount: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where assigned_to_internal=? AND is_active=1 AND v_date=?",
      [data.cus_id, data.date],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  // newtable change
  GetMyVacancyCustomer: (data, callback) => {
    pool.query(
      "select B.*,C.*,D.*, A.*, A.id as vid from dh_vacancy_new A   join dh_customer B on A.assigned_from=B.id join dh_uncovered_management C on C.id=A.uncovered_id join dh_my_schedule D on C.schedule_id= D.id  where A.assigned_to_internal=? AND A.vacancy_status=? AND A.is_active=1;",
      [data.cus_id, data.status],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetVacancyStatus: (data, callback) => {
    console.log(data);
    if (data.status == "3") {
      pool.query(
        //select * from dh_vacancy_new join dh_institutes dh_institutes on dh_vacancy_new.ins_id = dh_institutes.id where dh_vacancy_new.ins_id=? AND dh_vacancy_new.v_date=? AND dh_vacancy_new.is_active=1
        "select A.id as INS_MASTER_ID,C.address,C.company_name as institute_name,C.organization_type as institute_type,C.postal_code,C.area_name,C.telephone_number,C.unique_id,B.* from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.created_by=? AND B.v_date=? AND B.is_active=1 AND B.is_draft=0",
        [data.unique_id, data.date],
        (error, result, fields) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, result);
          }
        }
      );
    } else if (data.status == "2" && data.show_all == true) {
      if (data.vacancy_is_approved == 2) {
        pool.query(
          "select A.id as INS_MASTER_ID,C.address,C.postal_code,C.company_name as institute_name,C.organization_type as institute_type,C.area_name,C.telephone_number,C.unique_id,B.* from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.created_by=? AND B.vacancy_status=? AND B.is_active=1 AND B.is_draft=0",
          [data.unique_id, data.status],
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
          "select A.id as INS_MASTER_ID,C.address,C.postal_code,C.company_name as institute_name,C.organization_type as institute_type,C.area_name,C.telephone_number,C.unique_id,B.* from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id  where B.created_by=? AND B.vacancy_status=?  AND B.is_active=1 AND vacancy_is_approved=? AND B.is_draft=0",
          [data.unique_id, data.status, data.vacancy_is_approved],
          (error, result, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, result);
            }
          }
        );
      }
    } else {
      pool.query(
        "select A.id as INS_MASTER_ID,C.address,C.company_name as institute_name,C.organization_type as institute_type,C.postal_code,C.area_name,C.telephone_number,C.unique_id,B.* from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.created_by=? AND B.vacancy_status=? AND B.v_date=? AND B.is_active=1 AND B.is_draft=0",
        [data.unique_id, data.status, data.date],
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

  WhoCompleted: (data, callback) => {
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

  WhoCompleted2: (data, callback) => {
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
  },

  GetConsultant: (callback) => {
    pool.query(
      "select * from dh_substitute_consultant",
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

  GetVacancyCount: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where created_by=? AND is_active=1",
      [data.unique_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  VacancyCancel: (data, callback) => {
    pool.query(
      "update dh_vacancy_new set is_canceled=1,cancellation_charges=?,assigned_to_internal=0 where id=?",
      [data.cancellation_charges, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetCons: (data, callback) => {
    pool.query(
      "select * from dh_substitute_consultant where id=? AND is_active=1",
      [data.externalid],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

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

  updatevacancy: (data, callback) => {
    pool.query(
      `update dh_vacancy_new set publish_to_id=1,publish_to="Publish to all consultants(150kr/per hour + VAT)" where id IN (?)`,
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
      `update dh_vacancy_new set publish_to_id=1,publish_to="Publish to all consultants(150kr/per hour + VAT)",assigned_to_external=0 where id IN (?)`,
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
      "select * from dh_vacancy_new where is_active=1 AND is_draft=0 AND vacancy_status=2 AND is_approved=0",
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
};
