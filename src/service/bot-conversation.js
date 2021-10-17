const 
    UltimateAiError = require('../util/ultimate-error'),
    apiService = require('./api'),
    REPLY_CONSTANTS = require('../constants/reply'),
    db = require('../database/mongoose');
    threshold = 0.3;

module.exports = class BotConversation {
    constructor(params) {
        this.message = params.body.message;
        this.botId = params.body.botId;
    }
    async process() {
        try {
            const body = {
                botId: this.botId,
                message: this.message
            }
            // get intent for the request message from ultimate ai API
            const response = await apiService.getIntent(body);
            if (Array.isArray(response.intents)) {
                // filter intents above certain threshold: my supposition of threshold
                const filteredIntents = response.intents.filter(intent => intent.confidence > threshold);
                // As i am unclear on threshold, i am taking the largest value of confidence
                // sort the array in descending order
                response.intents.sort(function (a, b) { return b.confidence - a.confidence });
                // get intent with highest confidence
                const botIntent = response.intents[0];
                // pass the intent name to db
                const result = await db.fetchUser(botIntent.name);
                if (!result) return REPLY_CONSTANTS.DEFAULT_REPLY;
                return result.reply.text;
            }
        } catch (error) {
            throw new UltimateAiError(400, error);
        }
    }
}
