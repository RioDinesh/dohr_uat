const {
  GetMySchedule,
  CreateSchedule,
  GetMyAbsence,
  GetICovered,
  GetMyCovered,
  GetMyVacancyCustomer,
  GetCoveredCount,
  GetVacancyStatus,
  GetVacancyCount,
  getvacancydata,
  updatevacancy,
  getvacancydata20,
  updatevacancy20,
  not_approved,
  VacancyCancel,
  GetConsultant,
  GetCons,
  UpadteSchedulePdf,
  GetMyCoveredInternal,
} = require("../Service/cus_post_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
var fun = require("../../functions/Basic_methods");
module.exports = {
  create_schedule: (req, res) => {
    const data = req.body;

    var arr = [];
    data.dates_info.forEach((element) => {
      arr.push([
        element.unique_id,
        element.cus_id,
        element.ins_id,
        element.day,
        element.start_time,
        element.end_time,
        element.year_group,
        element.classroom,
        element.subject,
      ]);
    });

    CreateSchedule(arr, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Schedule Created",
      });
    });
  },

  add_Lessonplan_instruction_schedule_pdf: (req, res) => {
    let data = req.body;

    if (data.pdf) {
      // Extract file extension
      const matches = data.pdf.match(/^data:([A-Za-z-+/]+);base64,/);
      if (matches) {
        const mimeType = matches[1];
        const extension = mimeType.split("/")[1];

        // Check if the file is a PDF
        if (extension === "pdf") {
          const currentDate = new Date();
          const formatFilename = currentDate.toISOString();
          const filename = formatFilename.replace(/[-:.]/g, "");
          const desPath = path.join(
            __dirname,
            "../../attachments/" + `${filename}.pdf`
          );

          const base64Data = data.pdf.replace(
            /^data:([A-Za-z-+/]+);base64,/,
            ""
          );
          fs.writeFileSync(desPath, base64Data, { encoding: "base64" });
          data.pdfname = `${filename}.pdf`;
        } else {
          console.error("The provided file is not a PDF.");

          return res.status(404).json({
            success: false,
            message: "The provided file is not a PDF.",
          });
        }
      } else {
        console.error("Invalid file format.");
        return res.status(404).json({
          success: false,
          message: "Invalid file format.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "File is Missing",
      });
    }

    UpadteSchedulePdf(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Schedule Created",
      });
    });
  },

  get_my_covered: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyCovered(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetMyCoveredInternal(data, (err, results2) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        let dataflow = {
          consultant: results,
          customer: results2,
        };

        return res.status(200).json({
          success: true,
          message: dataflow,
        });
      });

      
    });
  },
  assigned_cover_count: (req, res) => {
    const data = req.body;

    if (!data.cus_id || !data.date) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetCoveredCount(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
      });
    });
  },
  get_I_covered: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetICovered(data, (err, results) => {
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

  get_myschedule: (req, res) => {
    const data = req.body;
    //console.log(data);
    var finalArray = [];
    if (!data.unique_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMySchedule(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      //console.log(results);
      results.forEach((dataa) => {
        var index = finalArray
          .map(function (img) {
            return img.title;
          })
          .indexOf(dataa.day);

        console.log(index);
        if (index == -1) {
          finalArray.push({
            title: dataa.day,
            DayData: [dataa],
          });
        } else {
          finalArray[index].DayData.push(dataa);
        }
      });

      return res.status(200).json({
        success: true,
        message: finalArray,
      });
    });
  },
  get_my_absence: (req, res) => {
    var data = req.body;

    GetMyAbsence(data, (err, results) => {
      var finalarray = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      results.forEach((Adata, i) => {
        var obj = {
          id: Adata.id,
          unique_id: Adata.unique_id,
          first_name: Adata.first_name,
          last_name: Adata.last_name,
          leave_type_id: Adata.leave_type_id,
          leave_type: Adata.leave_type,
          additional_comment: Adata.additional_comment,
          from_date: Adata.from_date,
          from_time: Adata.from_time,
          to_time: Adata.to_time,
          to_date: Adata.to_date,
          Parental_leave_percentage: Adata.Parental_leave_percentage,
          child_first_name: Adata.child_first_name,
          child_last_name: Adata.child_last_name,
          appro_due_date: Adata.appro_due_date,
          with_pay: Adata.with_pay,
          without_pay: Adata.without_pay,
          reason: Adata.reason,
          substitute_required: Adata.substitute_required,
          is_approved: Adata.is_approved,
          is_active: Adata.is_active,
          is_denied: Adata.is_denied == 1 ? true : false,
          deny_reason: Adata.deny_reason,
          parental_additional_comment: Adata.parental_additional_comment,
          parental_birth_date: Adata.parental_birth_date,
          who_denied: Adata.who_denied,
          approved_by: Adata.approved_by,
          created_at: Adata.created_at,
          updated_at: Adata.updated_at,
        };
        finalarray.push(obj);
        if (i + 1 == results.length) {
          return res.status(200).json({
            success: true,
            message: finalarray,
          });
        }
      });
    });
  },

  get_my_vacancy_customer: (req, res) => {
    const data = req.body;
    //status ==> 1(assigned) status ==> 2(completed)
    if (!data.cus_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyVacancyCustomer(data, (err, results) => {
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
  get_vacancy_status: (req, res) => {
    const data = req.body;

    //status ==> 1(assigned) status ==> 2(completed)
    console.log(data);
    if ((!data.unique_id, !data.status, !data.date)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetVacancyStatus(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      var arr = [];
      GetConsultant((err, cons) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        results.forEach((X) => {
          cons.forEach((Y) => {
            if (X.assigned_to_external != null && X.assigned_to_external != 0) {
              if (X.assigned_to_external == Y.id) {
                X.consultant_fname = Y.first_name;
                X.consultant_lname = Y.last_name;
                X.profile_img = Y.profile_img;
                X.consultant_description = Y.description;
              }
            } else {
              X.consultant_fname = null;
              X.consultant_lname = null;
              X.profile_img = null;
            }
          });
        });
        results.sort(
          (d1, d2) =>
            new Date(d1.v_date).getTime() - new Date(d2.v_date).getTime()
        );
        var finalArray = [];
        var ResultArray = [];
        results.forEach((E) => {
          if (fun.IsNOtPassed30Days(E.v_date) == false && E.is_canceled == 1) {
            //do nothing
          } else {
            ResultArray.push(E);
          }
        });
        results.forEach((E) => {
          if (fun.IsNOtPassed30Days(E.v_date)) {
            finalArray.push(E);
          }
        });
        return res.status(200).json({
          success: true,
          message: data.status == "2" ? finalArray : ResultArray,
        });
      });
    });
  },

  get_vacancy_status_count: (req, res) => {
    const data = req.body;
    console.log(data);
    //status ==> 1(assigned) status ==> 2(completed)
    var finalArray = [];

    if ((!data.unique_id, !data.date)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetVacancyCount(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var obj = {
        draft: 0,
        completed: 0,
        published: 0,
        filled: 0,
        unfilled: 0,
      };
      results.forEach((l_data) => {
        if (l_data.is_draft == 1) {
          obj.draft = obj.draft + 1;
        }
        if (
          l_data.is_draft == 0 &&
          l_data.v_date == data.date &&
          l_data.is_draft == 0
        ) {
          obj.published = obj.published + 1;
        }
        if (
          l_data.vacancy_status == 1 &&
          l_data.v_date == data.date &&
          l_data.is_draft == 0
        ) {
          obj.filled = obj.filled + 1;
        }
        if (l_data.vacancy_status == 2 && l_data.is_draft == 0) {
          if (fun.IsNOtPassed30Days(l_data.v_date)) {
            obj.completed = obj.completed + 1;
          }
        }

        if (
          l_data.vacancy_status == 0 &&
          l_data.v_date == data.date &&
          l_data.is_draft == 0
        ) {
          obj.unfilled = obj.unfilled + 1;
        }
      });

      return res.status(200).json({
        success: true,
        message: obj,
      });
    });
  },

  Cancel_Vacnacy_4pm: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    console.log(data);
    GetCons(data, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.sqlMessage,
        });
      }
      if (result.length != 0) {
        fun.sendMail(
          result[0].email_id,
          "Ditt planerade jobb är inställt/Your scheduled job is cancelled!",
          `<p>Hej!</p>

          <p>Vi beklagar att informera dig om att ett av dina planerade jobb har ställts in på grund av oförutsedda omständigheter. </p>
          
          <p>Viktig information för ENDAST DoHR-anställda:</p>
          <p>Om du fortfarande vill arbeta den dagen, vänligen följ dessa steg:</p>
              <p>
       1. Acceptera andra lediga jobb.<br>
2. Registrera dig som reservvikarie via DoHR-mobilappen (Reservpool - endast för DoHR-anställda). Om reservpoolen inte är tillgänglig eller stängd, vänligen mejla oss.
     
        </p>

          
          
          <p>Greetings,</p>
          
          <p>We regret to inform you that one of your scheduled jobs has been canceled due to unforeseen circumstances. </p>
          
          <p>Important information for DoHR-employees ONLY:</p>
          <p>If you are still available to work on that day, we encourage you to follow these steps:</p>
     <p>1. Accept any other available jobs.<br>
2. Register as a reserve substitute through the DoHR mobile app (Reserve Pool - only for DoHR-employees). If the Reserve Pool is unavailable or closed, please contact us via email.
</p>
          <br>
        <p>Med vänliga hälsningar / Best wishes,</p>
        <p>DoHR (/ˈdɔr/) team</p>
        <br>
        <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
          
          `
        );
        var message = {
          notification: {
            body: 'Ett av dina planerade jobb har avbokats av kunden på grund av oförutsedda händelser. Se "Mina jobb" för mer information.',
            title: "A New Message",
          },
          token: result[0].notification_id,
        };
        fun.FCM_MESSAGE(message);
      }

      VacancyCancel(data, (err, results) => {
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
    });
  },

  ///<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<cronjob>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  publish_to_all: (req, res) => {
    getvacancydata((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      if (results.length == 0) {
        return res.status(200).json({
          success: true,
          message: "No Schedule",
        });
      }

      var ids = [];
      results.forEach((X) => {
        const d = new Date();
        var created_at_min = X.created_at.toISOString().substring(11, 19);
        var date_only_today = d.toISOString().substring(0, 10);
        const d1 = new Date(date_only_today + "T" + created_at_min).getTime();
        const d2 = new Date().getTime();
        var passed_min = Math.round((d2 - d1) / 60000);
        var abs_passed_min = Math.abs(passed_min);
        console.log(created_at_min);
        console.log(abs_passed_min);
        if (abs_passed_min > 30) {
          ids.push(X.id);
        }
      });

      if (ids.length != 0) {
        updatevacancy(ids, (error, response) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: error.sqlMessage,
            });
          }

          return res.status(200).json({
            success: true,
            message: "Updated",
          });
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "NONE",
        });
      }
    });
  },
  publish_to_all_20min: (req, res) => {
    console.log("in");
    getvacancydata20((err, results) => {
      if (err) {
        console.log(err);
        return {
          success: false,
          message: err.sqlMessage,
        };
      }

      if (results.length == 0) {
        return {
          success: true,
          message: "No Schedule",
        };
      }

      var ids = [];
      results.forEach((X) => {
        const d = new Date();
        var created_at_min = X.created_at.toISOString().substring(11, 19);
        var date_only_today = d.toISOString().substring(0, 10);
        const d1 = new Date(date_only_today + "T" + created_at_min).getTime();
        const d2 = new Date().getTime();
        var passed_min = Math.round((d2 - d1) / 60000);
        var abs_passed_min = Math.abs(passed_min);
        console.log(created_at_min);
        console.log(abs_passed_min);
        if (abs_passed_min > 20) {
          ids.push(X.id);
        }
      });

      if (ids.length != 0) {
        updatevacancy20(ids, (error, response) => {
          if (error) {
            console.log(error);
            return {
              success: false,
              message: error.sqlMessage,
            };
          }

          return {
            success: true,
            message: "Updated",
          };
        });
      } else {
        return {
          success: true,
          message: "NONE",
        };
      }
    });
  },

  hr_48_rule: (req, res) => {
    not_approved((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      if (results.length == 0) {
        return res.status(200).json({
          success: true,
          message: "No Schedule",
        });
      }

      var ids = [];
      results.forEach((X) => {
        const dateOne = X.created_at;
        const dateOneObj = new Date(dateOne);
        const dateTwoObj = new Date();
        const milliseconds = Math.abs(dateTwoObj - dateOneObj);
        const hours = milliseconds / 36e5;
        console.log(hours);
        if (hours > 48) {
          ids.push(X.id);
        }
      });

      // if (ids.length != 0) {
      //   updatevacancy20(ids, (error, response) => {
      //     if (error) {
      //       console.log(error);
      //       return res.status(500).json({
      //         success: false,
      //         message: error.sqlMessage,
      //       });
      //     }

      //     return res.status(200).json({
      //       success: true,
      //       message: "Updated",
      //     });

      //   });
      // } else {
      //   return res.status(200).json({
      //     success: true,
      //     message: "NONE",
      //   });
      // }
    });
  },
};
