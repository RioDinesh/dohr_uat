const {
  getvacancydata,
  updatevacancy,
  getvacancydata20,
  updatevacancy20,
  not_approved,
  MakeApprove,
  GetCustomer,
  getUnfilledvacancydata,
  GetALLConsultant,
  getfilledvacancydata,
  getvacancynotfilled,
  updatevacancyisExpried,
  getfilledExpressPass,
  getVacancyfilled,
  getUnfilledpooldata,
} = require("../services/Cron_Services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var moment = require("moment"); // require
moment().toISOString();
function float2int(value) {
  return value | 0;
}

var fun = require("../../functions/Basic_methods");
const {
  GetMyConsultantNotification,
} = require("../../Institute/Service/ins_post_services");
module.exports = {
  publish_to_all30: (req, res) => {
    getvacancydata((err, results) => {
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
      var cus_ids = [];
      var ids = [];
      results.forEach((X) => {
        const startTime = new Date(X.created_at);
        const CT = moment().format();
        const cdt = CT.substring(0, 19);
        const currentTime = new Date(cdt + "Z");
        const diffInMinutes = Math.floor(
          (currentTime - startTime) / (1000 * 60)
        );
        console.log(`Minutes passed since ${startTime}: ${diffInMinutes}`);

        if (diffInMinutes >= 30) {
          ids.push(X.id);
          cus_ids.push(X.created_by);
        }
      });

      GetCustomer(cus_ids.toString(), (errorcus, rescus) => {
        if (errorcus) {
          console.log(errorcus);
          return {
            success: false,
            message: errorcus.sqlMessage,
          };
        }
        var notificationIds = [];
        rescus.forEach((X) => {
          if (X.notification_id != null && X.notification_id != "") {
            if (notificationIds.indexOf(X.notification_id) == -1) {
              notificationIds.push(X.notification_id);
            }
          }
        });

        if (notificationIds.length != 0) {
          var message = {
            notification: {
              body: `Jobbet du har publicerat för "lärarstudenter" är nu öppet för alla vikarier.`,
              title: "A New Message",
            },

            tokens: notificationIds,
          };

          fun.Fcm_Message_Multiple(message);
        }

        if (ids.length != 0) {
          updatevacancy(ids, (error, response) => {
            if (error) {
              console.log(error);
              return {
                success: false,
                message: error.sqlMessage,
              };
            }

            GetALLConsultant((errror, conss) => {
              var NIds = [];

              conss.forEach((X) => {
                NIds.push(X.notification_id);
              });
              if (NIds.length != 0) {
                var message = {
                  notification: {
                    body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                    title: "A New Message",
                  },

                  tokens: NIds,
                };

                fun.Fcm_Message_Multiple(message);
              }
            });

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
    });
  },

  publish_to_all_20min: (req, res) => {
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
      var cus_ids = [];

      results.forEach((X) => {
        const startTime = new Date(X.created_at);
        const CT = moment().format();
        const cdt = CT.substring(0, 19);
        const currentTime = new Date(cdt + "Z");
        const diffInMinutes = Math.floor(
          (currentTime - startTime) / (1000 * 60)
        );

        if (diffInMinutes >= 20) {
          ids.push(X.id);
          //getting ids of customer

          cus_ids.push(X.created_by);
        }
      });

      GetCustomer(cus_ids.toString(), (errorcus, rescus) => {
        if (errorcus) {
          console.log(errorcus);
          return {
            success: false,
            message: errorcus.sqlMessage,
          };
        }
        var notificationIds = [];
        rescus.forEach((X) => {
          if (X.notification_id != null && X.notification_id != "") {
            if (notificationIds.indexOf(X.notification_id) == -1) {
              notificationIds.push(X.notification_id);
            }
          }
        });

        if (notificationIds.length != 0) {
          var message = {
            notification: {
              body: `Jobbet du har publicerat för "Mina vikarier" är nu öppet för alla vikarier.`,
              title: "A New Message",
            },

            tokens: notificationIds,
          };

          fun.Fcm_Message_Multiple(message);
        }

        if (ids.length != 0) {
          updatevacancy20(ids, (error, response) => {
            if (error) {
              console.log(error);
              return {
                success: false,
                message: error.sqlMessage,
              };
            }
            GetALLConsultant((errror, conss) => {
              var NIds = [];

              conss.forEach((X) => {
                NIds.push(X.notification_id);
              });
              if (NIds.length != 0) {
                var message = {
                  notification: {
                    body: `Ett nytt jobb är tillgängligt för dig att acceptera. Tryck på "Hem"-ikonen för att se alla tillgängliga jobb.`,
                    title: "A New Message",
                  },

                  tokens: NIds,
                };

                fun.Fcm_Message_Multiple(message);
              }
            });
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
    });
  },

  hr_48_rule: (req, res) => {
    not_approved((err, results) => {
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
      var cus_ids = [];
      results.forEach((X) => {
        const startTime = new Date(X.updated_at);
        const CT = moment().add(0, "hours").format();
        const cdt = CT.substring(0, 19);
        console.log(startTime);
        const currentTime = new Date(cdt + "Z");
        console.log(currentTime);
        const diffInHours = Math.floor(
          (currentTime - startTime) / (1000 * 60 * 60)
        );
        console.log("the 48 hr", diffInHours);
        if (diffInHours >= 48) {
          ids.push(X.id);
          cus_ids.push(X.created_by);
        }
      });

      if (ids.length != 0) {
        GetCustomer(cus_ids, (error, rescus) => {
          if (error) {
            console.log(error);
            return {
              success: false,
              message: error.sqlMessage,
            };
          }

          MakeApprove(ids, (error, response) => {
            if (error) {
              console.log(error);
              return {
                success: false,
                message: error.sqlMessage,
              };
            }
            var notificationIds = [];
            rescus.forEach((X) => {
              if (X.notification_id != null && X.notification_id != "") {
                if (notificationIds.indexOf(X.notification_id) == -1) {
                  notificationIds.push(X.notification_id);
                }
              }
            });

            if (notificationIds.length != 0) {
              var message = {
                notification: {
                  body: "De timmar som rapporterats för ett slutfört jobb godkänns nu automatiskt.",
                  title: "A New Message",
                },

                tokens: notificationIds,
              };

              fun.Fcm_Message_Multiple(message);
            }

            return {
              success: true,
              message: "Updated",
            };
          });
        });
      } else {
        return {
          success: true,
          message: "NONE",
        };
      }
    });
  },

  notification_10min: (req, res) => {
    getUnfilledvacancydata((err, results) => {
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
      } else {
        GetALLConsultant((errorcus, cons) => {
          if (errorcus) {
            console.log(errorcus);
            return {
              success: false,
              message: errorcus.sqlMessage,
            };
          }
          const notificationIds = [];
          results.forEach((V) => {
            if (V.publish_to_id == 1) {
              cons.forEach((X) => {
                if (notificationIds.indexOf(X.notification_id) == -1) {
                  notificationIds.push(X.notification_id);
                }
              });
            }

            if (V.publish_to_id == 2) {
              cons.forEach((X) => {
                if (X.iam_student == 1) {
                  if (notificationIds.indexOf(X.notification_id) == -1) {
                    notificationIds.push(X.notification_id);
                  }
                }
              });
            }

            if (V.publish_to_id == 3) {
              cons.forEach((X) => {
                if (V.my_consultant.length != 0) {
                  for (let i = 0; i < V.my_consultant; i++) {
                    if (V.my_consultant[i] == X.cons_id) {
                      if (notificationIds.indexOf(X.notification_id) == -1) {
                        notificationIds.push(X.notification_id);
                      }
                    }
                  }
                }
              });
            }
          });

          if (notificationIds.length != 0) {
            var message = {
              notification: {
                body: "Våra jobb väntar på dig! Var först att acceptera!",
                title: "A New Message",
              },
              tokens: notificationIds,
            };

            fun.Fcm_Message_Multiple(message);
          }
        });
      }
    });
  },

  notification_24hr_vacancy: (req, res) => {
    getfilledvacancydata((err, results) => {
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
      } else {
        var notificationIds = [];
        results.forEach((X) => {
          const startTime = new Date(X.v_date + "T" + X.from_time + ".000Z");
          const CT = moment().add(0, "hours").format();
          const cdt = CT.substring(0, 19);
          const currentTime = new Date(cdt + "Z");

          const diffInMinutes = Math.floor(
            (currentTime - startTime) / (1000 * 60)
          );
          console.log(currentTime);
          console.log("timeof the 24 is", diffInMinutes);

          if (diffInMinutes == -1440) {
            if (X.notification_id != null && X.notification_id != "") {
              if (notificationIds.indexOf(X.notification_id) != -1) {
              } else {
                notificationIds.push(X.notification_id);
              }
            }
          }
        });

        if (notificationIds.length != 0) {
          var message = {
            notification: {
              body: "Hej, kom ihåg att du har ett jobb planerat imorgon! För att vara mer förberedd, se våra tips under vanliga frågor.",
              title: "A New Message",
            },

            tokens: notificationIds,
          };

          fun.Fcm_Message_Multiple(message);
        }

        return {
          success: true,
          message: "done",
        };
      }
    });
  },

  notification_24hr_UnfilledReservePool: (req, res) => {
    GetALLConsultant((err, cons) => {
      if (err) {
        console.log(err);
        return {
          success: false,
          message: err.sqlMessage,
        };
      }

      getUnfilledpooldata((err, results) => {
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
        } else {
          var have_pools = [];
          var notificationIds = [];
          cons.forEach((X) => {
            notificationIds.push(X.notification_id);
          });

          results.forEach((X) => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const targetDate = new Date(X.date);

            // Compare the dates
            if (tomorrow.toDateString() === targetDate.toDateString()) {
              const now = new Date();

              const hour = now.getHours();
              const minutes = now.getMinutes();
              if (hour == 16 && minutes == 1) {
                have_pools.push(1);
              }
            }
          });

          if (have_pools.length != 0) {
            var message = {
              notification: {
                body: "Reservpoolen är fortfarande öppen för DoHR-anställda! För mer information, se Reservpoolen.",
                title: "A New Message",
              },

              tokens: notificationIds,
            };

            fun.Fcm_Message_Multiple(message);
          }

          return {
            success: true,
            message: "done",
          };
        }
      });
    });
  },

  notification_24hr_ExpressPass: (req, res) => {
    getfilledExpressPass((err, results) => {
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
      } else {
        var notificationIds = [];
        results.forEach((X) => {
          // var today= new Date();
          // var today_time=today.toISOString().substring(11,19);
          // const startTime = new Date(X.date+'T'+today_time+".000Z");
          // const CT = moment().add(2, 'hours').format();
          // const cdt=CT.substring(0,19);
          // const currentTime= new Date(cdt+"Z");
          // const diffInMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);

          const targetDate = new Date(X.date);
          console.log(targetDate);
          // Compare the dates
          console.log(tomorrow.toDateString());
          console.log(targetDate.toDateString());
          if (tomorrow.toDateString() === targetDate.toDateString()) {
            const now = new Date();

            const hour = now.getHours();
            const minutes = now.getMinutes();
            console.log("minnn", hour);
            console.log("minnn", minutes);
            if (hour == 14 && minutes == 1) {
              if (X.notification_id != null && X.notification_id != "") {
                if (notificationIds.indexOf(X.notification_id) != -1) {
                } else {
                  notificationIds.push(X.notification_id);
                }
              }
            }
          } else {
          }
        });
        console.log(notificationIds);
        if (notificationIds.length != 0) {
          var message = {
            notification: {
              body: `Kom ihåg! Imorgon är du "reservvikarie".`,
              title: "A New Message",
            },

            tokens: notificationIds,
          };

          fun.Fcm_Message_Multiple(message);
        }

        return {
          success: true,
          message: "done",
        };
      }
    });
  },

  Expire_Vacancy_after_60min: (req, res) => {
    getvacancynotfilled((err, results) => {
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

      // check the vacancy is today
      var ids = [];
      var notificationIds = [];
      const arrayUsersMail = [];
      results.forEach((X) => {
        const startTime = new Date(X.v_date + "T" + X.from_time + ".000Z");
        const CT = moment().add(0, "hours").format();
        const cdt = CT.substring(0, 19);
        const currentTime = new Date(cdt + "Z");
        const diffInMinutes = Math.floor(
          (currentTime - startTime) / (1000 * 60)
        );

        if (diffInMinutes >= 60) {
          ids.push(X.id);
          if (notificationIds.indexOf(X.notification_id) != -1) {
          } else {
            notificationIds.push(X.notification_id);
          }

          if (arrayUsersMail.indexOf(X.email_id) == -1) {
            arrayUsersMail.push(X.email_id);
          }
        }
      });

      //send notification
      if (notificationIds.length != 0) {
        var message = {
          notification: {
            body: "Ditt otillsatta jobb har tagits bort.",
            title: "A New Message",
          },

          tokens: notificationIds,
        };

        fun.Fcm_Message_Multiple(message);
      }
      //send mail

      //  if(arrayUsersMail.length!=0){
      //   const stringUsersMail = arrayUsersMail.join(', ')
      //   fun.sendMail(stringUsersMail,"DOHR",
      //   `subject text: Published vacancy remains unfilled!

      //   Dear Customer

      //   We regret to inform you that despite our best efforts, your published vacancy still remains unfilled for today.

      //   We wish to reassure you that our priority will always be serving the needs of our customers. We sincerely apologize for any inconvenience this may have caused and would like to extend to you a 7% discount on your subsequent reservation of maximum 8 hours, in accordance with the terms and conditions of your contract.

      //   Thank you for your understanding.

      //   Your sincerely,
      //   DoHR (/ˈdɔr/) support team

      //    ---------------------------------------------------------------------------
      //   Please feel free to contact us with any questions you may have.
      //   We are available to help you M-F (06:00-16:00)
      //   Telephone: (insert a contact number)
      //   Email: (insert email adress)
      //   www.dohr.io`)
      //  }

      if (ids.length != 0) {
        updatevacancyisExpried(ids, (error, response) => {
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

  Notify_Vacancy_before_60min: (req, res) => {
    getvacancynotfilled((err, results) => {
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

      // check the vacancy is today
      var ids = [];
      var notificationIds = [];
      const arrayUsersMail = [];

      results.forEach((X) => {
        const date = new Date();
        var today = date.toISOString().substring(0, 10);
        const startTime = new Date(X.v_date + "T" + X.from_time + ".000Z");

        const CT = moment().add(0, "hours").format();

        const cdt = CT.substring(0, 19);
        const currentTime = new Date(cdt + "Z");

        const diffInMinutes = Math.floor(
          (currentTime - startTime) / (1000 * 60)
        );

        if (X.v_date == today) {
          if (diffInMinutes == -60) {
            if (notificationIds.indexOf(X.notification_id) != -1) {
              console.log(notificationIds);
            } else {
              notificationIds.push(X.notification_id);
            }

            if (arrayUsersMail.indexOf(X.email_id) == -1) {
              arrayUsersMail.push(X.email_id);
            }
          }
        }
      });

      if (notificationIds.length != 0) {
        //   fun.sendMail("riodinesh7@gmail.com","Text")

        var message = {
          notification: {
            body: "Ditt publicerade jobb är fortfarande otillsatt. Vi aktivt skickar ut push-notiser till vikarier.",
            title: "A New Message",
          },

          tokens: notificationIds,
        };

        fun.Fcm_Message_Multiple(message);
      }

      if (arrayUsersMail.length != 0) {
        arrayUsersMail.forEach((mail) => {
          fun.sendMail(
            mail,
            "Ditt publicerade jobb är ej tillsatt! / Published vacancy remains unfilled!",
            `
         
<P>Detta är en uppdatering av ditt otillsatta publicerade jobb, som börjar om 60 minuter från att du har fått detta meddelande.</p>

<p>Om mot all förmodan ditt publicerade jobb förblir otillsatt efter angiven starttid, kommer det att vara fortsatt publicerad i ytterligare 60 minuter. Under denna 60-minutersperiod har du möjlighet att utföra något av följande:</p>

<p>1) Du kan ta bort det otillsatta jobbet när som helst under denna period.<br>
2) Du kan välja hur länge du vill fortsätta att publicera jobbet, beroende på hur stor flexibilitet tidsmässigt du kan ge en vikarie att acceptera och komma till jobbet.<br> 
3) Du kan välja att inte göra något, och jobbet kommer att tas bort automatiskt 60 minuter efter den angivna starttiden. Observera att under denna förlängda perioden har en vikarie fortfarande möjlighet att acceptera jobbet.</p>

<p>Tveka inte att kontakta oss vid frågor.</p>

<p>Dear Customer,</p>

<p>This is an update on the status of your unfilled vacancy, which begins in 60 minutes from the time you receive this email.</p>

<p>If your vacancy remains unfilled after the stated start time, it will be kept open for an additional 60 minutes. During this 60 minutes period, you can make any of the following changes:</p> 
<p>
1) You can delete the unfilled vacancy anytime during this period.<br>
2) You can choose how long the vacancy will remain published before you decide to delete it based on how much flexibility you can give for the substitute to accept and show up for the job.<br>
3) You can choose to take no action, and the unfilled vacancy will be automatically removed 60 minutes after the stated start time. Note that a substitute can still fill the vacancy througout this extended period.</p>

<p>Please don't hesitate to contact us if you have any questions.<p>
          <br>
          
          <p>Med vänliga hälsningar / Best wishes,</p>
          <p>DoHR (/ˈdɔr/) team</p>
          <br>
          <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
          `
          );
        });
        const stringUsersMail = arrayUsersMail.join(", ");
        console.log(stringUsersMail);

        //console.log(f);
      }

      return {
        success: true,
        message: "done",
      };
    });
  },

  Notify_Vacancy_endtime: (req, res) => {
    getVacancyfilled((err, results) => {
      if (err) {
        console.log(err);
        return {
          success: false,
          message: err.sqlMessage,
        };
      }

      console.log(results.length);
      if (results.length == 0) {
        return {
          success: true,
          message: "No Schedule",
        };
      }

      // check the vacancy is today
      var ids = [];
      var notificationIds = [];
      results.forEach((X) => {
        const date = new Date();
        var today = date.toISOString().substring(0, 10);
        const startTime = new Date(X.v_date + "T" + X.to_time + ".000Z");
        console.log("the time start", startTime);
        const CT = moment().add(0, "hours").format();
        const cdt = CT.substring(0, 19);
        const currentTime = new Date(cdt + "Z");
        const diffInMinutes = Math.floor(
          (currentTime - startTime) / (1000 * 60)
        );

        console.log("kk");
        console.log(diffInMinutes);
        if (X.v_date == today) {
          if (diffInMinutes == 0) {
            if (notificationIds.indexOf(X.notification_id) != -1) {
            } else {
              notificationIds.push(X.notification_id);
            }
          }
        }
      });

      if (notificationIds.length != 0) {
        var message = {
          notification: {
            body: "Vi vill tacka dig för ditt arbete! Kom ihåg att rapportera dina timmar inom de närmaste 24 timmarna!",
            title: "A New Message",
          },

          tokens: notificationIds,
        };

        fun.Fcm_Message_Multiple(message);
      }

      return {
        success: true,
        message: "done",
      };
    });
  },
};
