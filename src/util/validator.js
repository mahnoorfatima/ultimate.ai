
// A validator to validate the data from request
exports.validate = (params) => {
    return params.message && params.botId;
  }