const {
  GetTitle,
  GetLevelMaster,
  OrganizationType,
  GetPostCodes,
  PublishToType,
  GetPostion,
  GetSubPass,
  GetLink
} = require("../Service/common_get_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  get_title: (req, res) => {
    GetTitle((err, results) => {
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

  get_level_master: (req, res) => {
    GetLevelMaster((err, results) => {
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

  get_organization_type: (req, res) => {
    OrganizationType((err, results) => {
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

  get_postion: (req, res) => {
    GetPostion((err, results) => {
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
  get_link: (req, res) => {
    GetLink((err, results) => {
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
  get_publish_type: (req, res) => {
    PublishToType((err, results) => {
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

  get_postcode_info: (req, res) => {
    GetPostCodes((err, results) => {
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



  get_sub_pass: (req, res) => {
    GetSubPass((err, results) => {
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

  Fcm_Message: (req, res) => {
    var message = {
      "notification": {
        "body": "text",
        "title": "text"
      },
      "to": "dRmMowPJS56MDp-Zg-p0Bt:APA91bE4RG20RvnvQgamYnlqFkWOIzfOoEf_7YKrzf18F8HgVaRdWs7WI0gGXJ99hvTZHFCyZD7Z-O155WD-SjQ4KnuCjFh_TlEs8_hnXmeJG28rgwve2Pm3DfSxwqLoVCBNnMob3TkW"
    };
    var fun = require("../../functions/Basic_methods");
    var response = fun.FCM_MESSAGE(1, message);
    return res.status(200).json({
      success: true,
      message: response,
    });
  },
};