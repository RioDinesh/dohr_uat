const pool = require("../../../config/connection");

module.exports = {
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
      [
        data.email_id,
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
  CreateSubstitute: (data, callback) => {

    pool.query(
      `insert into dh_substitute_consultant(
        first_name,	
        last_name,
        email_id,	
        phone_number,	
        address,	
        postalcode,	
        area_name,	
        city,	
        date_of_brith,	
        swedish_personal_number,	
        swedish_bank_account,	
        bank_account_number	,
        preferred_work_institution,	
        bank_name,
        description,
        self_employed,	
        iam_student,
        type_of_study,
        state_hours_weeks_student,
        name_of_institutition,	
        proof_of_studies,
        iam_retired_pensioner,	
        other_occupations,	
        info_other_occupations,	
        work_exp_in_school,	
        info_work_exp_in_school,	
        work_exp_out_school,	
        info_work_exp_out_school,	
        other_work_experience,
        info_other_work_experience,	
        as_soon_as_possible,	
        specify_date,	
        working_hours_or_weeks,	
        working_evening_or_weekends,	
        language_skills,	
        police_clearance_report,	
        Driving_license,	
        How_did_you_hear_about_us,	
        right_to_work_in_Sweden,	
        terms_and_condition,	
        marketing_purpose,	
        accurate_information,	
      	password,
        reg_iam_teacher_student,
        reg_i_have_swedish,
        reg_short_description
        ) values(
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
          )`,
      [
        data.first_name,
        data.last_name,
        data.email_id,
        data.phone_number,
        data.address,
        data.postalcode,
        data.area_name,
        data.city,
        data.date_of_brith,
        data.swedish_personal_number,
        data.swedish_bank_account,
        data.bank_account_number,
        JSON.stringify(data.preferred_work_institution),
        data.bank_name,
       data.description,
        data.self_employed,
        data.iam_student,
        data.type_of_study,
        data.state_hours_weeks_student,
        data.name_of_institutition,
        data.proof_of_studies,
        data.iam_retired_pensioner,
        data.other_occupations,
        data.info_other_occupations,
        data.work_exp_in_school,
        JSON.stringify(data.info_work_exp_in_school),
        data.work_exp_out_school,
        JSON.stringify(data.info_work_exp_out_school),
        data.other_work_experience,
        JSON.stringify(data.info_other_work_experience),
        data.as_soon_as_possible,
        data.specify_date,
        data.working_hours_or_weeks,
        data.working_evening_or_weekends,
        JSON.stringify(data.language_skills),
        data.police_clearance_report,
        data.Driving_license,
        data.How_did_you_hear_about_us,
        data.right_to_work_in_Sweden,
        data.terms_and_condition,
        data.marketing_purpose,
        data.accurate_information,
        data.password,
        data.reg_iam_teacher_student,
        data.reg_i_have_swedish,
        data.reg_short_description
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
  CreateOpenApplication: (data, callback) => {
    pool.query(`
insert into dh_open_application(
first_name,
last_name,
address,
email_id,
postalcode,
area_name,
phone_number,
preferred_location,
city,
date_of_birth,
linkedIn,
occup_sector,
occup_sector_id,
studyingteacher,
swedish_bank_account,
working_evening_or_weekends,
qualifiedteacherdate,
work_exp_in_school,
work_exp_out_school,
specificField,
language_skills,
subjectlist,
agegroup,
subjectlistno,
agegroupno,
subjectlistyes,
agegroupyes,
info_work_exp_in_school,
info_work_exp_out_school,
employment_history,
relevant_education,
qualifiedTeacher,
swedishLara,
instutionstudyteacher,
preferWorkIn,
occupation,
position,
work_start,
fileswedishlara,
howDoYouKnowUs,
Driving_license,
right_to_work_in_Sweden,
marketing_purpose,
accurate_information,
otheroccupationfield,
terms_and_conditions)
values
(
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?


)`,
      [
        data.first_name,
        data.last_name,
        data.address,
        data.email_id,
        data.postalcode,
        data.area_name,
        data.phone_number,
        data.preferred_location,
        data.city,
        data.date_of_birth,
        data.linkedIn,
        data.occup_sector,
        data.occup_sector_id,
        data.studyingteacher,
        data.swedish_bank_account,
        data.working_evening_or_weekends,
        data.qualifiedteacherdate,
        data.work_exp_in_school,
        data.work_exp_out_school,
        data.specificField,
        JSON.stringify(data.language_skills),
        JSON.stringify(data.subjectlist),
        JSON.stringify(data.agegroup),
        JSON.stringify(data.subjectlistno),
        JSON.stringify(data.agegroupno),
        JSON.stringify(data.subjectlistyes),
        JSON.stringify(data.agegroupyes),
        JSON.stringify(data.info_work_exp_in_school),
        JSON.stringify(data.info_work_exp_out_school),
        JSON.stringify(data.employment_history),
        JSON.stringify(data.relevant_education),
        data.qualifiedTeacher,
        data.swedishLara,
        data.instutionstudyteacher,
        JSON.stringify(data.preferWorkIn),
        data.occupation,
        data.position,
        data.work_start,
        data.fileswedishlara,
        data.howDoYouKnowUs,
        data.Driving_license,
        data.right_to_work_in_Sweden,
        data.marketing_purpose,
        data.accurate_information,
        data.otheroccupationfield,
        data.terms_and_conditions
      ], (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  CreateAdvertismentApplication: (data, callback) => {
    pool.query(
      `INSERT INTO dh_vacancy_advertisement_form
      (
      first_name,
      last_name,
      address,
      email_id,
      postalcode,
      area_name,
      phone_number,
      description,
      city,
      date_of_birth,
      linkedIn,
      occup_sector,
      occup_sector_id,
      studyingteacher,
      qualifiedteacherdate,
      work_exp_in_school,
      work_exp_out_school,
      specificField,
      language_skills,
      subjectlist,
      agegroup,
      subjectlistno,
      agegroupno,
      subjectlistyes,
      agegroupyes,
      specify_date,
      otheroccupationfield,
      info_work_exp_in_school,
      info_work_exp_out_school,
      employment_history,
      relevant_education,
      qualifiedTeacher,
      swedishLara,
      instutionstudyteacher,
      preferWorkIn,
      occupation,
      position,
      work_start,
      fileswedishlara,
      howDoYouKnowUs,
      Driving_license,
      right_to_work_in_Sweden,
      marketing_purpose,
      accurate_information,
      terms_and_conditions,
      advertisement_id
      )
      VALUES
      (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
      
      );
      `,
      [
        data.first_name,
        data.last_name,
        data.address,
        data.email_id,
        data.postalcode,
        data.area_name,
        data.phone_number,
        data.description,
        data.city,
        data.date_of_birth,
        data.linkedIn,
        data.occup_sector,
        data.occup_sector_id,
        data.studyingteacher,
        data.qualifiedteacherdate,
        data.work_exp_in_school,
        data.work_exp_out_school,
        data.specificField,
        JSON.stringify(data.language_skills),
        JSON.stringify(data.subjectlist),
        JSON.stringify(data.agegroup),
        JSON.stringify(data.subjectlistno),
        JSON.stringify(data.agegroupno),
        JSON.stringify(data.subjectlistyes),
        JSON.stringify(data.agegroupyes),
        data.specify_date,
        data.otheroccupationfield,
        JSON.stringify(data.info_work_exp_in_school),
        JSON.stringify(data.info_work_exp_out_school),
        JSON.stringify(data.employment_history),
        JSON.stringify(data.relevant_education),
        data.qualifiedTeacher,
        data.swedishLara,
        data.instutionstudyteacher,
        JSON.stringify(data.preferWorkIn),
        data.occupation,
        data.position,
        data.work_start,
        data.fileswedishlara,
        data.howDoYouKnowUs,
        data.Driving_license,
        data.right_to_work_in_Sweden,
        data.marketing_purpose,
        data.accurate_information,
        data.terms_and_conditions,
        data.advertisement_id
      ], (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  CreateTeaching: (data, callback) => {
    pool.query(
      "insert into dh_teaching_consultant(first_name,last_name,email_id,phone_number,swedish_personal_number,Nationality,country_of_residence,right_to_work_in_Sweden,proof_work_permit,preferred_work_institution,my_preferred_location,Swedish_lärarlegitimation,info_Swedish_lärarlegitimation,teaching_certificate,info_teaching_certificate,work_exp_in_school,info_work_exp_in_school,other_experience,info_other_experience,anytime,specify_date,language_skills,police_clearance_report,police_report,terms_and_condition) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.email_id,
        data.phone_number,
        data.swedish_personal_number,
        data.Nationality,
        data.country_of_residence,
        data.right_to_work_in_Sweden,
        data.proof_work_permit,
        data.preferred_work_institution,
        data.my_preferred_location,
        data.Swedish_lararlegitimation,
        data.info_Swedish_lararlegitimation,
        data.teaching_certificate,
        data.info_teaching_certificate,
        data.work_exp_in_school,
        data.info_work_exp_in_school,
        data.other_experience,
        data.info_other_experience,
        data.anytime,
        data.specify_date,
        data.language_skills,
        data.police_clearance_report,
        data.police_report,
        data.terms_and_condition
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
  CreateNonTeaching: (data, callback) => {
    pool.query(
      "insert into dh_teaching_consultant(first_name,last_name,email_id,phone_number,swedish_personal_number,Nationality,country_of_residence,right_to_work_in_Sweden,proof_work_permit,relevant_education,relevant_work_experience,why_you_are_interested,anytime,specify_date,language_skills,police_clearance_report,police_report,terms_and_condition) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.first_name,
        data.last_name,
        data.email_id,
        data.phone_number,
        data.swedish_personal_number,
        data.Nationality,
        data.country_of_residence,
        data.right_to_work_in_Sweden,
        data.proof_work_permit,
        data.relevant_education,
        data.relevant_work_experience,
        data.why_you_are_interested,
        data.anytime,
        data.specify_date,
        data.language_skills,
        data.police_clearance_report,
        data.police_report,
        data.terms_and_condition,
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

  Get_Schedule_Count: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where assigned_to_external=? AND is_active=1",
      [
        data.cons_id,
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

  GetReservedPoolCount: (data, callback) => {
    pool.query(
      "select * from dh_express_pass_users where cons_id=? AND is_active=1",
      [
        data.cons_id,
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

  GetOverview: (data, callback) => {
    pool.query(
      "select * from dh_vacancy_new where assigned_to_external=? AND is_active=1 AND is_draft=0 AND vacancy_status=2 AND vacancy_is_approved=1",
      [
        data.cons_id,
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

  CancelVacancy: (data, callback) => {
    pool.query(
      "Update dh_vacancy_new set assigned_to_external=0,vacancy_status=0,cancelled_by_consultant=true where id=?",
      [
        data.vid,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {

          pool.query(
            `insert into dh_canceled_vacancy_info(
              consultant_id,
              vacancy_id,
              before_90min
                ) 
                Values (
                  ?,?,?
                )
                `,
            [
              data.cons_id,
              data.vid,
              data.before_90min
            ],
            (error2, result2, fields) => {
              if (error2) {
                return callback(error2);
              } else {



                return callback(null, result2);
              }
            }
          );

          ///  return callback(null, result);
        }
      }
    );
  },

  GetConsulatant: (data, callback) => {
    pool.query(
      "select DISTINCT * from dh_substitute_consultant where id=?",
      [
        data.id,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },

  GetConsulatant: (data, callback) => {
    pool.query(
      "select DISTINCT * from dh_substitute_consultant where id=?",
      [
        data.id,
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result[0]);
        }
      }
    );
  },
  GetCustomer: (callback) => {
    pool.query(
      "select * from dh_customer",
      [

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

  GetCustomer: (callback) => {
    pool.query(
      "select * from dh_customer",
      [

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
  GetOpenApplication: (callback) => {
    pool.query(
      "select * from dh_open_application where is_active=1",
      [

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

  GetadApplication: (data,callback) => {
    pool.query(
      "select * from dh_vacancy_advertisement_form where is_active=1 AND advertisement_id=?",
      [
        data.advertisement_id
      ],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null,result);
        }
      }
    );
  },
  GetVacancy: (data, callback) => {
    pool.query(
      "select DISTINCT  A.institute_name,A.institute_type,A.id as INS_MASTER_ID,C.address,C.postal_code,C.area_name,C.unique_id,B.*,B.id as vid from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.v_date=? AND B.is_active=1 AND B.is_draft=0 AND B.vacancy_status=0",
      [
        data.date,
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

  GetMyJobsVacancy: (data, callback) => {
    pool.query(
      "select DISTINCT  A.institute_name,A.institute_type,A.id as INS_MASTER_ID,C.address,C.postal_code,C.area_name,C.unique_id,B.*,B.id as vid from dh_vacancy_new B join dh_institutes A on B.ins_id=A.id join dh_customer C on B.created_by=C.unique_id where B.assigned_to_external=?  AND B.is_active=1 AND B.is_draft=0 AND B.vacancy_status=?",
      [
        data.id,
        data.status
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