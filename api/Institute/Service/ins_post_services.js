const pool = require("../../../config/connection");
const { GetVacancy } = require("../../Consultant/Service/con_post_services");

module.exports = {
  CreateAbsence: (data, callback) => {
    //pool.query("select * from dh_my_schedule where (date between ? and ?) AND unique_id=?",[date])

    pool.query(
      "insert into dh_absence_management(unique_id,first_name,last_name,leave_type_id,leave_type,additional_comment,Parental_leave_percentage,child_first_name,child_last_name,appro_due_date,with_pay,without_pay,reason,substitute_required,from_date,to_date,from_time,to_time,ins_id,others,parental_additional_comment,parental_birth_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.unique_id,
        data.first_name,
        data.last_name,
        data.leave_type_id,
        data.leave_type,
        data.additional_comment,
        data.Parental_leave_percentage,
        data.child_first_name,
        data.child_last_name,
        data.appro_due_date,
        data.with_pay,
        data.without_pay,
        data.reason,
        data.substitute_required,
        data.from_date,
        data.to_date,
        data.from_time,
        data.to_time,
        data.ins_id,
        data.others,
        data.comment,
        data.child_personal_number,
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

  GetAbsence: (data, callback) => {
    pool.query(
      "select * from dh_absence_management where id=?",
      [data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },

  Login: (data, callback) => {
    pool.query(
      "select  U.* from dh_customer U  where U.email_id=?",
      [data.email_id],
      (error1, customer, fields) => {
        if (error1) {
          return callback(error1);
        }
        console.log(customer.length);
        if (customer.length == 0) {
          pool.query(
            "select * from dh_institutes  where email_id=?",
            [data.email_id],
            (error2, institute, fields) => {
              if (error2) {
                console.log(error2);
                return callback(error2);
              }

              if (institute.length == 0) {
                pool.query(
                  "select * from  dh_substitute_consultant  where email_id=? AND is_approved=1",
                  [data.email_id],
                  (error3, con, fields) => {
                    if (error3) {
                      console.log(error3);
                      return callback(error3);
                    }
                    if (con.length == 0) {
                      return callback(null, con);
                    }
                    pool.query(
                      `UPDATE dh_substitute_consultant
                    SET notification_id = ? WHERE id=?`,
                      [data.deviceId, con[0].id]
                    );
                    console.log(con);

                    console.log("this");
                    return callback(null, {
                      type: "CONSULTANT",
                      data: con[0],
                      Role: "CONSULTANT",
                    });
                  }
                );
              } else {
                return callback(null, {
                  type: "INSTITUTE",
                  data: institute[0],
                  Role: "INSTITUTE",
                });
              }
            }
          );
        } else {
          pool.query(
            `UPDATE dh_customer
          SET notification_id = ? WHERE id=?`,
            [data.deviceId, customer[0].id]
          );

          return callback(null, {
            type: "CUSTOMER",
            data: customer[0],
            Role: customer[0].title,
          });
        }
      }
    );
  },
  CreateCustomer: (data, callback) => {
    pool.query(
      "insert into dh_customer(first_name,last_name,title,title_id,company_name,organization_no,organization_type,organization_type_id,email_id,telephone_number,address,postal_code,area_name,invoice_address,invoice_postal_code,invoice_area_name,invoice_email_id,password,unique_id,ins_id,invoice_reference,Routine_instructions_for_the_substitutedh_customer,from_web,job_title,Location) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.title,
        data.title_id,
        data.company_name,
        data.organization_no,
        data.organization_type,
        data.organization_type_id,
        data.email_id,
        data.telephone_number,
        data.address,
        data.postal_code,
        data.area_name,
        data.invoice_address,
        data.invoice_postal_code,
        data.invoice_area_name,
        data.invoice_email_id,
        data.password,
        data.unique_id,
        data.ins_id,
        data.invoice_reference,
        data.instructions,
        true,
        data.job_title,
        data.Location,
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

  CheckUnique_ID: (data, callback) => {
    pool.query(
      "select unique_id from dh_customer where unique_id=?",
      [unique_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  CreateCustomerAPI: (data, callback) => {
    pool.query(
      "insert into dh_customer(first_name,last_name,title,title_id,company_name,organization_no,organization_type,organization_type_id,email_id,telephone_number,address,postal_code,area_name,invoice_address,invoice_postal_code,invoice_area_name,invoice_email_id,password,unique_id,ins_id,invoice_reference) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.title,
        data.title_id,
        data.company_name,
        data.organization_no,
        data.organization_type,
        data.organization_type_id,
        data.email_id,
        data.telephone_number,
        data.address,
        data.postal_code,
        data.area_name,
        data.invoice_address,
        data.invoice_postal_code,
        data.invoice_area_name,
        data.invoice_email_id,
        data.password,
        data.unique_id,
        data.ins_id,
        data.invoice_reference,
      ],
      (error, result1, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result1);
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
        } else {
          return callback(null, result);
        }
      }
    );
  },

  ADDMyCons: (data, callback) => {
    // no change in table only sawping the customer unique_id to ins_id so ins_id reffered as unique_id
    pool.query(
      "select * from dh_my_consultants where ins_id=? AND cons_id=? AND is_active=1",
      [data.unique_id, data.cons_id],
      (error, result1, fields) => {
        if (error) {
          return callback(error);
        } else {
          if (result1.length != 0) {
            return callback(null, {
              name: "The Consultant Already Added",
              stscode: 200,
            });
          }
          pool.query(
            "insert into dh_my_consultants(ins_id,cons_id) values(?,?)",
            [data.unique_id, data.cons_id],
            (error, result, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, {
                  name: "Consultant added  successfully",
                  stscode: 200,
                });
              }
            }
          );
        }
      }
    );
  },

  DenyAbsence: (data, callback) => {
    pool.query(
      "update dh_absence_management set is_denied=1 ,deny_reason=?,who_denied=? where id=?",
      [data.reason, data.who_denied, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  MakeCustomerVerfied: (data, callback) => {
    pool.query(
      "update dh_customer set is_verfied=1 where id=?",
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

  GetMyCons: (data, callback) => {
    pool.query(
      "select M.*, C.*,C.id as c_id from dh_my_consultants M join dh_substitute_consultant C on M.cons_id=C.id where M.ins_id=?",
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
  CreateUncoveredVacancyInternal: (data, callback) => {
    pool.query(
      `insert into dh_vacancy_new(
            position,  
            position_id, 
            v_date,  
            day,
            from_time, 
            to_time, 
            break_time,  
            total_whrs, 
            ins_id,
            uncovered_id,
            other_info,
            assigned_to_internal, 
            absence_id, 
            vacancy_status, 
            publish_to_internal, 
            publish_to_external,
            is_draft,
            assigned_from,
            created_by,
            lesson_plan_pdf,
            absence_stafName,
            my_consultant,
            location
            ) values ?`,
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          var ids = [];

          data.forEach((id) => {
            console.log(id);
            ids.push(id[9]);
          });
          console.log(ids);
          pool.query(
            "update dh_uncovered_management set is_covered=true where id In(?)",
            [ids],
            (error, result2, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result2);
              }
            }
          );
        }
      }
    );
  },

  CreateUncoveredVacancyExternal: (data, callback) => {
    console.log(data);

    pool.query(
      `insert into dh_vacancy_new(
            position,  
            position_id, 
            v_date,  
            day,
            from_time, 
            to_time, 
            break_time,  
            total_whrs, 
            ins_id,
            uncovered_id,
            other_info,
            assigned_to_internal, 
            assigned_to_external,
            absence_id, 
            vacancy_status, 
            publish_to_internal, 
            publish_to_external,
            is_draft,
            location,
            discription,
            assigned_from,
            created_by,
            publish_to,
            publish_to_id,
            routine_information,
            lesson_plan_pdf,
            absence_stafName,
            my_consultant
            ) values ?`,
      [data.a],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          var ids = [];
          if (data.mergevacancy == true) {
            ids = data.ids;
          } else {
            data.b.externalVacancy.forEach((id) => {
              ids.push(id.uncovered_id);
            });
          }

          pool.query(
            "update dh_uncovered_management set is_covered=true where id In(?)",
            [ids],
            (error, result2, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result2);
              }
            }
          );
        }
      }
    );
  },

  CreateUncoveredVacancy: (data, callback) => {
    console.log(data);

    pool.query(
      `insert into dh_vacancy_new(
            position,  
            position_id , 
            v_date,  
            day,
            from_time , 
            to_time , 
            break_time,  
            total_whrs , 
            ins_id ,
            uncovered_id ,
            other_info  ,
            assigned_to_internal , 
            assigned_to_external , 
            absence_id , 
            vacancy_status , 
            report_start_time , 
            report_end_time  ,
            report_break_time , 
            report_total_whours,  
            report_reason  ,
            publish_to_internal , 
            publish_to_external,
            lesson_plan_pdf,
            absence_stafName,
            my_consultant,
            location,
            is_draft
            ) values ?`,
      [data],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          var ids = [];

          data.forEach((id) => {
            ids.push(id[13]);
          });
          console.log(ids);
          pool.query(
            "update dh_uncovered_management set is_covered=true where absence_id In(?)",
            [ids.join()],
            (error, result2, fields) => {
              if (error) {
                return callback(error);
              } else {
                return callback(null, result2);
              }
            }
          );
        }
      }
    );
  },

  CreateVacancy: (data, callback) => {
    if (data.id == "0") {
      pool.query(
        `insert into dh_vacancy_new(
              position,  
              position_id , 
              v_date,  
              day,
              from_time, 
              to_time, 
              break_time,  
              total_whrs, 
              ins_id,
              uncovered_id,
              discription,
              assigned_to_internal, 
              assigned_to_external, 
              absence_id, 
              vacancy_status, 
              report_start_time, 
              report_end_time,
              report_break_time, 
              report_total_whours,  
              report_reason,
              publish_to_internal, 
              publish_to_external,
              is_draft,
              external_type,
              location,
              created_by,
              publish_to,
              publish_to_id,
              flexible_time,
              to_all_30,
              to_all_20,
              my_consultant,
              totalhrs,
              preparationTime,
              handoverTime,
              institute_type,
              sub_location
              ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          data.position,
          data.position_id,
          data.v_date,
          data.day,
          data.start_time,
          data.end_time,
          data.break_time,
          data.total_whrs,
          data.ins_id,
          data.uncovered_id,
          JSON.stringify(data.discription),
          data.assigned_to_internal,
          data.assigned_to_external,
          data.absence_id,
          data.vacancy_status,
          data.report_start_time,
          data.report_end_time,
          data.report_break_time,
          data.report_total_whours,
          data.report_reason,
          data.publish_to_internal,
          data.publish_to_external,
          data.is_draft,
          data.external_type,
          data.location,
          data.created_by,
          data.publish_to,
          data.publish_to_id,
          data.flexible_time,
          data.published_to_all_30min,
          data.choose_cons_20min,
          JSON.stringify(data.my_consultant),
          data.totalhrs,
          data.preparationTime,
          data.handoverTime,
          data.institute_type,
          data.sub_location,
        ],
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
        `update dh_vacancy_new 
              set position = ?,  
               position_id = ?, 
               v_date = ?,  
               day = ?,
               from_time = ?, 
               to_time = ?, 
               break_time = ?,  
               total_whrs = ?, 
               ins_id = ?,
               uncovered_id = ?,
               discription = ?,
               assigned_to_internal = ?, 
               assigned_to_external = ?, 
               absence_id = ?, 
               vacancy_status = ?, 
               report_start_time = ?, 
               report_end_time = ?,
               report_break_time = ?, 
               report_total_whours = ?,  
               report_reason = ?,
               publish_to_internal = ?, 
               publish_to_external = ?,
               is_draft = ?,
               external_type = ?,
               location = ?,
               created_by = ?,
               publish_to = ?,
               publish_to_id = ?,
               flexible_time = ?,
               to_all_30 = ?,
               to_all_20 = ?,
               my_consultant = ?,
               totalhrs = ?,
               preparationTime = ?,
               handoverTime = ?,
               sub_location=?
               where id=?`,
        [
          data.position,
          data.position_id,
          data.v_date,
          data.day,
          data.start_time,
          data.end_time,
          data.break_time,
          data.total_whrs,
          data.ins_id,
          data.uncovered_id,
          JSON.stringify(data.discription),
          data.assigned_to_internal,
          data.assigned_to_external,
          data.absence_id,
          data.vacancy_status,
          data.report_start_time,
          data.report_end_time,
          data.report_break_time,
          data.report_total_whours,
          data.report_reason,
          data.publish_to_internal,
          data.publish_to_external,
          data.is_draft,
          data.external_type,
          data.location,
          data.created_by,
          data.publish_to,
          data.publish_to_id,
          data.flexible_time,
          data.published_to_all_30min,
          data.choose_cons_20min,
          JSON.stringify(data.my_consultant),
          data.totalhrs,
          data.preparationTime,
          data.handoverTime,
          data.sub_location,
          data.id,
        ],
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

  GetAllConsultant: (callback) => {
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

  GetMyConsultantNotification: (data, callback) => {
    console.log("this is da : ", data.ins_id);
    pool.query(
      "SELECT A.notification_id,A.is_active,A.id,B.* FROM dh_my_consultants B join dh_substitute_consultant A on A.id=B.cons_id where B.is_active=1 AND A.is_active=1 AND B.ins_id=?",
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

  GetMyInstitue: (data, callback) => {
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
  },
  Create_Customer_Get_Ins: (data, callback) => {
    pool.query(
      "select * from dh_institutes where institute_domin=? AND is_active=1",
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

  GetScheduleAbsence: (data, callback) => {
    if (data.from_date == data.to_date) {
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const d = new Date(data.from_date);
      let day = weekday[d.getDay()];
      console.log(day);

      pool.query(
        "select * from dh_my_schedule where unique_id=? AND day=? AND is_active=1",
        [data.unique_id, day],
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
        "select * from dh_my_schedule where unique_id=? AND is_active=1",
        [data.unique_id],
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

  CreateUncoverSchedule: (data, callback) => {
    console.log(data);
    pool.query(
      "insert into dh_uncovered_management(v_date,schedule_id,absence_id,ins_id,cus_id) values ?",
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

  GetInstituteCoveredSchedule: (data, callback) => {
    pool.query(
      "select V.*,U.*,U.id as uncoveredId ,A.*,S.*,I.*,C.*,C.email_id as cus_email_id  from dh_uncovered_management U  join dh_absence_management A join dh_my_schedule S join dh_institutes I  join dh_customer C join dh_vacancy_new V on U.id=V.uncovered_id  where I.id=U.ins_id AND C.id=U.cus_id AND A.id=U.absence_id AND S.id=U.schedule_id AND U.is_covered=1 AND  U.ins_id=?",
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
  GetVacancyScheduleInternal: (data, callback) => {
    pool.query(
      "select V.*,C.first_name,C.last_name,C.id as covered_person_id,C.email_id  from dh_vacancy_new V join  dh_customer C where V.ins_id=? And V.is_active=1",
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
  GetVacancySchedulExternal: (data, callback) => {
    pool.query(
      "select V.*,C.first_name,C.last_name,C.id as covered_person_id,C.email_id  from dh_vacancy_new V join  dh_substitute_consultant C on C.id=V.assigned_to_external where V.ins_id=? And V.is_active=1",
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

  GetDraftAndPublishedVacany: (data, callback) => {
    pool.query(
      "select V.*,I.ins_id,I.company_name as institute_name,I.organization_type as institute_type from dh_vacancy_new V join dh_customer I on V.created_by=I.unique_id where V.is_draft=? AND V.is_active=1 AND V.vacancy_status=0 AND V.created_by=?",
      [data.is_draft, data.unique_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetAllAbsence: (data, callback) => {
    pool.query(
      "select C.email_id,C.unique_id,A.* from dh_absence_management A join dh_customer C on A.unique_id=C.unique_id where A.ins_id=?  AND A.is_active=1",
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

  GetUncoveredSchedule: (data, callback) => {
    //AND U.v_date >=  CURDATE()
    pool.query(
      "select U.*,U.id as uncovered_id ,A.*,S.*,I.*,C.*,C.id as assigned_from,C.email_id as cus_email_id  from dh_uncovered_management U  join dh_absence_management A join dh_my_schedule S join dh_institutes I  join dh_customer C where I.id=U.ins_id AND C.id=U.cus_id AND A.id=U.absence_id AND S.id=U.schedule_id AND U.is_covered=0   AND U.ins_id=? AND U.is_active=1",
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

  GetAbsenceStaff: (data, callback) => {
    pool.query(
      "Select A.ins_id,A.unique_id,A.is_approved,A.to_date,A.from_date,A.from_time,A.to_time,A.leave_type,A.substitute_required,C.* from dh_absence_management A join dh_customer C on C.unique_id=A.unique_id where A.ins_id=? AND A.is_approved=1",
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

  GetAbsenceStaffCount: (data, callback) => {
    pool.query(
      "select * from dh_absence_management where ins_id=? AND is_approved=1 ",
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

  GetInternalTeacher: (data, callback) => {
    pool.query(
      "select * from dh_customer where ins_id=?",
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

  GetInternalTeacherVacancyData: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where assigned_to_internal=? AND vacancy_status=1 AND is_active=1",
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

  GetInternalTeacherScheduleData: (data, callback) => {
    pool.query(
      "select * from dh_my_schedule where cus_id=? AND is_active=1",
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

  GetInternalTeacherByAbscent: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where ins_id=?",
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

  GetStaffSchedule: (data, callback) => {
    pool.query(
      "select * from dh_my_schedule where unique_id=?",
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

  GetAbsentStaffByMonth: (data, callback) => {
    pool.query(
      "select * from dh_absence_management where from_date <=? AND to_date>=? AND ",
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

  GetMyConsultant: (data, callback) => {
    pool.query(
      "select  V.ins_id,V.assigned_to_external,V.vacancy_status,C.* from dh_vacancy_new V join dh_substitute_consultant C on C.id=V.assigned_to_external where V.ins_id=? AND V.vacancy_status=2",
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

  GetMyConsultant_API: (data, callback) => {
    pool.query(
      "select DISTINCT V.ins_id,V.cons_id,V.id as my_cons_id,C.* from dh_my_consultants V join dh_substitute_consultant C on C.id=V.cons_id where V.ins_id=? AND V.is_active=1",
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

  GetMyCustomer: (data, callback) => {
    pool.query(
      "select * from dh_customer where ins_id=? and is_active=1",
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

  GetMyScheduleIns: (data, callback) => {
    pool.query(
      "select * from dh_my_schedule where cus_id=?",
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

  GetFilledAndUnfilled: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where ins_id=? AND vacancy_status=? AND v_date=? AND is_active=1",
      [data.ins_id, data.status, data.date],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetCoveredAndUnCovered: (data, callback) => {
    pool.query(
      "select U.*,U.id as uncovered_id ,A.*,S.*,I.*,C.*,C.id as assigned_from,C.email_id as cus_email_id  from dh_uncovered_management U  join dh_absence_management A join dh_my_schedule S join dh_institutes I  join dh_customer C where A.is_active AND I.id=U.ins_id AND C.id=U.cus_id AND A.id=U.absence_id AND S.id=U.schedule_id AND U.is_covered=?  AND U.ins_id=?",
      [data.status, data.ins_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetDenyList: (data, callback) => {
    pool.query(
      "select * from deny_request_list where vid=?",
      [data.ins_id, data.status, data.date],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetMyHours: (data, callback) => {
    pool.query(
      `select * from dh_hour_balance where ins_id=? and is_active=1`,
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
  GetMyRequestHours: (callback) => {
    pool.query(
      `select * from dh_hour_balance_request where  is_active=1`,
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

  TopUpMYHoursAdmin: (data, callback) => {
    console.log("ttf", data.total_hours);
    pool.query(
      `insert into dh_hour_balance(
      total_hours,
      used_hours,
      remaining_hours,
      ins_id
      )values(?,?,?,?)`,
      [data.total_hours, data.used_hours, data.remaining_hours, data.ins_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  TopUpMYHoursAdminUpdate: (data, callback) => {
    pool.query(
      `update  dh_hour_balance set
      total_hours=?,
      used_hours=?,
      remaining_hours=?
      where ins_id=?`,
      [data.total_hours, data.used_hours, data.remaining_hours, data.ins_id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  UpdateRequestMyhourState: (data, callback) => {
    pool.query(
      `update  dh_hour_balance_request set
    is_processed=?
    where id=?`,
      [data.is_processed, data.id],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  TopUpMYHoursRequest: (data, callback) => {
    pool.query(
      `insert into dh_hour_balance_request(
      total_hours,
      used_hours,
      remaining_hours,
      requesting_hours,
      ins_id
      )values(?,?,?,?,?)`,
      [
        data.total_hours,
        data.used_hours,
        data.remaining_hours,
        data.requesting_hours,
        data.ins_id,
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
};
