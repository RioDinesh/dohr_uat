require("dotenv").config();
const express = require("express");
const Router = require("./routes/Route");
const DO_Care_Router = require("./routes/docare_Route");
var path = require("path");
const cors = require("cors");
var cron = require("node-cron");
var moment = require("moment");
var bodyParser = require("body-parser");
const { CronJobs } = require("./api/Cron/routes/Cron_Route");
const fun = require("./api/functions/Basic_methods");
var server = express();

server.use(express.json({ limit: "100mb" }));
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "/api/images")));
server.use(express.static(path.join(__dirname, "/api/uploads")));
server.use(express.static(path.join(__dirname, "/api/docare_uploads")));
server.use(express.static(path.join(__dirname, "/api/attachments")));
server.use("/", Router);
server.use("/docare", DO_Care_Router);

//cron run every 1 min
cron.schedule("* * * * *", () => {
  console.log("cron excuted");
  const CT = moment().add(0, "hours").format();
  console.log("time is", CT);
  CronJobs.publish_to_all_20min();
  CronJobs.publish_to_all30();
  CronJobs.hr_48_rule();
  CronJobs.Expire_Vacancy_after_60min();
  CronJobs.Notify_Vacancy_before_60min();
  CronJobs.Notify_Vacancy_endtime();
  CronJobs.notification_24hr_ExpressPass();
  CronJobs.notification_24hr_vacancy();
  CronJobs.notification_24hr_UnfilledReservePool();
  // var message = {
  //   token:
  //     "dIPHYlubQbWIQ2dGABQ81Q:APA91bHpZAXaYxAxSfG7LFuFsaOC1ZdoN1N6u7UJpeK-6lH-JqRIcgkdnk9BfFJT4vPdx_gQ4cgQ16X6k53L7cfj36Olm2XGD0GCF7X_KXfGAycVGpYMCoo",
  //   notification: {
  //     body: "En ny tidsrapport väntar på ditt godkännande. Vänligen godkänn inom 48 timmar innan den automatiskt godkänns. Tack för ditt samarbete!",
  //     title: "A New Message",
  //   },
  // };
  // fun.FCM_MESSAGE(message);
});

//cron run every 10 min
cron.schedule("0 */10 * * * *", () => {
  console.log("im 10 min cron");
  CronJobs.notification_10min();
});

server.listen(process.env.APP_PORT, () => {
  console.log("Server is Running");
});
