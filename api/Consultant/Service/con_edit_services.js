const pool = require("../../../config/connection");

module.exports = {
  EditConsultantProfile: (data, callback) => {
    pool.query(
      `update dh_substitute_consultant set 
          first_name=?,
          last_name=?,
          phone_number=?,
          swedish_personal_number=?,
          swedish_phone_number=?,
          email_id=?,
          swedish_bank_account=?,
          iam_student=?,
          bank_name=?,
          clearing_number=?,
          bank_account_number=?,
          emergency_contact_firstname=?,
          emergency_contact_lastname=?,
          emergency_contact_number=?,
          address=?,
          area_name=?,
          postalcode=?,
          preferred_location_1=?,
          preferred_location_2=?,
          preferred_location_3=?,
          preferred_location_4=?,
          preferred_location_5=?,
          description=?,
          profile_img=?
           where id=?`,
      [
        data.first_name,
        data.last_name,
        data.phone_number,
        data.swedish_personal_number,
        data.swedish_phone_number,
        data.email_id,
        data.swedish_bank_account,
        data.iam_student,
        data.bank_name,
        data.clearing_number,
        data.bank_account_number,
        data.emergency_contact_firstname,
        data.emergency_contact_lastname,
        data.emergency_contact_number,
        data.address,
        data.area_name,
        data.postalcode,
        data.preferred_location_1,
        data.preferred_location_2,
        data.preferred_location_3,
        data.preferred_location_4,
        data.preferred_location_5,
        data.description,
        data.profile_img,
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

  EditOpenApplication: (data, callback) => {
    pool.query(
      `update dh_open_application set is_denied=?,is_approved=?
      where id=?`,
      [
        data.is_denied,
        data.is_approved,
        data.id
        
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

  EditAdApplication: (data, callback) => {
    pool.query(
      `update dh_vacancy_advertisement_form set is_denied=?,is_approved=?
      where id=?`,
      [
        data.is_denied,
        data.is_approved,
        data.id
        
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