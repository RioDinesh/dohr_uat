const {
  AssignVacancy,
  CompleteMyVacancy,
  GetCustomerNotificationId,
  GetConsNotification,
} = require("../Service/common_edit_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var fun = require("../../functions/Basic_methods");
const { GetAllConsultant } = require("../../Admin/Service/admin_get_services");
module.exports = {
  assign_vacancy: (req, res) => {
    const data = req.body;

    if ((!data.id, !data.vid)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    AssignVacancy(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      //notification
      GetCustomerNotificationId(data, (error, n_res) => {
        if (error) {
          console.log(error);
        }

        if (n_res.length != 0) {
          var message = {
            token: n_res[0].notification_id,
            notification: {
              body: "Ditt publicerade jobb har nu tillsatts. Vi uppskattar att du använder DoHR!",
              title: "A New Message",
            },
          };

          fun.FCM_MESSAGE(message);
        }

        return res.status(200).json({
          success: true,
          message: results,
        });
      });
    });
  },

  complete_my_vacancy: (req, res) => {
    const data = req.body;

    if (
      !data.vid ||
      !data.report_start_time ||
      !data.report_end_time ||
      !data.report_break_time ||
      !data.report_total_whours ||
      !data.report_reason
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CompleteMyVacancy(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetConsNotification(data, (error, cons) => {
        console.log(error);

        if (cons.length != 0) {
          var message = {
            token: cons[0].notification_id,
            notification: {
              body: "En ny tidsrapport väntar på ditt godkännande. Vänligen godkänn inom 48 timmar innan den automatiskt godkänns. Tack för ditt samarbete!",
              title: "A New Message",
            },
          };

          fun.FCM_MESSAGE(message);
        }
      });

      return res.status(200).json({
        success: true,
        message: "Completed",
      });
    });
  },
};
