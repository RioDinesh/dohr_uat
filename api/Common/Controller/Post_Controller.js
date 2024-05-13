const {
  AddTitle,
  AddLeaveMaster,
  AddOrganizationType,
  GetAdressByPostCode,
  GetMyCompletedVacancy,
  GetMyVacancy,
  GetVacancyByDate,
  CustomerFeebBack,
  ConsultantFeebBack,
  GetRating,
  CreateChat,
  CusChat,
  ConChat,
  GetChatprofile,
  GetChat,
  GetNotificationID,
  MyProfile,
  GetMyCompletedVacancyCus,
  GetMyCompletedVacancyCons,
  GetMyCompletedVacancyCons2,
  GetConsOnlyVacancy,
  CheckConsOnlyVacancy,
  ADDTICKBOX,
  ExpressPassCancel,
  AddFeedbackCompletedVacancy,
  GetConsultantLocations,
  GetAllCustomer,
  GetCusByUniqueId,
  GetConsById,
  GetNotificationIDCus,
  GetNotificationIDCos,
  GetNotificationIDCon,
  ForgotPasswordEmailCheck,
  UpdatePassword,
  GetChatProfileById,
  GetAllVacancyByDateAndType,
  ADDPAIDSTATUS,
  GetAllVacancyByDateAndSatus,
  GetAllConsultant,
  GetMyVacancyFeedBack,
} = require("../Service/common_post_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var fun = require("../../functions/Basic_methods");
const { Validation } = require("../../Admin/Service/admin_post_services");
const crypto = require("crypto");
const socketio = require("socket.io");
module.exports = {
  add_title: (req, res) => {
    const data = req.body;
    if (!data.title) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddTitle(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Title Added",
      });
    });
  },

  add_feedback_to_completed_vacancy: (req, res) => {
    const data = req.body;
    if (
      !data.rate_your_day ||
      !data.rate_info ||
      !data.rate_sufficiency ||
      !data.id
    ) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddFeedbackCompletedVacancy(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: " Added",
      });
    });
  },

  add_leave_master: (req, res) => {
    const data = req.body;
    if (!data.leave_type || !data.description) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddLeaveMaster(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Leave Master Added",
      });
    });
  },

  add_organization_type: (req, res) => {
    const data = req.body;
    if (!data.organization_type) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddOrganizationType(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Title Organization Type",
      });
    });
  },
  get_address_by_postcode: (req, res) => {
    const data = req.body;

    if (!data.postcode) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetAdressByPostCode(data, (err, results) => {
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

  get_my_vacancy: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyVacancy(data, (err, results) => {
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

  get_my_feedback_based_on_vacancy: (req, res) => {
    const data = req.body;

    if (!data.vid) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyVacancyFeedBack(data, (err, results) => {
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
  get_my_completed_vacancy: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyCompletedVacancyCus(data, (err, cus) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      GetMyCompletedVacancyCons(data, (err, cons) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        return res.status(200).json({
          success: true,
          message: {
            Consultant: cons,
            Customer: cus,
          },
        });
      });
    });
  },

  get_my_completed_vacancy_api: (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetMyCompletedVacancyCus(data, (err, cus) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      GetMyCompletedVacancyCons2(data, (err, cons) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        return res.status(200).json({
          success: true,
          message: {
            Consultant: cons,
            Customer: cus,
          },
        });
      });
    });
  },

  get_vacancy: (req, res) => {
    const data = req.body;
    var finalarray = [];
    if (!data.date || !data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    GetConsultantLocations(data, (errr1, location) => {
      if (errr1) {
        console.log(errr1);
        return res.status(500).json({
          success: false,
          message: errr1.sqlMessage,
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

        GetVacancyByDate(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
          if (fav.length == 0) {
            return res.status(200).json({
              success: true,
              message: results,
            });
          }

          results.forEach((v1) => {
            console.log();
            // if(location[0].preferred_location_5==v1.address||location[0].preferred_location_4==v1.address||location[0].preferred_location_3==v1.address||location[0].preferred_location_2==v1.address||location[0].preferred_location_1==v1.address){
            //   finalarray.push(v1);
            // }
            finalarray.push(v1);
          });

          GetConsOnlyVacancy(data, (err, Vacancy) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: err.sqlMessage,
              });
            }

            finalarray.sort(
              (d1, d2) =>
                new Date(d1.v_date).getTime() - new Date(d2.v_date).getTime()
            );
            if (Vacancy.length == 0) {
              return res.status(200).json({
                success: true,
                message: finalarray,
              });
            }

            fav.forEach((c1) => {
              Vacancy.forEach((c2) => {
                if (c1.ins_id == c2.ins_id) {
                  var cons_id = JSON.parse(c2.my_consultant);
                  cons_id.forEach((X) => {
                    if (data.id == X) {
                      finalarray.push(c2);
                    }
                  });
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
    });
  },

  consultant_feedback: (req, res) => {
    const data = req.body;

    if (!data.feedback || !data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ConsultantFeebBack(data, (err, results) => {
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

  customer_feedback: (req, res) => {
    const data = req.body;

    if (!data.feedback || !data.cus_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    CustomerFeebBack(data, (err, results) => {
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

  get_rating: (req, res) => {
    const data = req.body;

    if (!data.type || !data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetRating(data, (err, results1) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      GetAllCustomer(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        var arr = [];
        results1.forEach((X) => {
          results.forEach((Y) => {
            if (X.created_by == Y.unique_id) {
              if (fun.IsNOtPassed30Days(X.created_at)) {
                arr.push({
                  feedback: X,
                  created_by: Y,
                });
              }
            }
          });
        });

        return res.status(200).json({
          success: true,
          message: arr,
        });
      });
    });
  },
  Create_Chat: (req, res) => {
    const data = req.body;

    if (!data.unique_id || !data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetCusByUniqueId(data, (e, cus) => {
      if (e) {
        return res.status(500).json({
          success: false,
          message: e.sqlMessage,
        });
      }
      GetConsById(data, (e1, cons) => {
        if (e1) {
          return res.status(500).json({
            success: false,
            message: e1.sqlMessage,
          });
        }
        const data1 = {
          unique_id: data.unique_id,
          cons_id: data.cons_id,
          title: data.title,
          cusdeviceId: cus.notification_id,
          vid: data.vid,
          vdate: data.vdate,
        };
        CreateChat(data1, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }

          GetChatProfileById(results, (err, chatprofile) => {
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
              chatdata: chatprofile,
            });
          });

          // return res.status(200).json({
          //   success: true,
          //   message: results,
          // });
        });
      });
    });
  },

  Get_My_chat: (req, res) => {
    const data = req.body;

    if (!data.id || !data.type) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetChatprofile(data, (err, results) => {
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

  Chat: (req, res) => {
    const data = req.body;

    if (!data.chat_id || !data.type || !data.message) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    if (data.type == 1) {
      GetNotificationIDCon(data, (err, notifcation) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        console.log(notifcation);
        var message = {
          notification: {
            body: "Det finns ett nytt meddelande i din Chatt!",
            title: "A New Message",
          },
          to: notifcation.notification_id,
        };

        fun.FCM_MESSAGE(message);

        CusChat(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }

          return res.status(200).json({
            success: true,
            message: "Posted",
          });
        });
      });
    } else if (data.type == 2) {
      GetNotificationIDCus(data, (err, notifcation) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }
        var message = {
          notification: {
            body: "Det finns ett nytt meddelande i din Chatt!",
            title: "A New Message",
          },
          to: notifcation.notification_id,
        };

        fun.FCM_MESSAGE(message);

        ConChat(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }

          return res.status(200).json({
            success: true,
            message: "Posted",
          });
        });
      });
    }
  },

  Get_Chat: (req, res) => {
    const data = req.body;

    if (!data.chat_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetChat(data, (err, results) => {
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

  MyPofile: (req, res) => {
    const data = req.body;

    if (!data.id || !data.type) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    //type==1==>customer
    //type==2==>consultant
    //type==3==>institute
    MyProfile(data, (err, results) => {
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

  Forgot_Password: (req, res) => {
    const data = req.body;

    if (!data.chat_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    GetChat(data, (err, results) => {
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

  Validation: (req, res) => {
    const data = req.body;

    if (!data.email_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    Validation(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: results.length == 0 ? true : false,
      });
    });
  },
  Tick_Box: (req, res) => {
    const data = req.body;

    if (!data.value) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ADDTICKBOX(data, (err, results) => {
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

  Cancel_express_pass_api: (req, res) => {
    console.log("in-------------------------------------");
    const data = req.body;
    if (!data.id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    ExpressPassCancel(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Canceled",
      });
    });
  },

  Forgot_Password_ALL: (req, res) => {
    const data = req.body;
    if (!data.email_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ForgotPasswordEmailCheck(data, (err, results) => {
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
          message: "No Email Id Present",
        });
      } else {
        var payload = {
          email: data.email_id,
          type: results.type,
        };
        var token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "15m",
        });
        console.log(token);
        var fullUrl =
          req.protocol +
          "://" +
          req.get("host") +
          "/Forgot_Password_view/" +
          token;
        fun.sendMail(
          data.email_id,
          "Återställ ditt lösenord / Reset your password - DoHR app",
          `<h4>Hej!</h4>

          <p>Vi har tagit emot din begäran om att återställa ditt DoHR mobilapp lösenord.</p>
          
          <p>För att återställa ditt lösenord, klicka på länken:${fullUrl}</p>
          
          <p>Giltigheten för denna länk är begränsad till bara 15 minuter, så se till att begära en ny länk om det behövs.</p>
          
          <p>Vänligen bortse från det här e-postmeddelandet om du inte nyligen har försökt återställa ditt lösenord. Ditt lösenord kommer inte att ändras om du inte väljer ett nytt.</p>
          
          
          <h4>Greetings!</h4>
          
          <p>Your request to reset the password for the DoHR mobile app has been received.</p>
          
          <p>Please use the link in the Swedish text above to reset your password. The validity of this link is limited to just 15 minutes, so be sure to request a new link if needed.</p>
          
          <p>If you haven't recently attempted to reset your password, you can safely disregard this email. Your password will not change unless you choose a new one.</p>
          
          <br>
          <p>Med vänliga hälsningar / Best wishes,</p>
          <p>DoHR (/ˈdɔr/) team</p>
          <br>
          <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
        `
        );

        // ${fullUrl}
        return res.status(200).json({
          success: true,
          message: fullUrl,
        });
      }
    });
  },
  Forgot_Password_View: (req, res) => {
    const { token } = req.params;

    try {
      const verfication = jwt.verify(token, process.env.JWT_KEY);

      res.render("forgot_password");
    } catch (e) {
      s.render("forgot_password_failed");
    }
  },
  Forgot_Password_View_2: (req, res) => {
    const data = req.body;
    const { token } = req.params;

    console.log(req.body);
    console.log("password");

    try {
      const verfication = jwt.verify(token, process.env.JWT_KEY);

      const salt = genSaltSync(10);
      data.password = hashSync(data.password, salt);
      const data1 = {
        email_id: verfication.email,
        password: data.password,
        type: verfication.type,
      };

      UpdatePassword(data1, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        res.render("forgot_password_changed");
      });
    } catch (e) {
      res.render("forgot_password_failed");
    }
  },

  Get_Vacancy_by_Date_All_type: (req, res) => {
    const data = req.body;
    var finalarray = [];

    // if (!data.type) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "fields are missing",
    //   });
    // }

    GetAllVacancyByDateAndType(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      //vacancy_status
      if (data.get_all == false) {
        switch (data.type) {
          case 0:
            finalarray = results.filter(function (element, index, array) {
              return (
                element.vacancy_status === data.type &&
                element.v_date === data.date
              );
            });
            break;

          case 1:
            finalarray = results.filter(function (element, index, array) {
              return (
                element.vacancy_status === data.type &&
                element.v_date === data.date
              );
            });
            break;

          case 2:
            finalarray = results.filter(function (element, index, array) {
              return (
                element.vacancy_status === data.type &&
                element.v_date === data.date
              );
            });
            break;

          default:
            finalarray = results.filter(function (element, index, array) {
              return element.v_date === data.date;
            });
          // finalarray=results;
        }
      } else {
        results.forEach((x) => {
          console.log(x.vacancy_status);
        });
        switch (data.type) {
          case 0:
            finalarray = results.filter(function (element, index, array) {
              return element.vacancy_status === data.type;
            });
            break;

          case 1:
            finalarray = results.filter(function (element, index, array) {
              return element.vacancy_status === data.type;
            });
            break;

          case 2:
            finalarray = results.filter(function (element, index, array) {
              return element.vacancy_status === data.type;
            });
            break;

          default:
            finalarray = results;
        }
      }

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },

  Get_Vacancy_by_Paid_Status: (req, res) => {
    const data = req.body;
    var finalarray = [];
    GetAllVacancyByDateAndSatus(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      finalarray = results.filter(function (element, index, array) {
        return element.is_paid === data.is_paid;
      });
      //vacancy_status

      return res.status(200).json({
        success: true,
        message: finalarray,
      });
    });
  },

  Add_Paid_Status: (req, res) => {
    const data = req.body;
    ADDPAIDSTATUS(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      var message = {
        notification: {
          body: "Vi vill tacka dig för ditt arbete. Det är nu betalt.",
          title: "A New Message",
        },

        to: data.notificationId,
      };
      fun.FCM_MESSAGE(message);

      return res.status(200).json({
        success: true,
        message: "Paid",
      });
    });
  },

  Send_Notification_Manual: (req, res) => {
    const data = req.body;
    if (!data.title || !data.message) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    GetAllCustomer(data, (err, customer) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      GetAllConsultant(data, (err, consultant) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage,
          });
        }

        var ids = [];
        if (data.all == true) {
          customer.forEach((X) => {
            if (X.notification_id != "NA" && X.notification_id != null) {
              ids.push(X.notification_id);
            }
          });

          consultant.forEach((Y) => {
            if (Y.notification_id != "NA" && Y.notification_id != null) {
              ids.push(Y.notification_id);
            }
          });
        } else if (data.only_consultant == true) {
          consultant.forEach((X) => {
            if (X.notification_id != "NA" && X.notification_id != null) {
              ids.push(X.notification_id);
            }
          });
        } else {
          customer.forEach((X) => {
            if (X.notification_id != "NA" && X.notification_id != null) {
              ids.push(X.notification_id);
            }
          });
        }
        console.log(ids);
        if (ids.length != 0) {
          var message = {
            notification: {
              body: data.message,
              title: data.title,
            },

            registration_ids: ids,
          };

          fun.FCM_MESSAGE(message);

          return res.status(200).json({
            success: true,
            message: "Done",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Failed",
          });
        }
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Paid",
      // });
    });
  },
};
