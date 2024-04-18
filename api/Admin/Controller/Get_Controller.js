const {
  GetConsultantApproveList,
  GetAllConsultant,
  GetExpressPass,
  GetTickBox,
  GetTitle,
  GetDescription,
  GETFAQ,
  FAQLIST,
  GetFeedBACKForDOHR,
  GetConsultantDenyList,
  GetSubEmail
} = require("../Service/admin_get_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  get_Approve_list: (req, res) => {
    GetConsultantApproveList((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      
      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },


  get_Deny_list: (req, res) => {
    GetConsultantDenyList((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

          return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  get_consultant_list: (req, res) => {
    GetAllConsultant((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      for (i = 0; i < results.length; i++) {
        results[i].info_work_exp_in_school = JSON.parse(results[i].info_work_exp_in_school);
        results[i].info_work_exp_out_school = JSON.parse(results[i].info_work_exp_out_school);
        results[i].info_other_occupations = JSON.parse(results[i].info_other_occupations);
        results[i].language_skills = JSON.parse(results[i].language_skills);
      }

      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  get_feedback_for_dohr: (req, res) => {
    GetFeedBACKForDOHR((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }


      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  get_all_sub_email: (req, res) => {
    GetSubEmail((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }


      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  get_express_pass: (req, res) => {
    GetExpressPass((err, results) => {
      var Array = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      results.forEach((data) => {

        Array.push({
          pass_id: data.id,
          date: data.date,
          available_count: data.count - data.filled_count,
          filled_count: data.filled_count,
          count: data.count,
        });
      });

      return res.status(200).json({
        success: true,
        message: Array,
      });
    });
  },

  get_Legal: (req, res) => {
    GetTitle((err, results) => {
      var Array = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetDescription((error,des)=>{
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: error.sqlMessage,
          });
        }

        results.forEach((X)=>{
          Array.push({
            id:X.id,
            title:X.title,
            description:[]
          });
        });

        Array.forEach((Y)=>{
          des.forEach((A)=>{
            if(Y.id==A.title_id){
             Y.description.push(A);
            }
          });
        });

        return res.status(200).json({
          success: true,
          message: Array,
        });

      });

      
    });
  },


  get_faq: (req, res) => {
    GETFAQ((err, results) => {
      var Array = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      FAQLIST((error,des)=>{
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: error.sqlMessage,
          });
        }

        results.forEach((X)=>{
          Array.push({
            id:X.id,
            faq_title:X.faq_title,
            faq:[]
          });
        });

        Array.forEach((Y)=>{
          des.forEach((A)=>{
            if(Y.id==A.faq_id){
             Y.faq.push(A);
            }
          });
        });

        return res.status(200).json({
          success: true,
          message: Array,
        });

      });

      
    });
  },

};