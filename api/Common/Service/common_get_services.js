const pool = require("../../../config/connection");

module.exports = {
  GetTitle: (callback) => {
    pool.query("select * from dh_title", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  OrganizationType: (callback) => {
    pool.query(
      "select * from dh_organization_type",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  PublishToType: (callback) => {
    pool.query(
      "select * from dh_publish_to_master",
      [],
      (error, result, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, result);
        }
      }
    );
  },

  GetPostCodes: (callback) => {
    pool.query("select * from dh_postcodes", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetPostion: (callback) => {
    pool.query("select * from dh_position", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
  GetLink: (callback) => {
    pool.query("select * from register_link", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetSubPass: (callback) => {
    pool.query("select * from dh_subscription_pass_master", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },

  GetLevelMaster: (callback) => {
    pool.query("select * from dh_leave_master", [], (error, result, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, result);
      }
    });
  },
};