
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { EditConsultantProfile, EditOpenApplication, EditAdApplication } = require("../Service/con_edit_services");
//const { EditConsultantProfile } = require("../../../uploads");
const path = require('path');
const fs = require('fs');
//const getDirName = require('path').dirname;
const fun=require("../../functions/Basic_methods");
const mime = require('mime');
module.exports = {

  Edit_Consultant_Profile: (req, res) => {

    const data = req.body;
    if (
      !data.cons_id,
      !data.first_name,
      !data.last_name,
      !data.phone_number,
      !data.swedish_personal_number,
      !data.email_id,
      !data.swedish_bank_account,
      !data.iam_student,
      !data.bank_name,
      !data.clearing_number,
      !data.bank_account_number,
      !data.emergency_contact_firstname,
      !data.emergency_contact_lastname,
      !data.emergency_contact_number,
      !data.address,
      !data.area_name,
      !data.postalcode,
      !data.description
    ) {
      return res.status(501).json({
        success: false,
        message: "fields are missing",
      });
    }

    
      if(data.image!=''){
        console.log(data.image);
        const currentDate = new Date();
        var formatfilename=currentDate.toISOString();
        var filename =formatfilename.replace(/[- : .]/g, '');
        var des_path =path.join(__dirname, `../../uploads/${filename}.png`);
        const imgdata = data.image;
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
        data.profile_img=filename+'.png';
      }
      
      EditConsultantProfile(data, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          return res.status(502).json({
            success: false,
            message: err.sqlMessage,
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Updated",
        })
  
  
  
      });
    

  },

  open_application_form_approve:(req,res)=>{
    const data=req.body;
    console.log(data);
    
     EditOpenApplication(data,(err,result)=>{
      if (err) {
        console.log(err.sqlMessage);
        return res.status(502).json({
          success: false,
          message: err.sqlMessage,
        });
      }

      if(data.is_denied==true){
        fun.sendMail(data.email_id,"DoHR - Tack för din spontanansökan / Thank you for your open application",
        `<html>

        <head>
           
        </head>
        
        <body>
        
            <div>
                <p>Hej!</p>
                <p>Vi vill ge dig en uppdatering om din spontanansökan, som du skickade till oss för ett tag sedan. Vi beklagar att informera dig om att vi inte kunde hitta en tjänst som matchade dina kvalifikationer och erfarenheter därför kommer vi att ta bort din ansökan från vår databas.</p>
                <p>Vi uppskattar ditt intresse och uppmuntrar dig att fortsätta kolla lediga jobb på vår hemsida. Det kan komma att finnas ett passande jobb för dig när våra kunders behov förändras.</p>
                <p>Om du har några frågor, tveka inte att kontakta oss.</p>
                <p>Återigen, vi uppskattar ditt intresse och vi önskar dig lycka till i ditt jobbsökande.</p>
                <br>
                <p>Greetings!</p>
                <p>We would like to provide you with an update on your open application, which you submitted a while ago with us. We regret to inform you that we were unable to find a position that matched your qualifications and experience and as a result, we will be removing your application from our database.</p>
                <p>We appreciate your interest and encourage you to continue checking available jobs on our website. There might be a role available for you as our customer needs change.</p>
                <p>If you have any questions, please do not hesitate to contact us.</p>
                <p>Once again, we appreciate your interest, and we wish you the best in your job search.</p>
                <br>
                <p>Med vänliga hälsningar / Best wishes,</p>
                <p>DoHR (/ˈdɔr/) team</p>
                <br>
                <p><a href="mailto:support@dohr.io">support@dohr.io</a> | <a href="https://www.dohr.io">www.dohr.io</a></p>
            </div>
        
        </body>
        
        </html>
        
        `);
      }

      return res.status(200).json({
        success: true,
        message: "Updated",
      })

     });
     
  },
  Ad_application_form_approve:(req,res)=>{
    const data=req.body;
    
     EditAdApplication(data,(err,result)=>{
      if (err) {
        console.log(err.sqlMessage);
        return res.status(502).json({
          success: false,
          message: err.sqlMessage,
        });
      }
      if(data.is_denied==true){
        fun.sendMail(data.email_id,"DoHR - Tack för din ansökan / Thank you for your application",
        `
        <html >

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

        `);
      }
      return res.status(200).json({
        success: true,
        message: "Updated",
      })
  
     });
     
  },
  
  mail_test:(req,res)=>{
    try{
      console.log("in")
      fun.sendMail("riodinesh7@gmail.com","DoHR - Tack för din spontanansökan / Thank you for your open application",
      `<html>
  
      <head>
         
      </head>
      
      <body>
      
          <div>
              <p>Hej!</p>
              <p>Vi vill ge dig en uppdatering om din spontanansökan, som du skickade till oss för ett tag sedan. Vi beklagar att informera dig om att vi inte kunde hitta en tjänst som matchade dina kvalifikationer och erfarenheter därför kommer vi att ta bort din ansökan från vår databas.</p>
              <p>Vi uppskattar ditt intresse och uppmuntrar dig att fortsätta kolla lediga jobb på vår hemsida. Det kan komma att finnas ett passande jobb för dig när våra kunders behov förändras.</p>
              <p>Om du har några frågor, tveka inte att kontakta oss.</p>
              <p>Återigen, vi uppskattar ditt intresse och vi önskar dig lycka till i ditt jobbsökande.</p>
              <br>
              <p>Greetings!</p>
              <p>We would like to provide you with an update on your open application, which you submitted a while ago with us. We regret to inform you that we were unable to find a position that matched your qualifications and experience and as a result, we will be removing your application from our database.</p>
              <p>We appreciate your interest and encourage you to continue checking available jobs on our website. There might be a role available for you as our customer needs change.</p>
              <p>If you have any questions, please do not hesitate to contact us.</p>
              <p>Once again, we appreciate your interest, and we wish you the best in your job search.</p>
              <br>
              <p>Med vänliga hälsningar / Best wishes,</p>
              <p>DoHR (/ˈdɔr/) team</p>
              <br>
              <p><a href="mailto:support@dohr.io">support@dohr.io</a> | </p>
              <p>If you want to unsubscribe, click <a href="https://virtually-rational-donkey.ngrok-free.app/mailtest">here</a>.</p>

          </div>
      
      </body>
      
      </html>
      
      `);
      res.end();
    }catch(e){
      console.log(e);
    }
    
   
     
  },

};





function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}