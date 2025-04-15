const {
  ApproveSub,
  ExpressPassUpdate,
  EditExpressPass,
  MakeCustomerActive,
  MakeConsultantActive,
  DenySub,
  EditAdvertisment,
} = require("../Service/admin_edit_services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fun = require("../../functions/Basic_methods");
module.exports = {
  approve_sub: (req, res) => {
    const data = req.body;
    var pass = req.password;
    console.log(data);
    if ((!data.id, !data.email_id)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    var pass = Math.random().toString(36).toUpperCase().slice(2, 10);
    const salt = genSaltSync(10);
    var password = hashSync(pass, salt);

    var body = {
      id: data.id,
      password: password,
    };
    ApproveSub(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      fun.sendMail(
        data.email_id,
        "Välkommen till DoHR appen / Welcome to DoHR mobile app",

        `
        
<html >

<body>
<p>Hej!</p>
    <p> Välkommen till DoHR appen! Ladda ner DoHR mobilappen och logga in med inloggningsuppgifterna nedan.</p>

    <p><strong>Användarnamn/username:${data.email_id}</strong><br>
    <strong>Lösenord/password:${pass} </strong></p>

    <p>DoHR-mobilappen är lätt att använda och du kan acceptera jobb när det passar dig. Alla otillsatta jobb finns under "Lediga jobb". Du kommer att få notiser när nya jobb publiceras. Detaljer om dina accepterade jobb hittar du under "Mina jobb/planerade".</p>

    <p>Viktig information för ENDAST DoHR-anställda:</p>
    <p>Vi vill också göra dig uppmärksam på Min profil. Det är viktigt att uppdatera din profil när du loggar in för första gången, särskilt dina föredragna arbetsområden, bankuppgifter och nödkontakter.</p>

    <p>Vi har också en annan viktig funktion i appen, som är Reservpoolen. Syftet med Reservpoolen är att ge dig möjlighet att reservera dig i förväg så att vi kan möta kundernas önskemål om vikarier med kort varsel. Svar på dina frågor såsom hur man anmäler sig till Reservpoolen och annat, finns på sidan Vanliga frågor. Under Mer/Villkor och policyer hittar du villkoren för jobbet du tackar ja till.</p>

    <p>Det finns nya lediga jobb som väntar på dig! Var först att tacka ja!</p>

    <hr>

    <p>Greetings!</p>

    <p>Welcome to DoHR mobile app! Simply download the DoHR mobile app and sign in with the credentials listed in the Swedish text above.</p>

    <p>The DoHR mobile app is incredibly simple to use, you can view and accept any job whenever it is convenient for you. "Available jobs" lists all of the unfilled jobs. Additionally, you will be notified when new jobs are published. Details about your accepted job can be found under "My jobs/scheduled".</p>

    <p>Important information for DoHR-employees ONLY:</p>
    <p>We would also like to bring your attention to My profile. It is important to update your profile when you log in for the first time, especially your preferred location, bank details and emergency contact details.</p>

    <p>Moreover, we have another important function in the app, which is the Reserve pool. The purpose of the Reserve Pool is to give you the opportunity to reserve yourself in advance so that we can meet the customers' requests for substitutes at short notice. Any questions you have, such as how to register for the Reserve pool, can be found in our FAQ section. Under More/Legal, you can find the terms and conditions for a job you accept.</p>

    <p>New vacancies are calling you! Get ready to actively accept jobs on the Vacancy board.</p>

    <p>Med vänliga hälsningar / Best wishes,<br>
    DoHR (/ˈdɔr/) team<br>
    <a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io" target="_blank">www.dohr.io</a></p>
</body>
</html>
        `
      );

      return res.status(200).json({
        success: true,
        message: "Approved",
      });
    });
  },

  deny_sub: (req, res) => {
    const data = req.body;
    if ((!data.id, !data.email_id)) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    fun.sendMail(
      data.email_id,
      "DoHR - Tack för din ansökan / Thank you for your application",

      `<html>

    <head>
    </head>
    
    <body>
    
        <div>
            <p>Hej!</p>
            <p>Tack för din ansökan!</p>
            <p>Vi har gått igenom den men har tyvärr valt att gå vidare med andra kandidater i detta skede.</p>
            <p>Vi hoppas att du vill fortsätta kolla lediga jobb som finns på vår hemsida och följa vad som händer hos oss i sociala medier.</p>
            <p>Än en gång, tack för ditt engagemang och lycka till i ditt jobbsökande!</p>
            <br>
            <p>Greetings!</p>
            <p>Thank you for your application!</p>
            <p>We have now reviewed your application and we have chosen to proceed with other candidates at this stage.</p>
            <p>We hope you will continue to check new vacancies on our website and follow what is happening with us on social media.</p>
            <p>Once again, thank you for your commitment and good luck with your job search!</p>
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

    DenySub(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },

  book_pass: (req, res) => {
    const data = req.body;

    if (!data.pass_id || !data.date || !data.cons_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }

    ExpressPassUpdate(data, (err, results) => {
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

  edit_pass: (req, res) => {
    const data = req.body;

    EditExpressPass(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },

  make_active_user: (req, res) => {
    const data = req.body;

    MakeCustomerActive(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      if (data.data == true) {
        fun.sendMail(
          data.email_id,
          "DoHR - Ändringar i ditt konto / Changes to your account",
          `<html>

          <head></head>
          
          <body>
          
              <div>
                  <p>Hej!</p>
                  <p>Vi märkte att ditt DoHR-konto har varit inaktivt under en längre tid. Vi har inaktiverat ditt konto för att skydda dina personuppgifter.</p>
                  <p>Vänligen mejla oss inom de närmaste 30 dagarna om du önskar att återaktivera ditt konto.</p>
                  <p>Observera att vi kan behöva behålla vissa data (för redovisning, skatt, osv) för en viss tid, innan den raderas.</p>
                  <p>Du är välkommen att kontakta oss om du har ytterligare frågor. Vi håller gärna kontakten, så följ oss på sociala medier.</p>
                  <br>
                  <p>Greetings!</p>
                  <p>We noticed that your DoHR account has been inactive for an extended period of time. To protect your account and your personal data, we have inactivated your account.</p>
                  <p>Please email us within the next 30 days if you wish to reactivate your account.</p>
                  <p>Please note that we may be required to retain certain information (e.g. for compliance, tax, accounting, or auditing purposes) for a limited period of time, after which it will be deleted.</p>
                  <p>If you have any further questions, please, feel free to contact us. We are happy to stay in touch, follow us on social media.</p>
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
      }

      return res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },

  make_active_user_consultant: (req, res) => {
    const data = req.body;

    MakeConsultantActive(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      if (data.data == true) {
        fun.sendMail(
          data.email_id,
          "DoHR - Ändringar i ditt konto / Changes to your account",
          `
          <html >

          <head></head>
          
          <body>
          
              <div>
                  <p>Hej!</p>
                  <p>Vi märkte att ditt DoHR-konto har varit inaktivt under en längre tid. Vi har inaktiverat ditt konto för att skydda dina personuppgifter.</p>
                  <p>Vänligen mejla oss inom de närmaste 30 dagarna om du önskar att återaktivera ditt konto.</p>
                  <p>Observera att vi kan behöva behålla vissa data (för redovisning, skatt, osv) för en viss tid, innan den raderas.</p>
                  <p>Du är välkommen att kontakta oss om du har ytterligare frågor. Vi håller gärna kontakten, så följ oss på sociala medier.</p>
                  <br>
                  <p>Greetings!</p>
                  <p>We noticed that your DoHR account has been inactive for an extended period of time. To protect your account and your personal data, we have inactivated your account.</p>
                  <p>Please email us within the next 30 days if you wish to reactivate your account.</p>
                  <p>Please note that we may be required to retain certain information (e.g. for compliance, tax, accounting, or auditing purposes) for a limited period of time, after which it will be deleted.</p>
                  <p>If you have any further questions, please, feel free to contact us. We are happy to stay in touch, follow us on social media.</p>
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
      }

      return res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },

  edit_advertisment: (req, res) => {
    const data = req.body;

    EditAdvertisment(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Success",
      });
    });
  },
};
