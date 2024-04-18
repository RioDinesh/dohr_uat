const { AddTestimonials, AddStayConnected, AddPricePlans, AddContactus, AddWorkWithUs, AddTeamMember } = require("../Service/docare_post_services");
const mime=require('mime-types');
const path = require('path');
const fs = require('fs');
const fun =require('../../functions/Basic_methods');
module.exports = {


  add_testimonials: (req, res) => {
    const data = req.body;
    if (!data.profile_pic) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    const extension = data.profile_pic.substring('data:image/'.length, data.profile_pic.indexOf(';base64'));
    console.log(extension);
    const filename = `file_${Date.now()}.${extension}`;
    var des_path =path.join(__dirname, `../../docare_uploads/${filename}`);
    const base64Data = data.profile_pic.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
    data.profile_pic=filename;

    AddTestimonials(data, (err, results) => {
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

  add_stay_connected: (req, res) => {
    const data = req.body;
    if (!data.email_id) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddStayConnected(data, (err, results) => {
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


  add_price_plans: (req, res) => {
    const data = req.body;
    if (!data.plan_type,!data.plan_price,!data.name,!data.visits,!data.time_period,!data.scheduling,!data.comment4) {
      return res.status(500).json({
        success: false,
        message: "fields are missing",
      });
    }
    AddPricePlans(data, (err, results) => {
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
  add_contact_us: (req, res) => {
    const data = req.body;
   
    AddContactus(data, (err, results) => {
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

   add_work_with_us: (req, res) => {
    const data = req.body;
    if(data.i_have__police_clearance_certificate.toLowerCase()=="yes"){
      //      const extension = fun.GetExtensionType(data.police_clearance_certificate);;
    
      // const filename = `file_pcc_${Date.now()}.${extension}`;
      // var des_path =path.join(__dirname, `../../docare_uploads/${filename}`);
      // const base64Data = data.police_clearance_certificate.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      // fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
      // data.police_clearance_certificate=filename;
    }
    // if(data.i_agree_to_credit_and_background_check.toLowerCase()=="yes"){
     
    // }
    if(data.right_to_work_Sweden.toLowerCase()=="yes"){
      // const extension = fun.GetExtensionType(data.your_passport);
      // const filename = `file_pp_${Date.now()}.${extension}`;

      // var des_path =path.join(__dirname, `../../docare_uploads/${filename}`);
      // const base64Data = data.your_passport.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      // fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
      // data.your_passport=filename;
    }

    if(data.proof_of_your_studies!="" && data.proof_of_your_studies!=undefined){
      const extension = fun.GetExtensionType(data.proof_of_your_studies);
      console.log(extension);
      const filename = `file_ps_${Date.now()}.${extension}`;
      console.log(filename);
      var des_path =path.join(__dirname, `../../docare_uploads/${filename}`);
      const base64Data = data.proof_of_your_studies.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
      data.proof_of_your_studies=filename;
    }

    AddWorkWithUs(data, (err, results) => {
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

  add_team_member:(req, res) => {
    const data = req.body;
    if(data.profile_pic==""||data.profile_pic==undefined||data.profile_pic==null){
      return res.status(500).json({
        success: false,
        message:"profile picture missing",
      });
    }
    const extension = data.profile_pic.substring('data:image/'.length, data.profile_pic.indexOf(';base64'));
      console.log(extension);
      const filename = `file_${Date.now()}.${extension}`;
      var des_path =path.join(__dirname, `../../docare_uploads/${filename}`);
      const base64Data = data.profile_pic.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      fs.writeFileSync(des_path, base64Data,  {encoding: 'base64'});
      data.profile_pic=filename;
    AddTeamMember(data, (err, results) => {
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


 

}




