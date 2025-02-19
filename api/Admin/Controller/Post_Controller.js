const {
  GetConsultantDetails,
  CreateAdmin,
  GetVacancyCanceledUserDetails,
  AdminLogin,
  CreateInstitute,
  ExpressPass,
  Validation,
  GetReservedPool,
  GetTickBoxIsPresent,
  GetTickBox,
  AddLegal,
  AddLegalDescription,
  ADDFAQ,
  ADDFAQLIST,
  Add_feedback_for_dohr,
  GetAllCons,
  AddContactUsMessage,
  GetContactUs,
  AddContactUsMaster,
  Get_contactus_master,
  GetFeedBackDohrCustomer,
  GetFeedBackDohrConsultant,
  GetContactUsCustomer,
  GetCustomerDetails,
  GetExpressPassUserDetails,
  GetCustomerDetailsVerfied,
  GetConsultantDetailsForContactUs,
  GetCustomerDetailsForContactUs,
  ValidationINS,
  GetContactUsWeb,
  Add_Advertisment,
  Get_Advertisment,
  Add_sub_email,
  EditIamConsultantDetails,
} = require("../Service/admin_post_services");
const fs = require("fs");
const path = require("path");
const {
  GetExpressPass,
  GetConsultantVacancy,
} = require("../Service/admin_get_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
var fun = require("../../functions/Basic_methods");

module.exports = {
  create_admin: (req, res) => {
    const data = req.body;
    console.log("hi");
    console.log(req.body);
    if (!data.email_id || !data.password) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    CreateAdmin(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Admin registered successfully",
      });
    });
  },

  admin_login: (req, res) => {
    const body = req.body;

    if (!body.email_id || !body.password) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AdminLogin(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      if (results.length == 0) {
        return res.status(200).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      console.log(body.password);
      console.log(results.password);

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
  add_institute: (req, res) => {
    const data = req.body;
    var pass = data.password;
    console.log(data);
    // if (
    //   !data.institute_name ||
    //   !data.institute_id ||
    //   !data.address ||
    //   !data.locality ||
    //   !data.postcode ||
    //   !data.institute_type.id ||
    //   !data.institute_type.name ||
    //   !data.institute_domin ||
    //   !data.email_id ||
    //   !data.contact_number ||
    //   !data.password
    // ) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }
    ValidationINS(data, (errorr, validation) => {
      if (errorr) {
        console.log(errorr);
        return res.status(500).json({
          success: false,
          message: errorr.sqlMessage,
        });
      }
      console.log(validation);

      if (validation.length != 0) {
        return res.status(500).json({
          success: false,
          message: "Domain Already Present",
        });
      }
      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);
      CreateInstitute(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        // fun.sendMail(
        //   data.email_id,
        //   "DOHR", "Your Credentials Email:" + data.email_id + "\n" + "Password:" + pass
        // );

        return res.status(200).json({
          success: true,
          message: "Institute Added",
        });
      });
    });
  },

  add_domain: (req, res) => {
    const data = req.body;
    var pass = data.password;
    console.log(data);
    // if (
    //   !data.institute_name ||
    //   !data.institute_id ||
    //   !data.address ||
    //   !data.locality ||
    //   !data.postcode ||
    //   !data.institute_type.id ||
    //   !data.institute_type.name ||
    //   !data.institute_domin ||
    //   !data.email_id ||
    //   !data.contact_number ||
    //   !data.password
    // ) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }
    ValidationINS(data, (errorr, validation) => {
      if (errorr) {
        console.log(errorr);
        return res.status(500).json({
          success: false,
          message: errorr.sqlMessage,
        });
      }
      console.log(validation);

      if (validation.length != 0) {
        return res.status(500).json({
          success: false,
          message: "Domain Already Present",
        });
      }
      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);
      CreateInstitute(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        // fun.sendMail(
        //   data.email_id,
        //   "DOHR", "Your Credentials Email:" + data.email_id + "\n" + "Password:" + pass
        // );

        return res.status(200).json({
          success: true,
          message: "Institute Added",
        });
      });
    });
  },

  add_express_pass: (req, res) => {
    const data = req.body;

    if (!data.date || !data.count) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ExpressPass(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetAllCons((err, cons_result) => {
        var notificationId = [];
        cons_result.forEach((X) => {
          notificationId.push(X.notification_id);
        });
        var message = {
          notification: {
            body: "Reservpoolen är nu öppen för DoHR-anställda!",
            title: "A New Message",
          },

          tokens: notificationId,
        };

        fun.Fcm_Message_Multiple(message);
      });

      return res.status(200).json({
        success: true,
        message: results,
      });
    });
  },

  add_Legal: (req, res) => {
    const data = req.body;
    if ((!data.title, !data.pdf)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    //
    const base64Data = data.pdf.replace(/^data:application\/pdf;base64,/, "");

    // Generate unique filename
    const filename = `legal_${Date.now()}.pdf`;
    const uploadPath = path.join(__dirname, "../../uploads");

    const filepath = path.join(uploadPath, filename);
    fs.writeFileSync(filepath, base64Data, "base64");

    // Add file path to data object
    data.pdf = `${filename}`;

    AddLegal(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },
  add_Contactus_Master: (req, res) => {
    const data = req.body;
    if ((!data.phone_number, !data.email_id)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddContactUsMaster(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },
  add_contactUs_message: (req, res) => {
    const data = req.body;
    console.log("cc", data);
    if (
      (!data.first_name,
      !data.last_name,
      !data.cons_id,
      !data.cus_id,
      !data.message,
      !data.email)
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    Get_contactus_master((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      // fun.sendMail(result.email_id, "DOHR", `    <h4>Name: ${data.first_name} ${data.last_name}</h4>
      // <h4>email_id: ${data.email}</h4>
      // <h4>message: ${data.message}</h4>
      // <h4>I want to know more about the DoHR web-based application: ${data.know_more == true ? "Yes" : "No"}</h4>
      // `);

      //for non registered web users
      if (data.from_web == true) {
        (data.cons_id = 0),
          (data.cus_id = 0),
          AddContactUsMessage(data, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            return res.status(200).json({
              success: true,
              message: "Added",
            });
          });
      } else {
        // for registered customer
        GetConsultantDetailsForContactUs(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
          if (results.length == 0) {
            GetCustomerDetailsForContactUs(data, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }

              if (results.length == 0) {
                return res.status(200).json({
                  success: false,
                  message: "No User Found on this email id",
                });
              } else {
                var customer = results[0];
                data.cus_id = customer.id;
                AddContactUsMessage(data, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: false,
                      message: err.sqlMessage,
                    });
                  }

                  return res.status(200).json({
                    success: true,
                    message: "Added",
                  });
                });
              }
            });
          } else {
            var consultant = results[0];
            data.cons_id = consultant.id;
            AddContactUsMessage(data, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: err.sqlMessage,
                });
              }

              return res.status(200).json({
                success: true,
                message: "Added",
              });
            });
          }
        });
      }
    });
  },

  contactUs_menu: (req, res) => {
    Get_contactus_master((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: result,
      });
    });
  },

  Get_ContactUs: (req, res) => {
    GetContactUs((err, results) => {
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

  Get_ContactUsAll: (req, res) => {
    const data = req.body;

    if (data.type == 3) {
      GetContactUsWeb((err, results) => {
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
    } else if (data.type == 1) {
      GetContactUsCustomer((err, results) => {
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
    } else {
      console.log("one");
      GetFeedBackDohrConsultant((err, results) => {
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
    }
  },

  add_legal_description: (req, res) => {
    const data = req.body;
    if (!data.description || !data.title_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddLegalDescription(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  add_faq: (req, res) => {
    const data = req.body;
    if (!data.title) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    ADDFAQ(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  add_faq_list: (req, res) => {
    const data = req.body;
    if (!data.faq_list || !data.faq_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    ADDFAQLIST(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  feedback_for_dohr: (req, res) => {
    const data = req.body;
    if (!data.dohr_service || !data.dohr_help_service) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    Add_feedback_for_dohr(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  Get_feedback_for_dohr: (req, res) => {
    GetFeedBackDohrCustomer((err, results) => {
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

  get_express_pass_api: (req, res) => {
    const data = req.body;
    if (!data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetConsultantVacancy(data, (e, vacancy) => {
      if (e) {
        console.log(e);
        return res.status(500).json({
          success: false,
          message: e.sqlMessage,
        });
      }

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
            pass_user_id: 0,
            date: data.date,
            available_count: data.count - data.filled_count,
            filled_count: data.filled_count,
            count: data.count,
            reserved_pool: false,
          });
        });

        GetReservedPool(data, (errr, rp) => {
          if (errr) {
            console.log(errr);
            return res.status(500).json({
              success: false,
              message: errr.sqlMessage,
            });
          }

          if (rp.length != 0) {
            rp.forEach((Y) => {
              Array.forEach((X, i) => {
                if (X.date == Y.date) {
                  Array[i].reserved_pool = true;
                  Array[i].pass_user_id = Y.id;
                }
              });
            });
          }

          Array.forEach((X) => {
            if (vacancy.length != 0) {
              vacancy.forEach((Y) => {
                if (Y.v_date == X.date && Y.is_canceled == 0) {
                  X.have_vacancy = true;
                } else {
                  X.have_vacancy = false;
                }
              });
            } else {
              X.have_vacancy = false;
            }
          });

          return res.status(200).json({
            success: true,
            message: Array,
          });
        });
      });
    });
  },

  get_tick_box: (req, res) => {
    const data = req.body;
    if (data.showAll == false) {
      GetTickBoxIsPresent(data, (error, response) => {
        var arr = [];
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: error.sqlMessage,
          });
        }

        GetTickBox((err, results) => {
          //console.log(response);
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
          if (response.length == 0) {
            results.forEach((A) => {
              arr.push(A);
            });
          } else {
            if (
              response[0].Routine_instructions_for_the_substitutedh_customer ==
              null
            ) {
              results.forEach((A) => {
                arr.push(A);
              });
            } else {
              results.forEach((A) => {
                arr.push(A);
              });

              arr.push({
                id: 0,
                value:
                  response[0]
                    .Routine_instructions_for_the_substitutedh_customer,
                created_at: response[0].created_at,
                updated_at: response[0].updated_at,
                is_active: 1,
                is_selected: 0,
              });

              arr.sort(
                (a, b) =>
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
              );
            }
          }

          return res.status(200).json({
            success: true,
            message: arr,
          });
        });
      });
    } else {
      GetTickBox((err, results) => {
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
    }
  },

  customer_analytics: (req, res) => {
    const data = req.body;
    GetCustomerDetails(data, (err, results) => {
      if (data.is_verfied == true) {
        data.is_verfied == 1;
      } else {
        data.is_verfied == 0;
      }

      var finalarray = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      switch (data.type) {
        case 2:
          finalarray = results.filter(function (element, index, array) {
            return (
              element.is_inactive === 0 && element.is_verfied == data.is_verfied
            );
          });
          break;

        case 3:
          finalarray = results.filter(function (element, index, array) {
            return (
              element.is_inactive === 1 && element.is_verfied == data.is_verfied
            );
          });
          break;

        default:
          finalarray = results;
      }

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },

  edit_iam_consultant: (req, res) => {
    const data = req.body;
    EditIamConsultantDetails(data, (err, results) => {
      var finalarray = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },
  consultant_analytics: (req, res) => {
    const data = req.body;
    GetConsultantDetails(data, (err, results) => {
      var finalarray = [];
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      switch (data.type) {
        case 2:
          finalarray = results.filter(function (element, index, array) {
            return (
              element.is_inactive === 0 &&
              element.is_approved == data.is_verfied
            );
          });
          break;

        case 3:
          finalarray = results.filter(function (element, index, array) {
            return (
              element.is_inactive === 1 &&
              element.is_approved == data.is_verfied &&
              element.inactive_delete === 1
            );
          });
          break;

        default:
          finalarray = results;
      }

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },

  ExpressPassUserDetails: (req, res) => {
    const data = req.body;
    GetExpressPassUserDetails(data, (err, results) => {
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
  GetVacancyCancelUserDeatils: (req, res) => {
    const data = req.body;
    GetVacancyCanceledUserDetails(data, (err, results) => {
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

  Add_advertisment: (req, res) => {
    const data = req.body;
    Add_Advertisment(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  Add_subscribe_email: (req, res) => {
    const data = req.body;
    Add_sub_email(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Added",
      });
    });
  },

  Get_advertisment: (req, res) => {
    const data = req.body;
    var finalarray = [];
    const currentDate = moment();
    Get_Advertisment(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      switch (data.type) {
        case 2:
          results.forEach((data) => {
            const targetDate = moment(data.end_date);
            console.log(targetDate);
            console.log(currentDate);
            if (
              currentDate.isBefore(targetDate) ||
              currentDate.isSame(targetDate, "day")
            ) {
              finalarray.push(data);
            }
          });
          break;

        case 3:
          results.forEach((data) => {
            const targetDate = new Date(data.end_date);
            if (currentDate.isAfter(targetDate, "day")) {
              finalarray.push(data);
              // if(currentDate.isSame){

              // }else{

              // }
            }
          });
          break;

        default:
          results.forEach((data) => {
            finalarray.push(data);
          });
      }

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },
};
