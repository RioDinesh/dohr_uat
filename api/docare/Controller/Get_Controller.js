
const { GetStayConnected, GetTestimonials, GetPricePlans, GetContactus, GetWorkWithUs, GETTeamMember } = require("../Service/docare_get_services");

module.exports = {
  get_testimonials: (req, res) => {
    GetTestimonials((err, results) => {
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

  get_stay_connected: (req, res) => {
    GetStayConnected((err, results) => {
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

  get_price_plans: (req, res) => {
    GetPricePlans((err, results) => {
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
  get_contact_us: (req, res) => {
    GetContactus((err, results) => {
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
  get_work_with_us: (req, res) => {
    GetWorkWithUs((err, results) => {
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
  get_team_member: (req, res) => {
    
    GETTeamMember((err, results) => {
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

 
};