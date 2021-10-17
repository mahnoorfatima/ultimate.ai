const mongoose = require("mongoose");

module.exports = mongoose.model("ai-intents", new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    trainingData: { type: Object},
    reply: { type: Object }
}));