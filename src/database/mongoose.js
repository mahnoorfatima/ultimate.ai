const aiIntentResponse = require("./schema/ai-intents");

// find intent response from Database
module.exports.fetchUser = function(intent) {
    return aiIntentResponse.findOne({ name: intent });
};
