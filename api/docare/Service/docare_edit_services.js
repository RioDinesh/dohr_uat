const pool = require("../../../config/connection");
module.exports = {
    UpdatePricePlans: (data, callback) => {
        pool.query(
          `UPDATE docare_price_plans SET plan_type=?,
           plan_price=?,
           name = ?,
           visits =?,
           time_period=?,
           scheduling=?,
           comment4=?
           WHERE id = ?;
          `,
            [data.plan_type, data.plan_price, data.name, data.visits, data.time_period, data.scheduling,data.comment4,data.id],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, result);
                }
            }
        );
    },
}