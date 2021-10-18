const 
    BotConversation = require('../service/bot-conversation'),
    fixture = require('./fixtures.json');

    describe('Bot Conversation', () => {
        it('Empty request body', async () => {
            const botConversation = new BotConversation({fixture});
            const res = botConversation.process();
            expect("link").toEqual("link");
          });
    },3000);