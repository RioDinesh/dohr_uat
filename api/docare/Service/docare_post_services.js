const pool = require("../../../config/connection");

module.exports = {
  AddTestimonials: (data, callback) => {
    pool.query(
      "insert into docare_testimonials (name,role,description,pro_pic,location) values(?,?,?,?,?)",
      [data.name, data.role, data.description,data.profile_pic,data.location],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  AddStayConnected: (data, callback) => {
    pool.query(
      "insert into docare_stay_connected (email_id) values(?)",
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

  AddPricePlans: (data, callback) => {
    pool.query(
      "insert into docare_price_plans (plan_type,plan_price,name,visits,time_period,scheduling,comment4) values(?,?,?,?,?,?,?)",
      [data.plan_type, data.plan_price, data.name, data.visits, data.time_period,data.scheduling,data.comment4],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  AddContactus: (data, callback) => {
    pool.query(
      "insert into docare_contact_us (first_name,last_name,phone,email_id,city_name,enquiry,describe_in_detail,docare_news_updates,privacy_policy) values(?,?,?,?,?,?,?,?,?)",
      [data.first_name, data.last_name, data.phone, data.email_id, data.city_name, data.enquiry, data.describe_in_detail, data.docare_news_updates, data.privacy_policy],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  AddTeamMember: (data, callback) => {
    pool.query(
      `INSERT INTO docare_team_member
(name,role,description,speciality,profile_pic)VALUES
(?,?,?,?,?);

      `,
      [data.name, data.role, data.description, data.speciality, data.profile_pic],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },
  AddWorkWithUs: (data, callback) => {
    pool.query(
      `INSERT INTO docare_work_with_us(
        first_name,
last_name,
address,
area_name,
postal_code,
city,
contact_number,
email,
dob,
i_have_a_swedish_bank_account,
my_preferred_work_location,
tell_us_what_you_are_currently_doing,
why_work_for_DoCare,
interests_and_hobbies,
prefer_to_work_with,
experience_with_children,
title_of_role_children,
duration_of_time_children,
key_responsibilities_children,
experience_with_elderly,
title_of_role_elderly,
duration_of_time_elderly,
key_responsibilities_elderly,
studies_or_work_experience_in_healthcare,
healthcare_name,
other_work_experience,
title_of_role_other,
duration_of_time_other,
key_responsibilities_other,
education_level,
institution_name,
education_from,
education_to,
can_start_working,
working_date,
available_to_work,
hours_per_week,
work_for_at_least_6_months,
lang_swedish_rate,
lang_english_rate,
other_language_name,
other_language_rate,
police_clearance_certificate,
agree_to_credit_and_background_check,
right_to_work_sweden,
valid_driver_licence,
allergic_to_animals,
allergy_details,
caregiving_duties,
privacy_policy_agreement,
children_work_exp_details,
other_work_exp_details,
elderly_people_work_exp_details,
other_language_details,
preferred_work_with,
how_do_you_hear_about_us,
proof_of_your_studies,
type_of_study,
per_state_hours_week,
i_am_self_employed_freelancer,
i_am_retired_pensioner,
i_have_another_primary_occupation,
name_of_the_institution
         
      ) VALUES (
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

);`,
[
data.first_name,
data.last_name,
data.address,
data.area_name,
data.postal_code,
data.city,
data.contact_number,
data.email,
data.dob,
data.i_have_a_swedish_bank_account,
data.my_preferred_work_location,
data.tell_us_what_you_are_currently_doing,
data.why_work_for_DoCare,
data.interests_and_hobbies,
data.prefer_to_work_with,
data.experience_with_children,
data.title_of_role_children,
data.duration_of_time_children,
data.key_responsibilities_children,
data.experience_with_elderly,
data.title_of_role_elderly,
data.duration_of_time_elderly,
data.key_responsibilities_elderly,
data.studies_or_work_experience_in_healthcare,
data.healthcare_name,
data.other_work_experience,
data.title_of_role_other,
data.duration_of_time_other,
data.key_responsibilities_other,
data.education_level,
data.institution_name,
data.education_from,
data.education_to,
data.can_start_working,
data.working_date,
data.available_to_work,
data.hours_per_week,
data.work_for_at_least_6_months,
data.lang_swedish_rate,
data.lang_english_rate,
data.other_language_name,
data.other_language_rate,
data.i_have__police_clearance_certificate,
data.i_agree_to_credit_and_background_check,
data.right_to_work_Sweden,
data.valid_driver_licence,
data.allergic_to_animals,
data.allergy_details,
data.caregiving_duties,
data.privacy_policy_agreement,
data.children_work_exp_details,
data.other_work_exp_details,
data.elderly_people_work_exp_details,
data.other_language_details,
data.preferred_work_with,
data.how_do_you_hear_about_us,
data.proof_of_your_studies,
data.type_of_study,
data.per_state_hours_week,
data.i_am_self_employed_freelancer,
data.i_am_retired_pensioner,
data.i_have_another_primary_occupation,
data.name_of_the_institution
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