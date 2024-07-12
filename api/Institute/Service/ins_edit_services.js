const pool = require("../../../config/connection");

module.exports = {
  UpdateAbsenceStatus: (data, callback) => {
    pool.query(
      "Update dh_absence_management set is_approved=1 where id=?",
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

  UpdateAbsenceStatus2: (data, callback) => {
    pool.query(
      "Update dh_absence_management set is_approved=1,approved_by=?,approved_by_id=?,approved_or_denied_on=? where id=?",
      [
        data.approved_by,
        data.approved_by_id,
        data.approved_or_denied_on,
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
  },

  EditInstitute: (data, callback) => {
    pool.query(
      "update dh_institutes set institute_name=?,institute_id=?,address=?,locality=?,postcode=?,institute_type=?,institute_type_id=?,institute_domin=?,email_id=?,contact_number=? where id=?",
      [
        data.institute_name,
        data.institute_id,
        data.address,
        data.locality,
        data.postcode,
        data.institute_type,
        data.institute_type_id,
        data.institute_domin,
        data.email_id,
        data.contact_number,
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
  },
};
