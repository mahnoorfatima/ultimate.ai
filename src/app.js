const
    express = require("express"),
    router = express.Router(),
    validator = require('./util/validator')
    BotConversation = require('./service/bot-conversation');


router.get('/check', (req, res) => res.json({ status: 'Ok' }));


router.post('/response', async (req, res) => {
        if (!validator.validate(req.body)) return res.json({message: 'Missing Parameters'})
        // Initiate Bot Conversation Processor with Request Body
        const botConversation = new BotConversation(req.body);
        // Process the User Preferences Configuration
        const botReply = await botConversation.process();
        return res.status(200).json(
            botReply
        );
});

module.exports = router;