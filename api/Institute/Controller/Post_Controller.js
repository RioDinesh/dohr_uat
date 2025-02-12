const {
  CreateCustomer,
  CreateAbsence,
  Login,
  CreateVacancy,
  CreateUncoveredVacancy,
  GetMyInstitue,
  CreateUncoverSchedule,
  GetScheduleAbsence,
  GetAbsence,
  GetInstituteCoveredSchedule,
  GetDraftAndPublishedVacany,
  GetAllAbsence,
  GetUncoveredSchedule,
  GetAbsenceStaff,
  GetInternalTeacher,
  GetMyConsultant,
  GetMyCustomer,
  GetMyScheduleIns,
  GetFilledAndUnfilled,
  GetCoveredAndUnCovered,
  CreateUncoveredVacancyExternal,
  CreateUncoveredVacancyInternal,
  ADDMyCons,
  GetMyCons,
  Create_Customer_Get_Ins,
  GetAbsenceStaffCount,
  Validation,
  GetInternalTeacherByAbscent,
  DenyAbsence,
  GetDenyList,
  GetMyConsultant_API,
  CreateCustomerAPI,
  MakeCustomerVerfied,
  GetMyConsultantNotification,
  GetMyHours,

  TopUpMYHoursAdmin,
  TopUpMYHoursAdminUpdate,
  UpdateRequestMyhourState,
  GetMyRequestHours,
  TopUpMYHoursRequest,
  GetVacancySchedulExternal,
  GetVacancyScheduleInternal,
  GetInternalTeacherScheduleData,
  GetInternalTeacherVacancyData,
} = require("../Service/ins_post_services");
const { GetInstitueRequirement } = require("../Service/ins__get_services");
const {
  UpdateAbsenceStatus,
  UpdateAbsenceStatus2,
} = require("../Service/ins_edit_services");
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var fun = require("../../functions/Basic_methods");
var moment = require("moment"); // require
const { GetALLConsultant } = require("../../Cron/services/Cron_Services");
moment().format();
module.exports = {
  login: (req, res) => {
    const body = req.body;

    if (!body.email_id || !body.password) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    Login(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      console.log(results);
      if (results.length == 0) {
        return res.status(500).json({
          success: false,
          message: "No Users Found",
        });
      }
      console.log(body.password);
      console.log(results.data.password);

      const result = compareSync(body.password, results.data.password);

      if (result) {
        results.password = undefined;
        return res.json({
          success: true,
          message: results,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    });
  },
  create_customer_api: (req, res) => {
    const data1 = req.body;
    var pass = data1.password;
    console.log(data1);
    if (
      !data1.first_name ||
      !data1.last_name ||
      !data1.title ||
      !data1.title_id ||
      !data1.company_name ||
      !data1.organization_no ||
      !data1.organization_type ||
      !data1.organization_type_id ||
      !data1.email_id ||
      !data1.telephone_number ||
      !data1.address ||
      !data1.postal_code ||
      !data1.area_name ||
      !data1.invoice_address ||
      !data1.invoice_postal_code ||
      !data1.invoice_area_name ||
      !data1.invoice_email_id ||
      !data1.password ||
      !data1.invoice_reference
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    Validation(data1, (errorr, validation) => {
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

      var [username, domain] = data1.email_id.split("@");

      domain = "@" + domain;

      Create_Customer_Get_Ins(domain, (error, ins) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: error.sqlMessage,
          });
        }
        if (ins.length != 0) {
          var institute = ins[0];
          const salt = genSaltSync(10);
          const match = data1.email_id.match(/([^@]*)@/);
          const emailhash = match[1];
          let randomNumbers = Math.floor(Math.random() * 90) + 10;

          data1.unique_id =
            data1.title.substring(0, 2) +
            emailhash +
            data1.telephone_number.toString().substring(3, 4) +
            randomNumbers;

          data1.password = hashSync(data1.password, salt);
          data1.ins_id = institute.id;

          CreateCustomerAPI(data1, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            var payload = {
              id: results.insertId,
              email_id: data1.email_id,
              password: pass,
            };
            var token = jwt.sign(payload, process.env.JWT_KEY);
            console.log(token);
            var fullUrl =
              req.protocol + "://" + req.get("host") + "/verfiy/" + token;

            fun.sendMail(
              data1.email_id,
              "Verifiera ditt företagskonto / Verify your company account - DoHR",
              `
            <p>Hej!</p>

            <p>Grattis till att du har skapat ett företagskonto för att använda DoHR-mobilappen! Detta möjliggör en smidig kontakt med era interna vikarier eller DoHR-vikarier.</p>
            
            <p>Nästa steg är att verifiera ditt företagskonto genom att klicka på länken ${fullUrl} .</p>
            
            <p>När ditt konto är verifierat kan du börja publicera lediga jobb när vikariebehov uppstår. Logga in, publicera jobb till antingen egna interna vikarier eller DoHR-vikarier.</p>
            
            <p>Vi ser fram emot att samarbeta med er!</p>
            
            
            <p>Greetings,</p>
            
            <pCongratulations on successfully creating a company account to use the DoHR mobile app! This brings you closer to seamlessly connecting with your internal pool of substitutes or leveraging DoHR substitutes.</p>
            
            <p>The next step is to verify your company account by clicking on the link above in the Swedish text. </p>
            
            <p>Once verified, you'll gain access to post job vacancies whenever substitutes are needed. Simply log in, create a vacancy, and publish it to either your internal pool or DoHR substitutes.</p>
            
            <p>As a customer, you will receive information from DoHR about new app releases, offers, and other marketing communications. You can opt out of receiving these communications at any time by unsubscribing or contacting us.</p>
            
            <p>We're excited about the opportunity to work with you!</p>
            
            
            <br>
        <p>Med vänliga hälsningar / Best wishes,</p>
        <p>DoHR (/ˈdɔr/) team</p>
        <br>
        <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
              `
            );
            return res.status(200).json({
              success: true,
              message: "Customer registered successfully",
            });
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Domain Not Found",
          });
        }
      });
    });
  },
  create_absence: (req, res) => {
    const data = req.body;
    console.log(data);
    if (
      !data.unique_id ||
      !data.first_name ||
      !data.last_name ||
      !data.leave_type_id ||
      !data.leave_type ||
      !data.from_date ||
      !data.to_date ||
      !data.from_time ||
      !data.to_time ||
      !data.ins_id
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    var days = fun.DayFinder(data.from_date, data.to_date);

    var body = {
      unique_id: data.unique_id,
      day: days,
      from_date: data.from_date,
      to_date: data.to_date,
      from_time: data.from_time,
      to_time: data.to_time,
    };

    GetScheduleAbsence(body, (err, schedule) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      let haveschedule = [];
      schedule.forEach((x) => {
        // Example times
        const scheduleStartTime = new Date(`${data.from_date}T${x.start_time}`);
        const scheduleEndTime = new Date(`${data.from_date}T${x.end_time}`);
        const leaveStartTime = new Date(`${data.from_date}T${x.from_time}`);
        const leaveEndTime = new Date(`${data.to_date}T${x.to_time}`);

        if (
          fun.checkhaveSchedule(
            scheduleStartTime,
            scheduleEndTime,
            leaveStartTime,
            leaveEndTime
          )
        ) {
        } else {
          haveschedule.push(x);
          console.log("The leave is not during work hours.");
        }
      });

      if (haveschedule.length == 0 && data.substitute_required == true) {
        return res.status(500).json({
          success: false,
          message:
            "No schedule is found on the selected dates and substitute_required is enabled",
        });
      } else {
        if (data.from_date == data.to_date) {
          CreateAbsence(data, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            if (
              data.leave_type.toLowerCase() === "vab" ||
              data.leave_type.toLowerCase() === "sick"
            ) {
              if (schedule.length == 0) {
                UpdateAbsenceStatus(results.insertId, (err, uncovered) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: false,
                      message: err.sqlMessage,
                    });
                  }

                  return res.status(200).json({
                    success: true,
                    message: "Absence Approved ",
                  });
                });
              } else {
                var uncovered = [];

                // if (days.length > 0) {
                schedule.forEach((s, indexs) => {
                  days.forEach((d, indexd) => {
                    console.log(s.day);
                    console.log(d);
                    if (d.day.toLowerCase() == s.day.toLowerCase()) {
                      uncovered.push([
                        d.date,
                        s.id,
                        results.insertId,
                        s.ins_id,
                        s.cus_id,
                      ]);
                    }
                  });
                });
                // else {
                //   uncovered.push([
                //     data.from_date,
                //     schedule[0].id,
                //     results.insertId,
                //     schedule[0].ins_id,
                //     schedule[0].cus_id,
                //   ]);
                // }

                CreateUncoverSchedule(uncovered, (err, uncovered) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: false,
                      message: err.sqlMessage,
                    });
                  }

                  UpdateAbsenceStatus(results.insertId, (err, uncovered) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json({
                        success: false,
                        message: err.sqlMessage,
                      });
                    }

                    return res.status(200).json({
                      success: true,
                      message: "Absence Approved",
                    });
                  });
                });
              }
            } else {
              return res.status(200).json({
                success: true,
                message: "Absence registred",
              });
            }
          });
        } else {
          var multicheck = [];
          schedule.forEach((schedata) => {
            days.forEach((datedata) => {
              console.log(schedata);
              if (schedata.day.toLowerCase() == datedata.day.toLowerCase()) {
                multicheck.push(schedata);
              }
            });
          });
          if (multicheck.length == 0 && data.substitute_required == true) {
            return res.status(500).json({
              success: false,
              message:
                "No schedule is found on the selected dates and substitute_required is enabled",
            });
          } else {
            CreateAbsence(data, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }

              if (
                data.leave_type.toLowerCase() === "vab" ||
                data.leave_type.toLowerCase() === "sick"
              ) {
                console.log(schedule.length);
                if (schedule.length == 0) {
                  UpdateAbsenceStatus(results.insertId, (err, uncovered) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json({
                        success: false,
                        message: err.sqlMessage,
                      });
                    }

                    return res.status(200).json({
                      success: true,
                      message: "Absence Approved ",
                    });
                  });
                } else {
                  var uncovered = [];
                  // if (days.length > 0) {
                  schedule.forEach((s, indexs) => {
                    days.forEach((d, indexd) => {
                      console.log(s.day);
                      console.log(d);
                      if (d.day.toLowerCase() == s.day.toLowerCase()) {
                        uncovered.push([
                          d.date,
                          s.id,
                          results.insertId,
                          s.ins_id,
                          s.cus_id,
                        ]);
                      }
                    });
                  });
                  // } else {
                  //   uncovered.push([
                  //     data.from_date,
                  //     schedule[0].id,
                  //     results.insertId,
                  //     schedule[0].ins_id,
                  //     schedule[0].cus_id,
                  //   ]);
                  // }

                  CreateUncoverSchedule(uncovered, (err, uncovered) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json({
                        success: false,
                        message: err.sqlMessage,
                      });
                    }

                    UpdateAbsenceStatus(results.insertId, (err, uncovered) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({
                          success: false,
                          message: err.sqlMessage,
                        });
                      }

                      return res.status(200).json({
                        success: true,
                        message: "Absence Approved",
                      });
                    });
                  });
                }
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Absence registred",
                });
              }
            });
          }
        }
      }
    });
  },

  approve_absence: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetAbsence(data, (err, absence) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      var days = fun.DayFinder(absence.from_date, absence.to_date);

      var body = {
        unique_id: absence.unique_id,
        day: days,
        from_date: absence.from_date,
        to_date: absence.to_date,
        from_time: absence.from_time,
        to_time: absence.to_time,
      };

      GetScheduleAbsence(body, (err, schedule) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        var multicheck = [];
        schedule.forEach((schedata) => {
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          if (absence.from_date == absence.to_date) {
            const d = new Date(absence.from_date);
            let day = weekday[d.getDay()];
            console.log(day);
            if (schedata.day.toLowerCase() == day.toLowerCase()) {
              multicheck.push(schedata);
            }
          } else {
            days.forEach((datedata) => {
              console.log(
                schedata.day.toLowerCase() + "==" + datedata.day.toLowerCase()
              );
              if (schedata.day.toLowerCase() == datedata.day.toLowerCase()) {
                multicheck.push(schedata);
              }
            });
          }
        });
        console.log(multicheck.length);
        let datapayload = {
          id: absence.id,
          approved_by: data.approved_by,
          approved_by_id: data.approved_by_id,
          approved_or_denied_on: data.approved_or_denied_on,
        };
        if (multicheck.length == 0) {
          UpdateAbsenceStatus2(datapayload, (err, uncovered) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            return res.status(200).json({
              success: true,
              message: "Absence Approved ",
            });
          });
        } else {
          var uncovered = [];
          // if (days.length > 0) {
          schedule.forEach((s, indexs) => {
            days.forEach((d, indexd) => {
              if (d.day.toLowerCase() == s.day.toLowerCase()) {
                uncovered.push([d.date, s.id, absence.id, s.ins_id, s.cus_id]);
              }
            });
          });
          // } else {
          //   uncovered.push([
          //     absence.from_date,
          //     schedule[0].id,
          //     absence.id,
          //     schedule[0].ins_id,
          //     schedule[0].cus_id,
          //   ]);
          // }

          CreateUncoverSchedule(uncovered, (err, uncovered) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }
            let datapayload2 = {
              id: absence.id,
              approved_by: data.approved_by,
              approved_by_id: data.approved_by_id,
              approved_or_denied_on: data.approved_or_denied_on,
            };

            UpdateAbsenceStatus2(datapayload2, (err, uncovered) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Absence Approved",
              });
            });
          });
        }
      });
    });
  },

  create_customer: (req, res) => {
    const data = req.body;
    var pass = data.password;

    if (
      !data.first_name ||
      !data.last_name ||
      !data.title ||
      !data.title_id ||
      !data.company_name ||
      !data.organization_no ||
      !data.organization_type ||
      !data.organization_type_id ||
      !data.email_id ||
      !data.telephone_number ||
      !data.address ||
      !data.postal_code ||
      !data.area_name ||
      !data.password ||
      !data.ins_id
    ) {
      return res.status(503).json({
        success: false,
        message: "fields are missing",
      });
    }

    Validation(data, (error, validation) => {
      if (error) {
        console.log(error);
        return res.status(502).json({
          success: false,
          message: error.sqlMessage,
        });
      }

      if (validation.length != 0) {
        return res.status(501).json({
          success: false,
          message: "Email Already Present",
        });
      }

      const match = data.email_id.match(/([^@]*)@/);
      const emailhash = match[1];
      let salt = genSaltSync(10);
      data.unique_id =
        data.title.substring(0, 2) +
        emailhash +
        data.telephone_number.toString().substring(3, 4);
      console.log(data.unique_id);
      data.password = hashSync(data.password, salt);

      CreateCustomer(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(504).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        var payload = {
          id: results.insertId,
          email_id: data.email_id,
          password: pass,
        };
        var token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "60m",
        });
        console.log(token);
        var fullUrl =
          req.protocol + "://" + req.get("host") + "/verfiy/" + token;

        //${fullUrl}.

        fun.sendMail(
          data.email_id,
          "Verifiera ditt företagskonto / Verify your company account - DoHR",
          ` 
                      <p>Hej!</p>

            <p>Grattis till att du har skapat ett företagskonto för att använda DoHR-mobilappen! Detta möjliggör en smidig kontakt med era interna vikarier eller DoHR-vikarier.</p>
            
            <p>Nästa steg är att verifiera ditt företagskonto genom att klicka på länken ${fullUrl} .</p>
            
            <p>När ditt konto är verifierat kan du börja publicera lediga jobb när vikariebehov uppstår. Logga in, publicera jobb till antingen egna interna vikarier eller DoHR-vikarier.</p>
            
            <p>Vi ser fram emot att samarbeta med er!</p>
            
            
            <p>Greetings,</p>
            
            <pCongratulations on successfully creating a company account to use the DoHR mobile app! This brings you closer to seamlessly connecting with your internal pool of substitutes or leveraging DoHR substitutes.</p>
            
            <p>The next step is to verify your company account by clicking on the link above in the Swedish text. </p>
            
            <p>Once verified, you'll gain access to post job vacancies whenever substitutes are needed. Simply log in, create a vacancy, and publish it to either your internal pool or DoHR substitutes.</p>
            
            <p>As a customer, you will receive information from DoHR about new app releases, offers, and other marketing communications. You can opt out of receiving these communications at any time by unsubscribing or contacting us.</p>
            
            <p>We're excited about the opportunity to work with you!</p>
            
            
            <br>
        <p>Med vänliga hälsningar / Best wishes,</p>
        <p>DoHR (/ˈdɔr/) team</p>
        <br>
        <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
              `
        );

        return res.status(200).json({
          success: true,
          message: "Customer registered successfully",
        });
      });
    });
  },

  add_my_consultant: (req, res) => {
    const data = req.body;
    var pass = data.password;

    if (!data.cons_id || !data.unique_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ADDMyCons(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(results.stscode).json({
        success: true,
        message: results.name,
      });
    });
  },

  deny_Absence: (req, res) => {
    const data = req.body;

    if (!data.id || !data.email_id || !data.reason) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    DenyAbsence(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      fun.sendMail(data.email_id, "DOHR", data.reason);

      return res.status(200).json({
        success: true,
        message: "Absence Denied",
      });
    });
  },

  get_ins_my_consultant: (req, res) => {
    const data = req.body;
    var pass = data.password;

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyCons(data, (err, results) => {
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

  create_uncovered_vacancy: (req, res) => {
    const data = req.body;
    var schedulecheck = [];
    if (data.Vacancy.length == 0 || !data.assigned_to) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyScheduleIns(data.assigned_to, (errr, ress) => {
      if (errr) {
        console.log(errr);
        return res.status(500).json({
          success: false,
          message: errr.sqlMessage,
        });
      }

      ress.forEach((schedule, index) => {
        data.Vacancy.forEach((vac) => {
          console.log(vac);
          // console.log(schedule.day);
          //console.log(schedule.start_time);
          console.log(vac.day);
          console.log(vac.start_time);
          if (
            schedule.day.toLowerCase() == vac.day.toLowerCase() &&
            schedule.start_time == vac.start_time
          ) {
            schedulecheck.push(schedule);
          }
        });
      });
      console.log(data.Vacancy.length);

      if (schedulecheck.length == 0) {
        var insert = [];
        data.Vacancy.forEach((Data) => {
          insert.push([
            Data.position,
            Data.position_id,
            Data.v_date,
            Data.day,
            Data.start_time,
            Data.end_time,
            Data.break_time,
            Data.total_whrs,
            Data.ins_id,
            Data.uncovered_id,
            Data.other_info,
            Data.assigned_to_internal,
            Data.assigned_to_external,
            Data.absence_id,
            Data.vacancy_status,
            Data.report_start_time,
            Data.report_end_time,
            Data.report_break_time,
            Data.report_total_whours,
            Data.report_reason,
            Data.publish_to_internal,
            Data.publish_to_external,
            Data.lesson_plan_pdf,
            Data.absence_stafName,
            Data.my_consultant,
            Data.location,
            Data.is_draft,
          ]);
        });
        console.log(insert);
        CreateUncoveredVacancy(insert, (err, results) => {
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
      } else {
        return res.status(200).json({
          success: true,
          message: "the teacher already have a schedule",
          schedules: schedulecheck,
        });
      }
    });
  },

  create_uncovered_vacancy_external: (req, res) => {
    const data = req.body;
    var schedulecheck = [];

    GetMyHours(data.externalVacancy[0], (errors, hours) => {
      if (errors) {
        console.log(errors);
        return res.status(500).json({
          success: false,
          message: errors.sqlMessage,
        });
      }
      var min = 0;
      data.externalVacancy.forEach((X) => {
        console.log(fun.FindMintuesBetweenTwoTimes(X.from_time, X.to_time));
        min = min + fun.FindMintuesBetweenTwoTimes(X.from_time, X.to_time);
      });

      // let min
      console.log(min);
      if (hours.length != 0) {
        if (min > hours[0].remaining_hours) {
          return res.status(404).json({
            success: false,
            message: "please top up hours",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "hours not found please top up",
        });
      }

      if (data.externalVacancy.length == 0) {
        return res.status(500).json({
          success: false,
          message: "fields are missing",
        });
      }

      var insert = [];
      data.externalVacancy.forEach((X) => {
        insert.push([
          X.position,
          X.position_id,
          X.v_date,
          X.day,
          X.from_time,
          X.to_time,
          X.break_time,
          X.total_whrs,
          X.ins_id,
          X.uncovered_id,
          X.other_info,
          0,
          X.assigned_to_external,
          X.absence_id,
          0,
          false,
          true,
          X.isdraft,
          X.location,
          JSON.stringify(X.description),
          X.assigned_from,
          X.created_by,
          X.publish_to,
          X.publish_to_id,
          X.routine_information,
          X.lesson_plan_pdf,
          X.absence_stafName,
          X.my_consultant,
        ]);
      });

      data.externalVacancy.forEach((Data) => {});
      var insert_data = {
        a: insert,
        b: data,
      };

      CreateUncoveredVacancyExternal(insert_data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        console.log(hours[0].used_hours);
        let newdata = {
          ins_id: data.externalVacancy[0].ins_id,
          used_hours: parseInt(hours[0].used_hours) + min,
          remaining_hours: parseInt(hours[0].total_hours) - min,
          total_hours: parseInt(hours[0].total_hours),
        };
        console.log(newdata);
        TopUpMYHoursAdminUpdate(newdata, (fail, success) => {
          if (fail) {
            console.log(fail);
            return res.status(500).json({
              success: false,
              message: errors.sqlMessage,
            });
          }

          return res.status(200).json({
            success: true,
            message: "registered successfully",
          });
        });
        // return res.status(200).json({
        //   success: true,
        //   message: "registered successfully",
        // });
      });
    });
  },

  create_uncovered_vacancy_internal: (req, res) => {
    const data = req.body;
    var schedulecheck = [];
    if (data.Vacancy.length == 0 || !data.assigned_to) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    GetMyHours(data.Vacancy[0], (errors, hours) => {
      if (errors) {
        console.log(errors);
        return res.status(500).json({
          success: false,
          message: errors.sqlMessage,
        });
      }

      let min = fun.FindMintuesBetweenTwoTimes(
        data.Vacancy[0].start_time,
        data.Vacancy[0].end_time
      );
      if (hours.length != 0) {
        if (min > hours[0].remaining_hours) {
          return res.status(404).json({
            success: false,
            message: "please top up hours",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "hours not found please top up",
        });
      }
      GetMyScheduleIns(data.assigned_to, (errr, ress) => {
        if (errr) {
          console.log(errr);
          return res.status(500).json({
            success: false,
            message: errr.sqlMessage,
          });
        }

        ress.forEach((schedule, index) => {
          data.Vacancy.forEach((vac) => {
            if (
              schedule.day.toLowerCase() == vac.day.toLowerCase() &&
              schedule.start_time == vac.start_time
            ) {
              schedulecheck.push(schedule);
            }
          });
        });

        if (schedulecheck.length == 0) {
          var insert = [];
          data.Vacancy.forEach((Data) => {
            insert.push([
              Data.position,
              Data.position_id,
              Data.v_date,
              Data.day,
              Data.start_time,
              Data.end_time,
              Data.break_time,
              Data.total_whrs,
              Data.ins_id,
              Data.uncovered_id,
              Data.other_info,
              Data.assigned_to_internal,
              0o0,
              0,
              Data.publish_to_internal,
              false,
              false,
              Data.assigned_from,
              Data.created_by,
              Data.lesson_plan_pdf,
              Data.absence_stafName,
              Data.my_consultant,
              Data.location,
            ]);
          });

          CreateUncoveredVacancyInternal(insert, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }
            let newdata = {
              ins_id: data.Vacancy[0].ins_id,
              used_hours: parseInt(hours[0].used_hours) + min,
              remaining_hours: parseInt(hours[0].total_hours) - min,
              total_hours: parseInt(hours[0].total_hours),
            };
            TopUpMYHoursAdminUpdate(newdata, (fail, success) => {
              if (fail) {
                console.log(fail);
                return res.status(500).json({
                  success: false,
                  message: errors.sqlMessage,
                });
              }

              fun.sendMail(
                data.assigned_email,
                "New internal vacancy assigned",

                `<html>

        <head>
           
        </head>
        
        <body>
        
            <div>
                
                <p>Greetings!</p>
                
                <p>A new internal vacancy has been assigned to you. Please check it and take action..</p>
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
            // return res.status(200).json({
            //   success: true,
            //   message: "registered successfully",
            // });
          });
        } else {
          return res.status(500).json({
            success: true,
            message: "the teacher already have a schedule",
            schedules: schedulecheck,
          });
        }
      });
    });
  },
  create_vacancy: (req, res) => {
    const data = req.body;
    // three types==> publish_to_All //internal_staff //my_consultant

    // if (
    //   !data.position||
    //   !data.position_id||
    //   !data.v_date||
    //   !data.day||
    //   !data.start_time||
    //   !data.end_time||
    //   !data.break_time||
    //   !data.total_whrs||
    //   !data.ins_id||
    //   !data.uncovered_id||
    //   !data.other_info||
    //   !data.assigned_to_internal||
    //   !data.assigned_to_external||
    //   !data.absence_id||
    //   !data.vacancy_status||
    //   !data.report_start_time||
    //   !data.report_end_time||
    //   !data.report_break_time||
    //   !data.report_total_whours||
    //   !data.report_reason||
    //   !data.external_type

    // ) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }

    CreateVacancy(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetALLConsultant((error, cons) => {
        var notificationIds = [];
        if (data.publish_to_id == 1) {
          cons.forEach((X) => {
            notificationIds.push(X.notification_id);
          });

          if (notificationIds.length != 0 && data.is_draft == 0) {
            var message = {
              notification: {
                body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                title: "A New Message",
              },
              registration_ids: notificationIds,
            };

            fun.FCM_MESSAGE(message);
          }
        }

        if (data.publish_to_id == 2) {
          cons.forEach((X) => {
            if (X.iam_student == 1) {
              notificationIds.push(X.notification_id);
            }
          });

          if (notificationIds.length != 0 && data.is_draft == 0) {
            var message = {
              notification: {
                body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                title: "A New Message",
              },
              registration_ids: notificationIds,
            };

            fun.FCM_MESSAGE(message);
          }
        }
      });

      GetMyConsultantNotification(data, (error2, mycons) => {
        var notificationIds = [];
        if (data.publish_to_id == 3) {
          mycons.forEach((X) => {
            console.log(data.my_consultant);

            data.my_consultant.forEach((Y) => {
              console.log(Y);
              if (Y == X.cons_id) {
                console.log("in da ");
                notificationIds.push(X.notification_id);
              }
            });
          });
          console.log(notificationIds);
          if (notificationIds.length != 0 && data.is_draft == 0) {
            var message = {
              notification: {
                body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                title: "A New Message",
              },
              registration_ids: notificationIds,
            };

            fun.FCM_MESSAGE(message);
          }
        }
      });

      return res.status(200).json({
        success: true,
        message: "registered successfully",
      });
    });
  },

  create_vacancy_web: (req, res) => {
    const data = req.body;
    // three types==> publish_to_All //internal_staff //my_consultant

    // if (
    //   !data.position||
    //   !data.position_id||
    //   !data.v_date||
    //   !data.day||
    //   !data.start_time||
    //   !data.end_time||
    //   !data.break_time||
    //   !data.total_whrs||
    //   !data.ins_id||
    //   !data.uncovered_id||
    //   !data.other_info||
    //   !data.assigned_to_internal||
    //   !data.assigned_to_external||
    //   !data.absence_id||
    //   !data.vacancy_status||
    //   !data.report_start_time||
    //   !data.report_end_time||
    //   !data.report_break_time||
    //   !data.report_total_whours||
    //   !data.report_reason||
    //   !data.external_type

    // ) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }
    GetMyHours(data, (errors, hours) => {
      if (errors) {
        console.log(errors);
        return res.status(500).json({
          success: false,
          message: errors.sqlMessage,
        });
      }
      console.log(">>>>>>>>.........>>>>>>>>>>>>>>>>.");
      console.log(hours);

      let min = fun.FindMintuesBetweenTwoTimes(data.start_time, data.end_time);
      if (hours.length != 0) {
        if (min > hours[0].remaining_hours) {
          return res.status(404).json({
            success: false,
            message: "please top up hours",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "hours not found please top up",
        });
      }

      CreateVacancy(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        GetALLConsultant((error, cons) => {
          var notificationIds = [];
          if (data.publish_to_id == 1) {
            cons.forEach((X) => {
              notificationIds.push(X.notification_id);
            });

            if (notificationIds.length != 0 && data.is_draft == 0) {
              var message = {
                notification: {
                  body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                  title: "A New Message",
                },
                registration_ids: notificationIds,
              };

              fun.FCM_MESSAGE(message);
            }
          }

          if (data.publish_to_id == 2) {
            cons.forEach((X) => {
              if (X.iam_student == 1) {
                notificationIds.push(X.notification_id);
              }
            });

            if (notificationIds.length != 0 && data.is_draft == 0) {
              var message = {
                notification: {
                  body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                  title: "A New Message",
                },
                registration_ids: notificationIds,
              };

              fun.FCM_MESSAGE(message);
            }
          }
        });

        GetMyConsultantNotification(data, (error2, mycons) => {
          var notificationIds = [];
          if (data.publish_to_id == 3) {
            mycons.forEach((X) => {
              console.log(data.my_consultant);

              data.my_consultant.forEach((Y) => {
                console.log(Y);
                if (Y == X.cons_id) {
                  console.log("in da ");
                  notificationIds.push(X.notification_id);
                }
              });
            });
            console.log(notificationIds);
            if (notificationIds.length != 0 && data.is_draft == 0) {
              var message = {
                notification: {
                  body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                  title: "A New Message",
                },
                registration_ids: notificationIds,
              };

              fun.FCM_MESSAGE(message);
            }
          }
        });
        let newdata = {
          ins_id: data.ins_id,
          used_hours: parseInt(hours[0].used_hours) + min,
          remaining_hours: parseInt(hours[0].total_hours) - min,
          total_hours: parseInt(hours[0].total_hours),
        };
        console.log("-----------------------");
        console.log(newdata);
        TopUpMYHoursAdminUpdate(newdata, (fail, success) => {
          console.log(fail);
          if (fail) {
            console.log(fail);
            return res.status(500).json({
              success: false,
              message: errors.sqlMessage,
            });
          }

          return res.status(200).json({
            success: true,
            message: "registered successfully",
          });
        });
      });
    });
  },
  // newtable change
  get_covered_schedule: (req, res) => {
    const data = req.body;

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetInstituteCoveredSchedule(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      GetVacancySchedulExternal(data, (err1, external) => {
        if (err1) {
          console.log(err1);
          return res.status(500).json({
            success: false,
            message: err1.sqlMessage,
          });
        }
        GetVacancyScheduleInternal(data, (err2, internal) => {
          if (err2) {
            console.log(err2);
            return res.status(500).json({
              success: false,
              message: err2.sqlMessage,
            });
          }
          results.forEach((x) => {
            console.log(x.vacancy_status);
            x.coveredByName = null;
            x.coveredById = null;
            x.coveredByEmail = null;
            x.coveredByExternal = false;
            x.coveredByInternal = false;
            external.forEach((e) => {
              if (
                x.uncoveredId == e.uncovered_id &&
                x.vacancy_status != 0 &&
                x.publish_to_external == 1
              ) {
                x.coveredByName = `${e.first_name} ${e.last_name}`;
                x.coveredById = e.covered_person_id;
                x.coveredByEmail = e.email_id;
                x.coveredByExternal = true;
              }
            });
            internal.forEach((i) => {
              if (
                x.uncoveredId == i.uncovered_id &&
                x.vacancy_status != 0 &&
                x.publish_to_internal == 1
              ) {
                x.coveredByName = `${i.first_name} ${i.last_name}`;
                x.coveredById = i.covered_person_id;
                x.coveredByEmail = i.email_id;
                x.coveredByInternal = true;
              }
            });
          });

          return res.status(200).json({
            success: true,
            message: results,
          });
        });
      });
    });
  },

  get_draft_vacancy: (req, res) => {
    const data = req.body;
    //1==>draft 0==> published
    if (!data.unique_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetDraftAndPublishedVacany(data, (err, results) => {
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

  get_my_institute: (req, res) => {
    const data = req.body;
    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    var finalArray = [];
    GetMyInstitue(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      console.log(results);
      if (results.length == 0) {
        return res.status(500).json({
          success: false,
          message: "Institute Not Found",
        });
      }

      results.forEach((institute, index) => {
        var ins = {
          id: institute.id,
          institute_name: institute.institute_name,
          institute_id: institute.institute_id,
          address: institute.address,
          locality: institute.locality,
          postcode: institute.postcode,
          institute_type: institute.institute_type,
          institute_type_id: institute.institute_type_id,
          institute_domin: institute.institute_domin,
          contact_number: institute.contact_number,
          requirement_info: [],
        };
        finalArray.push(ins);

        if (index + 1 == results.length) {
          GetInstitueRequirement((error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                success: false,
                message: error.sqlMessage,
              });
            }

            finalArray.forEach((institutes, index) => {
              result.forEach((requirement, rindex) => {
                if (institutes.id === requirement.ins_id) {
                  finalArray[index].requirement_info.push(requirement);
                }
              });

              if (index + 1 == finalArray.length) {
                return res.status(200).json({
                  success: true,
                  message: finalArray,
                });
              }
            });
          });
        }
      });
    });
  },

  get_all_absence: (req, res) => {
    const data = req.body;

    GetAllAbsence(data, (err, results) => {
      var finalArray = [];

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      // data.status
      console.log(results.length);
      results.forEach((filter) => {
        console.log(filter.is_denied);
        if (data.is_denied == 0) {
          if (filter.is_approved == data.status) {
            finalArray.push(filter);
          }
        } else {
          if (filter.is_denied == 1) {
            finalArray.push(filter);
          }
        }
      });
      return res.status(200).json({
        success: true,
        message: finalArray,
      });
    });
  },

  get_uncovered_schedule: (req, res) => {
    const data = req.body;
    var finalArray = [];
    GetUncoveredSchedule(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      results.forEach((ResData, index) => {
        var index = finalArray
          .map(function (img) {
            return img.title;
          })
          .indexOf(ResData.first_name + "" + ResData.last_name);
        console.log(index);
        if (index == -1) {
          finalArray.push({
            title: ResData.first_name + "" + ResData.last_name,
            Data: [ResData],
          });
        } else {
          finalArray[index].Data.push(ResData);
        }
      });

      return res.status(200).json({
        success: true,
        message: finalArray,
      });
    });
  },

  get_internal_teacher: (req, res) => {
    const data = req.body;

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetInternalTeacher(data, (err, allList) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetInternalTeacherByAbscent(data, (err, workedList) => {
        var worked_List = [];
        var calculated_Time = [];
        var ALL_Data = [];
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        var currentTime = new Date();
        var month = currentTime.toISOString().slice(5, 7);
        var year = currentTime.getFullYear();
        var startdate = year + "-" + month + "-" + "01";
        var ongoingDate = currentTime.toISOString().slice(0, 10);

        var present_month_dates = fun.DateFinder(startdate, ongoingDate);

        present_month_dates.forEach((P_Date) => {
          workedList.forEach((W_Date) => {
            if (W_Date.v_date === P_Date) {
              worked_List.push(W_Date);
            }
          });
        });

        worked_List.forEach((TimeCalculation) => {
          var A_INDEX = calculated_Time.findIndex(
            (x) => x.id === TimeCalculation.assigned_to_internal
          );
          if (A_INDEX == -1) {
            var startTime = moment(
              TimeCalculation.v_date + "T" + TimeCalculation.from_time
            );
            var end = moment(
              TimeCalculation.v_date + "T" + TimeCalculation.to_time
            );

            var duration = end.diff(startTime, "hours");
            //console.log(duration);

            calculated_Time.push({
              id: TimeCalculation.assigned_to_internal,
              hours: duration,
            });
          } else {
            var startTime = moment(
              TimeCalculation.v_date + "T" + TimeCalculation.from_time
            );
            var end = moment(
              TimeCalculation.v_date + "T" + TimeCalculation.to_time
            );

            var d = end.diff(startTime, "hours");
            var A = calculated_Time[A_INDEX].hours + d;
            calculated_Time[A_INDEX].hours = Math.abs(A);
          }
        });

        allList.forEach((ALLData) => {
          ALLData.assigned_work_time = 0;
          if (ALLData.title.toLowerCase() == "teacher") {
            ALL_Data.push(ALLData);
          }

          calculated_Time.forEach((t_check) => {
            if (ALLData.id == t_check.id) {
              ALLData.assigned_work_time = t_check.hours;
            }
          });
        });
        console.log("________");
        console.log(ALL_Data.length);

        GetAbsenceStaff(data, (errrr, abstaff) => {
          if (err) {
            console.log(errrr);
            return res.status(500).json({
              success: false,
              message: errrr.sqlMessage,
            });
          }

          abstaff.forEach((v, i) => {
            let checkdate = `${v.to_date}T${v.to_time}Z`;
            //console.log(checkdate);
            let checking = fun.CheckDateisPassed(checkdate);

            if (checking == false) {
              console.log(v.unique_id);
              ALL_Data.splice(
                ALL_Data.findIndex((a) => a.unique_id === v.unique_id),
                1
              );
            }
          });
          //console.log(ALL_Data.length);

          var finalflagData = [];

          // ALL_Data.forEach((x) => {
          //   GetInternalTeacherScheduleData(x, (errrr, schedata) => {
          //     if (err) {
          //       console.log(errrr);
          //       return res.status(500).json({
          //         success: false,
          //         message: errrr.sqlMessage,
          //       });
          //     }

          //     GetInternalTeacherVacancyData(x, (errrr, vacancyData) => {
          //       if (err) {
          //         console.log(errrr);
          //         return res.status(500).json({
          //           success: false,
          //           message: errrr.sqlMessage,
          //         });
          //       }

          //       if (vacancyData.length == 0) {
          //         schedata.forEach((a) => {
          //           const date = new Date("2025-01-13");

          //           // Get the day of the week as a number (0 = Sunday, 1 = Monday, etc.)
          //           const dayNumber = date.getDay(data.date);

          //           // Array of days for mapping the number to the name
          //           const daysOfWeek = [
          //             "Sunday",
          //             "Monday",
          //             "Tuesday",
          //             "Wednesday",
          //             "Thursday",
          //             "Friday",
          //             "Saturday",
          //           ];

          //           // Return the name of the day

          //           if (data.daysOfWeek[dayNumber] == a.day) {
          //             if (
          //               fun.isTimeWithinRange(
          //                 data.from_time,
          //                 data.to_time,
          //                 a.start_time,
          //                 b.end_time
          //               )
          //             ) {
          //             } else {
          //               finalflagData.push(x);
          //             }
          //           } else {
          //             finalflagData.push(x);
          //           }
          //         });
          //       }
          //     });
          //   });
          // });
          console.log(ALL_Data.length);
          return res.status(200).json({
            success: true,
            message: ALL_Data,
          });
        });
      });
    });
  },

  get_my_consultant: (req, res) => {
    const data = req.body;

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyConsultant(data, (err, results) => {
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

  get_my_consultant_API: (req, res) => {
    const data = req.body;

    if (!data.unique_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyConsultant_API(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      results.forEach((X) => {
        X.is_selected = false;
      });

      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  get_my_customer: (req, res) => {
    const data = req.body;

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyCustomer(data, (err, results) => {
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

  get_absence_staff: (req, res) => {
    const data = req.body;
    var finalArray = [];
    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    GetAbsenceStaff(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var datetime = new Date();
      console.log(datetime.toISOString().slice(0, 10));

      results.forEach((res_data, index) => {
        finalArray.push({
          data: res_data,
          type: "Absent",
        });
      });

      return res.status(200).json({
        success: true,
        message: finalArray,
      });
    });
  },

  get_absence_count: (req, res) => {
    const data = req.body;
    var finalArray = [];
    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    GetAbsenceStaff(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var datetime = new Date();
      console.log(datetime.toISOString().slice(0, 10));

      results.forEach((res_data, index) => {
        // if (
        //   Date.parse(res_data.to_date) >=
        //   Date.parse(datetime.toISOString().slice(0, 10))
        // ) {

        // }
        var dateFrom = res_data.from_date;
        var dateTo = res_data.to_date;
        var dateCheck = data.date;
        console.log(dateFrom, dateTo);
        console.log(dateCheck);
        let notpassed = fun.checkdateisPassed(dateFrom, dateTo, dateCheck);
        console.log(notpassed);
        if (notpassed) {
          finalArray.push(res_data);
        }
      });

      return res.status(200).json({
        success: true,
        count: finalArray.length,
      });
    });
  },

  get_absence_count_graph: (req, res) => {
    const data = req.body;
    var finalArray = [];

    if (!data.ins_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetAbsenceStaffCount(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      console.log("res");
      console.log(results);
      var currentTime = new Date();
      var year = currentTime.getFullYear();

      var full_year = fun.DateFinder(year + "-01-01", year + "-12-31");

      var datetime = new Date();

      // fixed data validation by index of array(obj);
      var obj = [
        {
          //0
          name: `Leave with pay`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          //1
          name: `Sick`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },

        {
          //2
          name: `VAB`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },

        {
          //3
          name: `Vacation`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },

        {
          //4
          name: `Leave without pay`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },

        {
          //5
          name: `parental leave`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ];
      if (results.length == 0) {
        return res.status(200).json({
          success: true,
          count: obj,
        });
      }

      function _fun(index, leave_t) {
        if (leave_t.replace(/^\s+/g, "").toLowerCase() == "leave with pay") {
          finalArray.push((obj[0].data[index] += 1));
        } else if (
          leave_t.replace(/^\s+/g, "").toLowerCase() == "leave without pay"
        ) {
          console.log("in");
          finalArray.push((obj[4].data[index] += 1));
        } else if (leave_t.replace(/^\s+/g, "").toLowerCase() == "vab") {
          finalArray.push((obj[2].data[index] += 1));
        } else if (leave_t.replace(/^\s+/g, "").toLowerCase() == "vacation") {
          finalArray.push((obj[3].data[index] += 1));
        } else if (
          leave_t.replace(/^\s+/g, "").toLowerCase() == "parental leave"
        ) {
          finalArray.push((obj[5].data[index] += 1));
        } else if (leave_t.replace(/^\s+/g, "").toLowerCase() == "sick") {
          finalArray.push((obj[1].data[index] += 1));
        }
      }

      finalArray.push(obj);
      results.forEach((res_data, index) => {
        console.log(res_data.leave_type);
        if (data.date == "" || data.date == undefined || data.date == null) {
          var absence_dates = [];
          if (res_data.from_date == res_data.to_date) {
            absence_dates = [res_data.from_date];
          } else {
            absence_dates = fun.DateFinder(
              res_data.from_date,
              res_data.to_date
            );
          }

          absence_dates.forEach((AbDate) => {
            full_year.forEach((YearDates) => {
              if (AbDate === YearDates) {
                //  console.log(AbDate,YearDates);
                //  console.log(res_data.leave_type);
                var the_month = AbDate.toString()
                  .substring(5, 7)
                  .replace("0", "");

                switch (the_month) {
                  case "1":
                    _fun(0, res_data.leave_type);
                    break;
                  case "2":
                    _fun(1, res_data.leave_type);
                    break;
                  case "3":
                    _fun(2, res_data.leave_type);
                    break;
                  case "4":
                    _fun(3, res_data.leave_type);
                    break;
                  case "5":
                    _fun(4, res_data.leave_type);
                    break;
                  case "6":
                    _fun(5, res_data.leave_type);
                    break;
                  case "7":
                    _fun(6, res_data.leave_type);
                    break;
                  case "8":
                    _fun(7, res_data.leave_type);
                    break;
                  case "9":
                    _fun(8, res_data.leave_type);
                    break;
                  case "10":
                    _fun(9, res_data.leave_type);
                    break;
                  case "11":
                    _fun(10, res_data.leave_type);
                    break;
                  case "12":
                    _fun(11, res_data.leave_type);
                    break;
                }
              }
            });
          });
        } else {
          console.log("not here");

          var absence_dates = [];
          if (res_data.from_date == res_data.to_date) {
            absence_dates = [res_data.from_date];
          } else {
            absence_dates = fun.DateFinder(
              res_data.from_date,
              res_data.to_date
            );
          }
          absence_dates.forEach((AbDate) => {
            if (AbDate === data.date) {
              var the_month = AbDate.toString()
                .substring(5, 7)
                .replace("0", "");

              switch (the_month) {
                case "1":
                  _fun(0, res_data.leave_type);
                  break;
                case "2":
                  _fun(1, res_data.leave_type);
                  break;
                case "3":
                  _fun(2, res_data.leave_type);
                  break;
                case "4":
                  _fun(3, res_data.leave_type);
                  break;
                case "5":
                  _fun(4, res_data.leave_type);
                  break;
                case "6":
                  _fun(5, res_data.leave_type);
                  break;
                case "7":
                  _fun(6, res_data.leave_type);
                  break;
                case "8":
                  _fun(7, res_data.leave_type);
                  break;
                case "9":
                  _fun(8, res_data.leave_type);
                  break;
                case "10":
                  _fun(9, res_data.leave_type);
                  break;
                case "11":
                  _fun(10, res_data.leave_type);
                  break;
                case "12":
                  _fun(11, res_data.leave_type);
                  break;
              }
            }
          });
        }
        if (index + 1 == results.length) {
          return res.status(200).json({
            success: true,
            count: finalArray[0],
          });
        }
      });
    });
  },

  get_filledOrunfill_count: (req, res) => {
    const data = req.body;
    var finalArray = [];
    if (!data.ins_id || !data.status) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetFilledAndUnfilled(data, (err, results) => {
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
  get_coverOruncover_count: (req, res) => {
    const data = req.body;
    var finalArray = [];
    if (!data.ins_id || !data.status) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetCoveredAndUnCovered(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      let finalArray = [];

      results.forEach((x) => {
        let notpassed = fun.checkdateisPassed(x.v_date, x.v_date, data.date);
        if (notpassed) {
          finalArray.push(x);
        }
      });

      return res.status(200).json({
        success: true,
        count: finalArray.length,
      });
    });
  },

  get_deny_list: (req, res) => {
    const data = req.body;
    var finalArray = [];
    if (!data.vid) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetDenyList(data, (err, results) => {
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

  verify_customer: (req, res) => {
    const { token } = req.params;
    var finalArray = [];
    try {
      const verfication = jwt.verify(token, process.env.JWT_KEY);
      console.log(verfication);

      const salt = genSaltSync(10);

      const data = {
        id: verfication.id,
      };
      console.log(data);
      MakeCustomerVerfied(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        res.render("user_verfication");
        fun.sendMail(
          verfication.email_id,
          "Välkommen till DoHR / Welcome to DoHR",
          `<p>Hej!</p>

          <p>Vi är glada att kunna meddela dig att registreringen av ditt företagskonto hos oss har lyckats. För att börja använda DoHR  (/ˈdɔr/)  mobilappen för dina vikariebehov, vänligen validera ditt konto via länken i ett separat e-postmeddelande. Vi har också inkluderat dina inloggningsuppgifter för framtida referens, samt information om några viktiga funktioner i DoHR mobilappen.</p>
          
          <h4>Änvandarnamn/username: ${verfication.email_id}</h4>
          <h4>Lösenord/password:  ${verfication.password}</h4>
          
          <p>Vi har många användbara funktioner för att effektivisera publicering av nya jobb, en av dem är "Rutin information".  Du kan lägga till denna information under "Min profil" och den kommer automatiskt att visas när du skapar ett nytt jobb. Allt du behöver göra nästa gång du skapar ett jobb är att markera rutan, så kommer rutininformation att inkluderas i arbetsbeskrivningen.</p>
          
          <p>Dessutom finns det ett mer effektivt sätt att godkänna tidrapporter. Appen kommer automatiskt att godkänna tidrapporter efter 48 timmar om du var för upptagen för att göra den här uppgiften själv, vilket eliminerar behovet av pappersarbete och manuellt godkännande.</p>
          
          <p>Utöver DoHR mobilappen har vi även utvecklat en webbaserad applikation för vikarie- och frånvarohantering som ger dig ett mer effektivt sätt att hantera personalens frånvaro, publicera ett jobb med flera dagars varaktighet, samt få tillgång till olika statistik. Det ger dig flexibiliteten att lägga ut dina vikariebehov till DoHR eller helt enkelt använda plattformen med dina egna resurser. För mer information besök www.dohr.io eller kontakta oss.</p>
          
          <p>Slutligen vill vi göra dig uppmärksam på våra Vanliga frågor och Villkor och policyer, där du kan hitta de flesta av dina svar samt kopia på Villkor som du godkände när du skapade ditt företagskonto.</p>
          
          <p>DoHR-mobilappen är väldigt enkel att använda, men om du behöver en snabb handledning, skicka ett e-postmeddelande, så kontaktar vi dig för att ordna ett online-demomöte.</p>
          
          <p>Tack för ditt förtroende!</p>
          
          
          <p>Greetings,</p>
          
          <p>We are pleased to see that you have successfully registered your company account with us. As soon as your account is validated via a link supplied in a separate email, you will be able to use the DoHR mobile app to fullfill your substitute needs. Within the text in Swedish above, you will find your login information for future reference, as well as information about some of the key features of DoHR mobile app.</p>
          
          <p>We have a lot of great features to make publishing of vacancies more efficient, one of which is "Routine instructions". You can add this information under "My profile", saving you the time of having to enter it again, and it will appear automatically when you create a new vacancy. All you have to do the next time you create a vacancy is check the box, and routine information will be included in the job description.</p>
          
          <p>Furthermore, there is a more efficient way to approve timesheets. There is no need for paperwork or manual approval of timesheets because the system will approve automatically after 48 hours if you were too busy to complete this task yourself.</p>
          
          <p>In addition to the DoHR mobile app, we have also created a web-based application for our customers that allows them to access various statistics, publish a vacancy with multiple days of duration at once, or obtain an overview of their staff absences. It also offers a more efficient way to manage employee absences. It gives you the option to use the platform with your own resources or to outsource your substitute needs to DoHR. To learn more, go to www.dohr.io</p>
          
          <p>Finally, we would like to bring your attention to FAQ, and Legal where you will find the most of your answers along with a copy of the terms and conditions you accepted when creating your company account. </p>
          
          <p>The DoHR mobile app is very simple to use, but if you need a quick tutorial, send us an email, and we'll get in touch with you to arrange a convenient online demo meeting.</p>
          
          <p>Thank you for the opportunity to collaborate with you.</p>
          
          <br>
        <p>Med vänliga hälsningar / Best wishes,</p>
        <p>DoHR (/ˈdɔr/) team</p>
        <br>
        <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
          `
        );
      });
    } catch (e) {
      console.log(e);
      res.render("invaild_link");
    }
  },
  get_my_hours: (req, res) => {
    const data = req.body;
    let finalArray = [];
    GetMyHours(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      results.forEach((x) => {
        var objx = {
          id: x.id,
          total_hours: fun.convertMinutesToHours(x.total_hours),
          used_hours: fun.convertMinutesToHours(x.used_hours),
          remaining_hours: fun.convertMinutesToHours(x.remaining_hours),
          ins_id: x.ins_id,
          is_active: x.is_active,
          created_at: x.created_at,
          updated_at: x.updated_at,
        };
        finalArray.push(objx);
      });
      return res.status(200).json({
        success: true,
        message: finalArray,
      });
    });
  },

  get_request_hours: (req, res) => {
    GetMyRequestHours((err, results) => {
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

  top_up_hours_admin: (req, res) => {
    const data = req.body;
    console.log(data);
    data.total_hours =
      fun.ConverTimeString(data.total_hours) +
      fun.ConverTimeString(data.requesting_hours);
    data.remaining_hours =
      fun.ConverTimeString(data.remaining_hours) +
      fun.ConverTimeString(data.requesting_hours);

    // data.total_hours = fun.convertHoursInToMinutes(data.total_hours);
    // data.remaining_hours = fun.convertHoursInToMinutes(data.remaining_hours);
    data.used_hours = fun.ConverTimeString(data.used_hours);

    GetMyHours(data, (error, myhours) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.sqlMessage,
        });
      }
      if (data.is_processed.toString() == "2") {
        UpdateRequestMyhourState(data, (fail, output) => {
          if (fail) {
            console.log(fail);
            return res.status(500).json({
              success: false,
              message: fail,
            });
          }
          return res.status(200).json({
            success: true,
            message: "success",
          });
        });
      } else {
        //check if already present or not
        console.log("=>>>>>>>>>>>>>>>>>>>", myhours.length);
        if (myhours.length == 0) {
          TopUpMYHoursAdmin(data, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            UpdateRequestMyhourState(data, (fail, output) => {
              return res.status(200).json({
                success: true,
                message: "success",
              });
            });
          });
        } else {
          TopUpMYHoursAdminUpdate(data, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            UpdateRequestMyhourState(data, (fail, output) => {
              return res.status(200).json({
                success: true,
                message: "success",
              });
            });
          });
        }
      }
    });
  },

  top_up_my_hour: (req, res) => {
    const data = req.body;

    TopUpMYHoursRequest(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "request submitted",
      });
    });
  },
};
