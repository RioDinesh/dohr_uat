const nodemailer = require("nodemailer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/adminsdk.json"); // Replace with your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = {
  sendMail: function sendMail(email, subject, text, callback) {
    var mailOptions = {
      from: "DoHR support <support@dohr.io>",
      to: email,
      subject: subject,
      html: `
      <html>
      <body>
     
      ${text}
     
      </body>
      </html>
      `,
    };
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      starttls: {
        enable: true,
      },
      secureConnection: true,
      auth: {
        user: "support@dohr.io",
        pass: "lumr lpzx hcwi gxrl",
      },
      from: "support@dohr.io",
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("false");
        return callback(true);
      }
    });
  },

  DayFinder: function DayFinder(FromDate, ToDate) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const listdays = [];
    const listDate = [];
    const startDate = new Date(FromDate);
    const endDate = new Date(ToDate);

    if (startDate.toDateString() === endDate.toDateString()) {
      const dayIndex = startDate.getDay();
      listdays.push({
        day: weekday[dayIndex].toUpperCase(),
        date: FromDate,
      });
      return listdays;
    }

    const dateMove = new Date(startDate);
    let strDate = FromDate;

    while (strDate < ToDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    }

    listDate.forEach((dates) => {
      var d = new Date(dates);
      listdays.push({
        day: weekday[d.getDay()].toUpperCase(),
        date: dates,
      });
    });
    return listdays;
  },

  DateFinder: function DayFinder(FromDate, ToDate) {
    const listdays = [];
    const listDate = [];
    const startDate = FromDate;
    const endDate = ToDate;
    const dateMove = new Date(startDate);
    let strDate = startDate;

    while (strDate < endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      //console.log(Date(strDate));
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    }

    listDate.forEach((dates) => {
      var d = new Date(dates);

      listdays.push(dates);
    });
    return listdays;
  },

  FCM_MESSAGE: async function Fcm_Messaging(message) {
    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // const options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization:
    //       "Bearer AAAAHq4_tgs:APA91bHZFGIfqiA5H7uRmYOnlMWcelZ8Gp-atLxhGj1NMLT6nYVg1CCO77fb_19cULtdT0XSM3zfnIqTTY7JfF2iOIfKT3biaB0rYzxZU0E0Hyc4by-XjBWIaRQKfC_nMdorpyIN3z4g",
    //   },
    // };
    // axios
    //   .post(
    //     "https://fcm.googleapis.com/v1/projects/dohrab-6e764/messages:send",
    //     message,
    //     options
    //   )
    //   .then((response) => {
    //     //receive response
    //     //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },

  GetDatesOfMonth: function getDaysInMonthUTC(month, year) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  },

  Check30DaysPassed: function isCoercedTo30Days(year, month, day) {
    const currentDate = new Date(year, month - 1, day);
    const coercedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      30
    );

    return (
      currentDate.getMonth() === coercedDate.getMonth() &&
      currentDate.getDate() !== coercedDate.getDate()
    );
  },

  IsNOtPassed30Days: function isDatePassed30Days(dateString) {
    // Convert the input string to a Date object
    const date = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the input date
    const timeDifference = currentDate.getTime() - date.getTime();

    // Calculate the number of milliseconds in 30 days
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    // Compare the time difference with 30 days
    if (timeDifference >= thirtyDaysInMilliseconds) {
      return false; // The date has passed 30 days
    } else {
      return true; // The date is within 30 days
    }
  },

  Attachment: async function save_attachment(data) {
    const file = data.proof_of_studies.split(";base64,").pop();
    const fileType = data.proof_of_studies.split(";")[0].split("/")[1];
    const filename = "pos" + data.phone_number + "." + fileType;
    var des_path = path.join(__dirname, "../attachments/" + filename);

    fs.writeFile(des_path, file, { encoding: "base64" }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error uploading file.");
      } else {
        data.proof_of_studies = filename;
        console.log(data.proof_of_studies);
      }
    });
  },
  GetExtensionType: function getFileExtensionFromBase64(base64String) {
    // Extract the base64 encoding information
    const regexResult = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+);base64,/.exec(
      base64String
    );

    if (regexResult) {
      const mimeType = regexResult[1];
      let extension = null;

      // Determine file extension based on mimeType
      switch (mimeType) {
        case "image/jpeg":
          extension = "jpg";
          break;
        case "image/png":
          extension = "png";
          break;
        case "application/pdf":
          extension = "pdf";
          break;
        // Add more cases as needed for other file types
      }

      return extension;
    } else {
      return null;
    }
  },
  CheckDateisPassed: function hasDatePassed(givenDateString) {
    // Parse the given date string to a Date object
    const givenDate = new Date(givenDateString);

    // Check if the given date string is a valid date
    if (isNaN(givenDate)) {
      throw new Error("Invalid date format");
    }

    // Get the current date and time
    const currentDate = new Date();

    // Compare the dates
    return givenDate < currentDate;
  },

  checkhaveSchedule: function isLeaveDuringWorkHours(
    scheduleStart,
    scheduleEnd,
    leaveStart,
    leaveEnd
  ) {
    // Check if leave starts or ends during the work schedule, or encloses it
    if (
      (leaveStart >= scheduleStart && leaveStart < scheduleEnd) ||
      (leaveEnd > scheduleStart && leaveEnd <= scheduleEnd) ||
      (leaveStart <= scheduleStart && leaveEnd >= scheduleEnd)
    ) {
      return true;
    }
    return false;
  },

  convertHoursInToMinutes: function convertHoursToMinutes(hours) {
    return hours * 60;
  },

  convertMinutesToHours: function convertMinutesToHours(minutes) {
    let hours = Math.floor(minutes / 60); // Calculate whole hours
    let remainingMinutes = minutes % 60; // Calculate remaining minutes
    // Ensure that minutes are always two digits
    let formattedMinutes = remainingMinutes.toString().padStart(2, "0");
    return `${hours}:${formattedMinutes}`;
  },

  ConverTimeString: function convertTimeToMinutes(time) {
    // Split the time string into hours and minutes
    let [hours, minutes] = time.split(":").map(Number);

    // Convert hours to minutes and add the minutes
    return hours * 60 + minutes;
  },

  FindMintuesBetweenTwoTimes: function FindMinBetweenTimes(startTime, endTime) {
    // Parse the times into Date objects
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end - start;

    // Convert the difference from milliseconds to minutes
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes;
  },

  checkdateisPassed: function isDateInRange(fromDate, toDate, targetDate) {
    // Convert the input dates to Date objects
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const target = new Date(targetDate);

    // Check if the target date is within the range
    return target >= from && target <= to;
  },

  isTimeWithinRange: (a, d, c, b) => {
    // Convert "HH:mm:ss" to total seconds since midnight
    const timeToSeconds = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    // Convert all times to seconds
    const timeA = timeToSeconds(a);
    const timeD = timeToSeconds(d);
    const timeC = timeToSeconds(c);
    const timeB = timeToSeconds(b);

    // Check if (a, d) is within (c, b)
    return timeA >= timeC && timeD <= timeB;
  },
};
////
