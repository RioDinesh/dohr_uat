
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { 
    DeleteVacancy,
    DeleteConsultant,
    DeleteDenyRequestList, 
    DeleteAbsenceRequest, 
    DeleteCustomer, 
    DeleteDescriptionMaster, 
    DeleteExpressPass, 
    DeleteExpressPassUsers, 
    DeleteFaqMaster, 
    DeleteFaqMasterList, 
    DeleteFeedBack, 
    DeleteInstitutes, 
    DeleteLeaveMaster, 
    DeleteLegalMaster, 
    DeleteLegalDescription, 
    DeleteMySchedule, 
    DeleteOrgTypeMaster, 
    DeletePostionMaster, 
    DeletePublishToMaster, 
    DeleteTitleMaster,
    DeleteMYConsultant,
    DeleteChatProfile,
DeleteContactUs,
Deletedh_feedback_for_dohr,
DeleteInactiveConsultant,
Delete_open_application,
Delete_ad_Applications,
Delete_ad_Advertisment,
Delete_subEmail
 } = require("../Service/common_delete_services");

module.exports = {
   
     delete_vacancy: (req, res) => {
      console.log("hi");
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteVacancy(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_consultant: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteConsultant(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_inactive_consultant: (req, res) => {
      const data = req.body;

       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteInactiveConsultant(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_deny_request_list: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteDenyRequestList(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_absence_request: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteAbsenceRequest(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_customer: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteCustomer(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_description_ticktbox_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteDescriptionMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_express_pass: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteExpressPass(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_express_pass_users: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteExpressPassUsers(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_faq_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteFaqMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      Delete_faq_master_list: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteFaqMasterList(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_feedback: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteFeedBack(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_institute: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteInstitutes(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_ins_req_info: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteDescriptionMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_leave_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteLeaveMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_legal_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteLegalMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_legal_des: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteLegalDescription(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_my_schedule: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteMySchedule(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_org_type: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteOrgTypeMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_postion_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeletePostionMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_publishto_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeletePublishToMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
  
      delete_chat_profile: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteChatProfile(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },



      delete_title_master: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteTitleMaster(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_my_consultant: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteMYConsultant(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_contact_us: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        DeleteContactUs(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_feedback_for_dohr: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        Deletedh_feedback_for_dohr(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_open_application: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        Delete_open_application(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      
      delete_advertisment: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        Delete_ad_Advertisment(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_advertisment_applications: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        Delete_ad_Applications(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

      delete_sub_email: (req, res) => {
        const data = req.body;
       if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
    
        Delete_subEmail(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },

};