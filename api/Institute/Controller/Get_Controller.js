const {
  GetInstitue,

  GetCompletedVacancy,
  GetPublishedVacancy,
  GetAllVacancy,
  GetVacancyDates,
  GetInstitueRequirement,
  CheckUserPass,
  CheckConsOnlyVacancy,
  GetConsOnlyVacancy,
  GetAllVacancyCustomer,
  CheckAppoinment,
  GetVacancyDatesCustomer,
  Get_Consultant,
  GetCreatedByVacancyCustomer,
} = require("../Service/ins__get_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var moment = require("moment"); // require

module.exports = {
  get_institute: (req, res) => {
    var finalArray = [];
    GetInstitue((err, results) => {
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
          message: [],
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

  get_TimeZone: (req, res) => {
    const CT = moment().add(0, "hours").format();
    const cdt = CT.substring(0, 19);
    const currentTime = new Date(cdt + "Z");
    return res.status(200).json({
      success: true,
      message: currentTime,
    });
  },

  get_completed_vacancy: (req, res) => {
    const data = req.body;
    GetCompletedVacancy((err, results) => {
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

  get_publish_vacancy: (req, res) => {
    const data = req.body;
    GetPublishedVacancy((err, results) => {
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

  get_All_vacancy: (req, res) => {
    const data = req.body;
    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CheckConsOnlyVacancy(data, (err1, fav) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({
          success: false,
          message: err1.sqlMessage,
        });
      }

      GetAllVacancy((err2, results) => {
        var finalarray = [];
        if (err2) {
          console.log(err2);
          return res.status(500).json({
            success: false,
            message: err2.sqlMessage,
          });
        }

        if (fav.length == 0) {
          return res.status(200).json({
            success: true,
            message: results,
          });
        }

        results.forEach((v1) => {
          finalarray.push(v1);
        });

        GetConsOnlyVacancy((err, Vacancy) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }

          if (Vacancy.length == 0) {
            return res.status(200).json({
              success: true,
              message: finalarray,
            });
          }

          fav.forEach((c1) => {
            Vacancy.forEach((c2) => {
              if (c1.ins_id == c2.ins_id) {
                finalarray.push(c2);
              }
            });
          });
          finalarray.sort(
            (d1, d2) =>
              new Date(d1.v_date).getTime() - new Date(d2.v_date).getTime()
          );

          return res.status(200).json({
            success: true,
            message: finalarray,
          });
        });
      });
    });
  },

  get_All_vacancy_cus: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetAllVacancyCustomer(data, (err1, result) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({
          success: false,
          message: err1.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },

  get_createdBy_vacancy: (req, res) => {
    const data = req.body;

    GetCreatedByVacancyCustomer(data, (err1, result) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({
          success: false,
          message: err1.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },

  get_vacancy_dates: (req, res) => {
    const data = req.body;

    if (!data.date || !data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    CheckUserPass(data, (err, pass) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      CheckConsOnlyVacancy(data, (err1, fav) => {
        if (err1) {
          console.log(err1);
          return res.status(500).json({
            success: false,
            message: err1.sqlMessage,
          });
        }

        GetAllVacancy((err2, results) => {
          var finalarray = [];
          if (err2) {
            console.log(err2);
            return res.status(500).json({
              success: false,
              message: err2.sqlMessage,
            });
          }

          Get_Consultant(data, (conserror, conss) => {
            if (conserror) {
              console.log(conserror);
              return res.status(500).json({
                success: false,
                message: conserror.sqlMessage,
              });
            }

            if (conss.length != 0) {
              const iam_teach_student = conss[0].iam_student;

              results.forEach((v1) => {
                if (iam_teach_student == 1) {
                  console.log("in herer");
                  if (v1.publish_to_id == 2 || v1.publish_to_id == 1) {
                    finalarray.push(v1);
                  }
                }

                if (iam_teach_student == 0) {
                  if (v1.publish_to_id == 1) {
                    finalarray.push(v1);
                  }
                }
              });
            }

            GetConsOnlyVacancy(data, (err, Vacancy) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }

              fav.forEach((c1) => {
                Vacancy.forEach((c2) => {
                  if (c1.ins_id == c2.created_by) {
                    var list =
                      c2.my_consultant != null && c2.my_consultant != ""
                        ? JSON.parse(c2.my_consultant)
                        : [];

                    if (list.length != 0) {
                      list.forEach((X) => {
                        if (X == data.id) {
                          finalarray.push(c2);
                        }
                      });
                    }
                  }
                });
              });

              var arr = [];
              var datetime = new Date();
              var date = datetime.toISOString().slice(0, 10);

              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }
              //console.log(finalarray);
              for (i = 0; i < finalarray.length; i++) {
                if (Date(date) <= Date(finalarray[i].v_date)) {
                  if (arr.length != 0) {
                    var is_present = arr.find(
                      (x) => x.date === finalarray[i].v_date
                    );
                  }
                  console.log(is_present);

                  if (is_present && arr.length != 0) {
                  } else {
                    if (
                      finalarray[i].assigned_to_external == null ||
                      finalarray[i].assigned_to_external == undefined ||
                      finalarray[i].assigned_to_external == "" ||
                      finalarray[i].assigned_to_external == 0 ||
                      finalarray[i].assigned_to_external == data.id
                    ) {
                      if (
                        finalarray[i].vacancy_status == 0 ||
                        finalarray[i].vacancy_status == 1
                      ) {
                        if (finalarray[i].is_canceled == 0) {
                          arr.push({
                            date: finalarray[i].v_date.toString().slice(0, 10),
                            have_appointment: false,
                          });
                        }
                      }
                    }
                  }
                }
              }

              CheckAppoinment(data, (aerr, appo) => {
                if (aerr) {
                  console.log(aerr);
                  return res.status(500).json({
                    success: false,
                    message: aerr.sqlMessage,
                  });
                }

                var have_appo = [];
                var date = new Date();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                var current_m_y = year + "-" + month;
                // console.log(arr);
                // console.log('------------------------------------------------')
                // console.log(appo);
                if (appo.length != 0) {
                  appo.forEach((X) => {
                    arr.forEach((Y, i) => {
                      console.log(X.vacancy_status);
                      if (
                        Y.date == X.v_date &&
                        X.is_canceled == 0 &&
                        X.vacancy_status != 0
                      ) {
                        arr[i].have_appointment = true;
                      }
                    });
                  });
                }

                //check user has pass on vacancy dates
                arr.forEach((X) => {
                  if (pass.length != 0) {
                    pass.forEach((Y) => {
                      if (X.date == Y.date) {
                        X.have_reserve_pool = true;
                      } else {
                        X.have_reserve_pool = false;
                      }
                    });
                  } else {
                    X.have_reserve_pool = false;
                  }
                });

                return res.status(200).json({
                  success: true,
                  message: arr,
                });
              });
            });
          });
        });
      });
    });
  },

  get_vacancy_dates_Customer: (req, res) => {
    const data = req.body;

    GetVacancyDatesCustomer(data, (err1, result) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({
          success: false,
          message: err1.sqlMessage,
        });
      }
      var arr = [];
      result.forEach((X) => {
        arr.push({
          date: X.v_date,
        });
      });
      return res.status(200).json({
        success: true,
        message: arr,
      });
    });
  },
};
