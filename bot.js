// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */

    constructor(qnaServices) {
        this.qnaServices = qnaServices;
    }

    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            for (let i = 0; i < this.qnaServices.length; i++) {
                const qnaResults = await this.qnaServices[i].getAnswers(turnContext);
                if(qnaResults[0]) {
                    await turnContext.sendActivity(qnaResults[0].answer);
                    return;
                }
            }
            await turnContext('No answers were found.');
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
