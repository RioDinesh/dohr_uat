
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  ApproveMyVacancy, DenyMyVacancy, EditMyProfileCustomer, Approved_vacancy_req, getcons_by_id, Logout
} = require("../Service/cus_edit_services");
var fun = require("../../functions/Basic_methods");
const path = require('path');
const fs = require('fs');
module.exports = {
  my_vacancy_status_cus: (req, res) => {
    const data = req.body;
    //status ==> 1(assigned) status ==> 2(completed)
    if (!data.id || !data.status) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ApproveMyVacancy(data, (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Approved",


      });
    });
  },


  deny_my_vacancys_cus: (req, res) => {
    const data = req.body;
    //status ==> 1(assigned) status ==> 2(completed)
    if (!data.id || !data.uncovered_id || !data.reason || !data.cus_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    DenyMyVacancy(data, (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Approved",


      });
    });
  },


  Edit_Customer_Profile: (req, res) => {
    const data = req.body;
console.log('dataa');
    if (
      !data.id ||
      !data.first_name ||
      !data.last_name ||
      !data.telephone_number||
      !data.company_name||
      !data.organization_no||
      !data.organization_type||
      !data.organization_type_id||
      !data.email_id||
      !data.address||
      !data.postal_code||
      !data.area_name||
      !data.invoice_address||
      !data.invoice_postal_code||
      !data.invoice_area_name||
      !data.invoice_email_id||
      !data.invoice_reference
      

    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    if(data.image!=''){
      const currentDate = new Date();
      var formatfilename=currentDate.toISOString();
      var filename =formatfilename.replace(/[- : .]/g, '');
      var des_path =path.join(__dirname, `../../uploads/${filename}.png`);
      const imgdata = data.image;
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
      data.profile_img=filename+'.png';
    }

    EditMyProfileCustomer(data, (err, results) => {

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

Approve_Vacancy_request: (req, res) => {
    const data = req.body;

    if (
      !data.cons_id ||
      !data.approved_stime ||
      !data.approved_etime ||
      !data.total_approved_hrs||
      !data.feedback ||
      !data.reportBreakTime||
      !data.id

    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    Approved_vacancy_req(data, (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      // getcons_by_id(data, (error, result) => {
      //   console.log(result);
      //   fun.sendMail(result.email_id, "Dohr", "approved");
      // });


      return res.status(200).json({
        success: true,
        message: "Updated",


      });
    });
  },

logout: (req, res) => {
    const data = req.body;

    // if (
    //   !data.cons_id ||
    //   !data.cus_id ||
    //   !data.type 
    // ){
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }

    Logout(data, (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
   


      return res.status(200).json({
        success: true,
        message: "Logged Out",


      });
    });
  }
};