const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { EditInstitute } = require("../Service/ins_edit_services");
module.exports = {
  EditMyInstitute: (req, res) => {
    const data = req.body;

    if (
      (!data.institute_name,
      !data.institute_id,
      !data.address,
      !data.locality,
      !data.postcode,
      !data.institute_type,
      !data.institute_type_id,
      !data.institute_domin,
      !data.email_id,
      !data.contact_number,
      !data.id)
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    EditInstitute(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Updated",
      });
    });
  },
};
