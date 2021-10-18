const 
    chai = require('chai'),
    BotConversation = require('../service/bot-conversation'),
    fixture = require('./fixtures.json'),
    expect = chai.expect;
    const assert = require('assert');
describe('Bot Conversation', () => {
    it('Empty request body', async () => {
            assert(new BotConversation({})).to.throw();

      }, 3000);
});