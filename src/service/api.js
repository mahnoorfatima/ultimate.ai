const 
    httpUtil = require('../util/http-util'),
    API_CONSTANTS = require('../constants/api-requests');
    require('dotenv').config({ path: './.env' });

exports.getIntent = async (body) => {
    const headers = {
        "X-API-Key": process.env.ULTIMATE_API_KEY,
        "Authorization": process.env.ULTIMATE_API_VALUE,
        'Content-Type': 'application/json'
        }
    let url = process.env.ULTIMATE_API_URL + API_CONSTANTS.GET_INTENTS;
    return httpUtil.sendHttpRequest(url, API_CONSTANTS.METHODS.POST, headers, body);
}

