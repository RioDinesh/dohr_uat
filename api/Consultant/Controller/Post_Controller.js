const {
  CreateSubstitute,
  CreateTeaching,
  CreateNonTeaching,
  Validation,
  Get_Schedule_Count,
  GetReservedPoolCount,
  CancelVacancy,
  GetOverview,
  GetConsulatant,
  GetVacancy,
  GetMyJobsVacancy,
  GetCustomer,
  CreateOpenApplication,
  GetOpenApplication,
  CreateAdvertismentApplication,
  GetadApplication,
} = require("../Service/con_post_services");
const {
  Get_contactus_master,
} = require("../../Admin/Service/admin_post_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var fun = require("../../functions/Basic_methods");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const {
  GetCustomerNotificationId,
} = require("../../Common/Service/common_edit_services");
//
// var data={
//  data:data1,
//  password:pass
// }

moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});
module.exports = {
  create_substitute: async (req, res) => {
    const data = req.body;

    // if (
    //   !data.first_name ||
    //   !data.last_name ||
    //   !data.email_id ||
    //   !data.phone_number ||
    //   !data.swedish_personal_number ||
    //   !data.self_employed ||
    //   !data.swedish_bank_account ||
    //   !data.preferred_work_institution ||
    //   !data.description ||
    //   !data.iam_student ||
    //   !data.name_of_institutition ||
    //   !data.work_exp_in_school ||

    //   !data.work_exp_out_school ||

    //   !data.other_occupations ||

    //   !data.as_soon_as_possible ||
    //   !data.specify_date ||

    //   !data.police_clearance_report ||
    //   !data.police_report ||
    //   !data.Driving_license ||
    //   !data.terms_and_condition
    // ) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }
    Validation(data, (errorr, validation) => {
      if (errorr) {
        console.log(errorr);
        return res.status(500).json({
          success: false,
          message: errorr.sqlMessage,
        });
      }

      if (validation.length != 0) {
        return res.status(500).json({
          success: false,
          message: "Email Already Present",
        });
      }
      var pass = Math.random().toString(36).slice(2, 10);
      const salt = genSaltSync(10);
      data.password = hashSync(pass, salt);

      if (data.reg_iam_teacher_student == true) {
        const file = data.proof_of_studies.split(";base64,").pop();
        const fileType = data.proof_of_studies.split(";")[0].split("/")[1];
        const filename = "pos" + data.phone_number + "." + fileType;
        var des_path = path.join(__dirname, "../../attachments/" + filename);

        fs.writeFile(des_path, file, { encoding: "base64" }, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error uploading file.");
          }
        });
        data.proof_of_studies = filename;
      }
      console.log(data.proof_of_studies);

      if (data.police_clearance_report == true) {
        // const file = data.police_report.split(';base64,').pop();
        // const fileType = data.police_report.split(';')[0].split('/')[1];
        // const filename = 'pcr' + data.phone_number + '.' + fileType;
        // var des_path = path.join(__dirname, '../../attachments/' + filename);
        // fs.writeFile(des_path, file, { encoding: 'base64' }, err => {
        //   if (err) {
        //     console.error(err);
        //     res.status(500).send('Error uploading file.');
        //   }
        // });
        // data.police_report = filename;
      }

      if (data.right_to_work_in_Sweden == true) {
        // const file = data.right_to_work_in_Sweden_attachment.split(';base64,').pop();
        // const fileType = data.right_to_work_in_Sweden_attachment.split(';')[0].split('/')[1];
        // const filename = 'rws' + data.phone_number + '.' + fileType;
        // var des_path = path.join(__dirname, '../../attachments/' + filename);
        // fs.writeFile(des_path, file, { encoding: 'base64' }, err => {
        //   if (err) {
        //     console.error(err);
        //     res.status(500).send('Error uploading file.');
        //   }
        // });
        // data.right_to_work_in_Sweden_attachment = filename;
      }

      // console.log(data.right_to_work_in_Sweden_attachment);
      // console.log(data.police_report);
      // console.log(data.proof_of_studies);

      CreateSubstitute(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        fun.sendMail(
          data.email_id,
          "DoHR - Jobbansökan  / Job application",
          `
          <html >

<head>

</head>

<body>

    <div>
        <p>Hej!</p>
        <p>Tack för att du skickade din ansökan till DoHR (/ˈdɔr/)! Vi uppskattar ditt intresse och ser fram emot att granska din ansökan.</p>
        <p>Vi får ett stort antal ansökningar och det kan ta lite tid för oss att återkomma till dig. I väntan på det fortsätt gärna hålla utkik på "Lediga jobb" på vår hemsida och följ vad som händer hos oss i sociala medier.</p>
        <p>Vi önskar dig en fin dag och ett stort lycka till i ditt jobbsökande!</p>
        <br>
        <p>Dear Candidate!</p>
        <p>Thank you for submitting your application to DoHR (/ˈdɔr/)! We sincerely appreciate your interest and look forward to reviewing your application.</p>
        <p>We get a considerable amount of applications, so it may take us some time to respond to you. Meanwhile, we encourage you to check our "Vacancies" on our website and follow what's happening with us on social media.</p>
        <p>We wish you a nice day and the best of luck in your job search!</p>
        <br>
        <p>Med vänliga hälsningar / Best wishes,</p>
        <p>DoHR (/ˈdɔr/) team</p>
        <br>
        <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
    </div>

</body>

</html>

          `
        );

        return res.status(200).json({
          success: true,
          message: "registered successfully",
        });
      });
    });
  },

  open_application_form: (req, res) => {
    const data = req.body;

    if (data.right_to_work_in_Sweden == true) {
      // const file = data.right_to_work_in_Sweden_attachment.split(';base64,').pop();
      // const fileType = data.right_to_work_in_Sweden_attachment.split(';')[0].split('/')[1];
      // const filename = 'opa_rws' + data.phone_number + '.' + fileType;
      // var des_path = path.join(__dirname, '../../attachments/' + filename);
      // fs.writeFile(des_path, file, { encoding: 'base64' }, err => {
      //   if (err) {
      //     console.error(err);
      //     res.status(500).send('Error uploading file.');
      //   }
      // });
      // data.right_to_work_in_Sweden_attachment = filename;
    }

    if (data.swedishLara == true) {
      const file = data.fileswedishlara.split(";base64,").pop();
      const fileType = data.fileswedishlara.split(";")[0].split("/")[1];
      const filename = "opa_fsl" + data.phone_number + "." + fileType;
      var des_path = path.join(__dirname, "../../attachments/" + filename);
      fs.writeFile(des_path, file, { encoding: "base64" }, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading file.");
        }
      });
      data.fileswedishlara = filename;
    }

    CreateOpenApplication(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      fun.sendMail(
        data.email_id,
        "DoHR - Jobbansökan  / Job application",
        `
        <html >

<head>

</head>

<body>

  <div>
      <p>Hej!</p>
      <p>Tack för att du skickade din ansökan till DoHR (/ˈdɔr/)! Vi uppskattar ditt intresse och ser fram emot att granska din ansökan.</p>
      <p>Vi får ett stort antal ansökningar och det kan ta lite tid för oss att återkomma till dig. I väntan på det fortsätt gärna hålla utkik på "Lediga jobb" på vår hemsida och följ vad som händer hos oss i sociala medier.</p>
      <p>Vi önskar dig en fin dag och ett stort lycka till i ditt jobbsökande!</p>
      <br>
      <p>Dear Candidate!</p>
      <p>Thank you for submitting your application to DoHR (/ˈdɔr/)! We sincerely appreciate your interest and look forward to reviewing your application.</p>
      <p>We get a considerable amount of applications, so it may take us some time to respond to you. Meanwhile, we encourage you to check our "Vacancies" on our website and follow what's happening with us on social media.</p>
      <p>We wish you a nice day and the best of luck in your job search!</p>
      <br>
      <p>Med vänliga hälsningar / Best wishes,</p>
      <p>DoHR (/ˈdɔr/) team</p>
      <br>
      <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
  </div>

</body>

</html>

        `
      );

      return res.status(200).json({
        success: true,
        message: "registered successfully",
      });
    });
  },

  advertisement_application_form: (req, res) => {
    const data = req.body;

    if (data.right_to_work_in_Sweden == true) {
      // const file = data.right_to_work_in_Sweden_attachment.split(';base64,').pop();
      // const fileType = data.right_to_work_in_Sweden_attachment.split(';')[0].split('/')[1];
      // const filename = 'adf_rws' + data.phone_number + '.' + fileType;
      // var des_path = path.join(__dirname, '../../attachments/' + filename);
      // fs.writeFile(des_path, file, { encoding: 'base64' }, err => {
      //   if (err) {
      //     console.error(err);
      //     res.status(500).send('Error uploading file.');
      //   }
      // });
      // data.right_to_work_in_Sweden_attachment = filename;
    }

    if (data.swedishLara == true) {
      const file = data.fileswedishlara.split(";base64,").pop();
      const fileType = data.fileswedishlara.split(";")[0].split("/")[1];
      const filename = "adf_fsl" + data.phone_number + "." + fileType;
      var des_path = path.join(__dirname, "../../attachments/" + filename);
      fs.writeFile(des_path, file, { encoding: "base64" }, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error uploading file.");
        }
      });
      data.fileswedishlara = filename;
    }

    CreateAdvertismentApplication(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "registered successfully",
      });
    });
  },

  create_teaching: (req, res) => {
    const data = req.body;

    if (
      !data.first_name ||
      !data.last_name ||
      !data.email_id ||
      !data.phone_number ||
      !data.swedish_personal_number ||
      !data.Nationality ||
      !data.country_of_residence ||
      !data.right_to_work_in_Sweden ||
      !data.proof_work_permit ||
      !data.preferred_work_institution ||
      !data.my_preferred_location ||
      !data.Swedish_lärarlegitimation ||
      !data.info_Swedish_lärarlegitimation ||
      !data.teaching_certificate ||
      !data.info_teaching_certificate ||
      !data.work_exp_in_school ||
      !data.info_work_exp_in_school ||
      !data.other_experience ||
      !data.info_other_experience ||
      !data.anytime ||
      !data.specify_date ||
      !data.language_skills ||
      !data.police_clearance_report ||
      !data.police_report ||
      !data.terms_and_condition
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CreateTeaching(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "registered successfully",
      });
    });
  },
  create_non_teaching: (req, res) => {
    const data = req.body;

    if (
      !data.first_name ||
      !data.last_name ||
      !data.email_id ||
      !data.phone_number ||
      !data.swedish_personal_number ||
      !data.Nationality ||
      !data.country_of_residence ||
      !data.right_to_work_in_Sweden ||
      !data.proof_work_permit ||
      !data.relevant_education ||
      !data.relevant_work_experience ||
      !data.why_you_are_interested ||
      !data.anytime ||
      !data.specify_date ||
      !data.language_skills ||
      !data.police_clearance_report ||
      !data.police_report ||
      !data.terms_and_condition
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CreateNonTeaching(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "registered successfully",
      });
    });
  },

  Get_Consultant_Schedule_Count: (req, res) => {
    const data = req.body;

    console.log(data);

    if (!data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    var date = new Date();
    var current_year = date.getFullYear();

    console.log(data.current_month, current_year);

    Get_Schedule_Count(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var obj = {
        scheduled: 0,
        completed: 0,
        reserved_pool: 0,
      };
      var dates = fun.GetDatesOfMonth(data.current_month, current_year);

      GetReservedPoolCount(data, (errr, pool) => {
        if (errr) {
          console.log(errr);
          return res.status(500).json({
            success: false,
            message: errr.sqlMessage,
          });
        }
        console.log("innnnnnnnnnnnnnnnn");
        dates.forEach((X) => {
          console.log(X.toISOString().slice(0, 10).toString());

          results.forEach((Y) => {
            console.log(Y.v_date);
            if (X.toISOString().slice(0, 10).toString() == Y.v_date) {
              if (Y.vacancy_status == "2") {
                obj.completed = obj.completed + 1;
              }

              if (Y.vacancy_status == "1") {
                obj.scheduled = obj.scheduled + 1;
              }
            }
          });
        });

        pool.forEach((Z) => {
          var m = data.current_month + 1;
          var month;
          if (
            m == 1 ||
            m == 2 ||
            m == 3 ||
            m == 4 ||
            m == 5 ||
            m == 6 ||
            m == 7 ||
            m == 8 ||
            m == 9
          ) {
            month = "0" + m.toString();
          } else {
            month = m.toString();
          }
          console;
          var this_m_y = current_year + "-" + month;
          console.log(this_m_y, Z.date.slice(0, 7));
          if (this_m_y.toString() == Z.date.slice(0, 7)) {
            obj.reserved_pool = obj.reserved_pool + 1;
          }
        });

        return res.status(200).json({
          success: true,
          message: obj,
        });
      });
    });
  },

  Get_Reserved_Pool: (req, res) => {
    const data = req.body;

    if (!data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    var date = new Date();
    var current_year = date.getFullYear();
    var current_month = date.getMonth() + 1;
    GetReservedPoolCount(data, (err, pool) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var arr = [];
      pool.forEach((Z) => {
        var this_m_y = current_year + "-" + m;

        if (this_m_y.toString() == Z.date.slice(0, 7)) {
          arr.push(Z);
        }
      });

      return res.status(200).json({
        success: true,
        message: arr,
      });
    });
  },

  Cancel_Vacancy: (req, res) => {
    const data = req.body;
    if ((!data.vid, !data.cons_id, !data.date)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CancelVacancy(data, (err, pool) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      if (data.before_90min == true) {
        Get_contactus_master((err, result) => {
          if (err) {
            console.log(err);
          }
          var master = result;
          fun.sendMail(
            master.email_id,
            "DoHR Cancellation Alert",
            `A consultant has cancelled a vacancy 90 minutes or less prior to its start time. An immediate action is needed. Go to the DoHR Admin panel /Published vacancy, to learn more.`
          );
        });
      }

      GetCustomerNotificationId(data, (error, n_res) => {
        if (error) {
          console.log(error);
        }

        if (n_res.length != 0) {
          var message = {
            token: n_res[0].notification_id,
            notification: {
              body: "Tyvärr har vikarien avbokat jobbet. Om jobbet publicerades till endast en vikarie måste du publicera ett nytt jobb igen. Annars kommer jobbet automatiskt att vara tillgänglig för andra vikarier.",
              title: "A New Message",
            },
          };

          fun.FCM_MESSAGE(message);
        }

        return res.status(200).json({
          success: true,
          message: "Cancelled",
        });
      });
    });
  },

  consultant_overview: (req, res) => {
    const data = req.body;
    if (!data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetOverview(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      var arr = {
        today: [],
        pastweek: [],
        currentmonth: [],
      };
      console.log(results);
      results.forEach((X) => {
        var date = new Date();
        var previousweek = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        const startOfMonth = moment()
          .startOf("month")
          .format("YYYY-MM-DD hh:mm");
        const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");
        console.log(previousweek.getDay());
        const startOfWeek = moment().subtract(1, "weeks").startOf("week");
        const endOfWeek = moment().subtract(1, "weeks").endOf("week");

        var V = new Date(X.v_date);

        if (
          moment(X.v_date).isSame(startOfWeek, endOfWeek, undefined, "(]") ||
          moment(X.v_date).isBetween(startOfWeek, endOfWeek, undefined, "(]")
        ) {
          console.log(moment(X.v_date));
          arr.pastweek.push(X);
        }

        if (date.toDateString() === V.toDateString()) {
          arr.today.push(X);
        }

        if (
          moment(X.v_date).isBetween(startOfMonth, endOfMonth, undefined, "(]")
        ) {
          arr.currentmonth.push(X);
        }
      });

      return res.status(200).json({
        success: true,
        message: arr,
      });
    });
  },

  consultant_available_jobs: (req, res) => {
    const data = req.body;
    var arr = [];
    if (!data.id || !data.location || !data.date) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetConsulatant(data, (err, cons) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetVacancy(data, (err, vacancy) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        GetCustomer((error, cus) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: error.sqlMessage,
            });
          }
          console.log(cus);

          vacancy.forEach((X) => {
            cus.forEach((Y) => {
              console.log(Y.first_name, Y.last_name);
              if (X.created_by == Y.unique_id) {
                X.customer_fname = Y.first_name;
                X.customer_lname = Y.last_name;
                X.telephone_number = Y.telephone_number;
                X.institute_name = Y.company_name;
                X.institute_type = Y.organization_type;
                X.org_id = Y.organization_type_id;
              }
            });
          });
          console.log(vacancy);
          vacancy.forEach((X) => {
            if (X.publish_to_id == 2 && cons.iam_student == 1) {
              arr.push(X);
            }

            if (X.publish_to_id == 1) {
              arr.push(X);
            }

            if (X.publish_to_id == 3) {
              var cons_id = JSON.parse(X.my_consultant);
              var found = cons_id.findIndex((element) => element == data.id);
              if (found != -1) {
                arr.push(X);
              }
            }
          });
          var location_sort = [];

          if (
            cons.preferred_location_1 == null &&
            cons.preferred_location_2 == null &&
            cons.preferred_location_3 == null &&
            cons.preferred_location_4 == null &&
            cons.preferred_location_5 == null
          ) {
            location_sort = arr;
          } else {
            arr.forEach((A) => {
              if (
                cons.preferred_location_1 != null &&
                cons.preferred_location_1 != undefined &&
                cons.preferred_location_1 != ""
              ) {
                if (
                  A.area_name.toLowerCase() ==
                  cons.preferred_location_1.toLowerCase()
                ) {
                  location_sort.push(A);
                }
              }
              if (
                cons.preferred_location_2 != null &&
                cons.preferred_location_2 != undefined &&
                cons.preferred_location_2 != ""
              ) {
                if (
                  A.area_name.toLowerCase() ==
                  cons.preferred_location_2.toLowerCase()
                ) {
                  location_sort.push(A);
                }
              }
              if (
                cons.preferred_location_3 != null &&
                cons.preferred_location_3 != undefined &&
                cons.preferred_location_3 != ""
              ) {
                console.log(A.area_name, cons.preferred_location_3);
                if (
                  A.area_name.toLowerCase() ==
                  cons.preferred_location_3.toLowerCase()
                ) {
                  location_sort.push(A);
                }
              }
              if (
                cons.preferred_location_4 != null &&
                cons.preferred_location_4 != undefined &&
                cons.preferred_location_4 != ""
              ) {
                if (
                  A.area_name.toLowerCase() ==
                  cons.preferred_location_4.toLowerCase()
                ) {
                  location_sort.push(A);
                }
              }
              if (
                cons.preferred_location_5 != null &&
                cons.preferred_location_5 != undefined &&
                cons.preferred_location_5 != ""
              ) {
                if (
                  A.area_name.toLowerCase() ==
                  cons.preferred_location_5.toLowerCase()
                ) {
                  location_sort.push(A);
                }
              }
            });
          }

          return res.status(200).json({
            success: true,
            message: data.location == "1" ? location_sort : arr,
          });
        });
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "registered successfully",
      // });
    });
  },

  consultant_My_Jobs: (req, res) => {
    const data = req.body;
    var arr = [];
    if (!data.id || !data.status) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyJobsVacancy(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetCustomer((error, cus) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: error.sqlMessage,
          });
        }

        results.forEach((X) => {
          cus.forEach((Y) => {
            console.log(X.created_by === Y.unique_id);
            if (X.created_by === Y.unique_id) {
              X.customer_fname = Y.first_name;
              X.customer_lname = Y.last_name;
              X.telephone_number = Y.telephone_number;
              X.profile_img = Y.profile_img;
              X.institute_name = Y.company_name;
              X.institute_type = Y.organization_type;
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

          if (
            fun.IsNOtPassed30Days(E.v_date) == true &&
            E.vacancy_is_approved == 1
          ) {
            var dataexist = finalArray.some(function (ele) {
              return ele.id === E.id;
            });

            if (dataexist != true) {
              finalArray.push(E);
            }
          }
        });
        return res.status(200).json({
          success: true,
          message: data.status == "2" ? finalArray : ResultArray,
        });
      });
    });
  },
  get_open_application: (req, res) => {
    const data = req.body;
    GetOpenApplication((err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      if (result.length != 0) {
        if (data.type == 2) {
          const filteredData = result.filter((item) => item.is_approved === 1);
          return res.status(200).json({
            success: true,
            message: filteredData,
          });
        } else if (data.type == 3) {
          const filteredData = result.filter((item) => item.is_denied === 1);
          return res.status(200).json({
            success: true,
            message: filteredData,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: result,
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          message: result,
        });
      }
    });
  },

  get_ad_application: (req, res) => {
    const data = req.body;
    GetadApplication(data, (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      if (result.length != 0) {
        if (data.type == 2) {
          const filteredData = result.filter((item) => item.is_approved === 1);
          return res.status(200).json({
            success: true,
            message: filteredData,
          });
        } else if (data.type == 3) {
          const filteredData = result.filter((item) => item.is_denied === 1);
          return res.status(200).json({
            success: true,
            message: filteredData,
          });
        } else {
          console.log(result.length);
          const filteredData = result.filter(
            (item) => item.is_denied === 0 && item.is_approved === 0
          );
          console.log(filteredData.length);
          return res.status(200).json({
            success: true,
            message: filteredData,
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          message: result,
        });
      }
    });
  },
};
