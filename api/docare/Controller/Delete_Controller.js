const {DeleteTestimonials, DeleteContactUs, DeletePricePlans, DeleteStayConnected, DeleteWorkWithUs, DeleteTeamMember}=require('../Service/docare_delete_services');
module.exports={

    delete_testimonials: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeleteTestimonials(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_contact_us: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeleteContactUs(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_price_plans: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeletePricePlans(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_stay_connected: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeleteStayConnected(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_team_member: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeleteTeamMember(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
      delete_work_withUs: (req, res) => {
        const data = req.body;
        if (!data.id) {
          return res.status(500).json({
            success: false,
            message: "fields are missing",
          });
        }
        DeleteWorkWithUs(data, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: err.sqlMessage,
            });
          }
    
          return res.status(200).json({
            success: true,
            message: "Deleted",
          });
        });
      },
};