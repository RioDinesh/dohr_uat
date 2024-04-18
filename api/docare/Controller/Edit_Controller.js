const {UpdatePricePlans}=require('../Service/docare_edit_services');
module.exports={
    edit_price_plans: (req, res) => {
       const data = req.body;
   
       UpdatePricePlans(data, (err, results) => {
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