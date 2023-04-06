const axios = require("axios");

exports.create = (data) => {
    return axios.post(process.env.SHEETDB_URI, data);
};
