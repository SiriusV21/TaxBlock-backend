require("dotenv").config();

const MONGOURI = process.env.MONGOURI;
const SECRETKEY = process.env.SECRETKEY;

const config = {
  mongoURI: MONGOURI,
  secretKey: SECRETKEY,
  rxemail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  rxphone: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
};

module.exports = config;
