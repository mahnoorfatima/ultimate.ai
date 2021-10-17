const 
    Logger = require('log-winston-aws-level');
    Request = require('request');

function setLogLevel(level) {
  Logger.updateLevel(level);
}

async function sendHttpRequest(url, method, headers, body) {
  return new Promise(async (resolve, reject) => {
    const options = {
      url,
      method,
      json: true,
      headers,
      body,
    };
    if (Logger.currentLevel() === 'debug') {
      Logger.debug(`HTTP Request: ${JSON.stringify(options)}`);
    }
    Request(options, (error, response, responseBody) => {
      if (error) {
        Logger.error(`Error Response: ${JSON.stringify(response)}`);
        Logger.error(`Error Response Body: ${responseBody}`);
        Logger.error(`Error Response Error: ${error}`);
        reject(error);
      } else if (!error && response.statusCode === 200) {
        if (Logger.currentLevel() === 'debug') {
          Logger.debug(`Success Response (${response.statusCode}, ${response.statusMessage}) Body: ${responseBody}`);
        }
        resolve(responseBody);
      } else {
        Logger.info(`Other Response: `, JSON.stringify(response));
        Logger.info(`Other Response Body: `, JSON.stringify(responseBody));
        Logger.info(`Other Response Error: `, JSON.stringify(error));
        reject(response);
      }
    });
  });
}

module.exports = {
  sendHttpRequest,
  setLogLevel
};