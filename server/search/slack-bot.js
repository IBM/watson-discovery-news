/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a search queries.
* Search for news using the Watson Discover API by hitting the api
  endpoint of the server.

# RUN THE BOT:

  Get a Bot token from Slack:

  -> http://my.slack.com/services/new/bot

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "news please" or "whats in the news"

  The bot will ask you What news are you interested in?

  Say: "merger and acquisition of artificial intelligence companies"

  Confirm and the bot will show you links to top three news articles 
  from Watson Discovery News Service

  Make sure to invite your bot into other channels using /invite @<my bot>!

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
require('isomorphic-fetch');
const queryString = require('query-string');

if (!process.env.SLACK_BOT_TOKEN) {
  // eslint-disable-next-line no-console
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const Botkit = require('botkit');

const controller = Botkit.slackbot();

// eslint-disable-next-line no-unused-vars
const bot = controller.spawn({
  token: process.env.SLACK_BOT_TOKEN
}).startRTM();

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function(err) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });

  bot.reply(message, 'Hello.');
});

controller.hears(['whats in the news', 'news please'], 'direct_message,direct_mention,mention',
  function(bot, message) {
    bot.startConversation(message, function(err, convo) {
      if (!err) {
        convo.say('Hi there!');
        convo.ask('What news are you interested in?', function(response, convo) {
          convo.ask('You want me to search for news articles about `' + response.text + '`?', [
            {
              pattern: bot.utterances.yes,
              callback: function(response, convo) {
                // since no further messages are queued after this,
                // the conversation will end naturally with status == 'completed'
                convo.next();
              }
            },
            {
              pattern: bot.utterances.no,
              callback: function(response, convo) {
                // stop the conversation. this will cause it to end with status == 'stopped'
                convo.stop();
              }
            },
            {
              default: true,
              callback: function(response, convo) {
                convo.repeat();
                convo.next();
              }
            }
          ]);

          convo.next();

        }, {'key': 'search-query'});

        convo.on('end', function(convo) {
          if (convo.status == 'completed') {
            bot.reply(message, 'OK searching...');

            const qs = queryString.stringify({ query: convo.extractResponse('search-query') });

            fetch(`https://watson-discovery-news-search.mybluemix.net/api/search?${qs}`)
            .then(apiResponse => {
              if (apiResponse.ok) {
                apiResponse.json()
                  .then(json => {
                    bot.reply(message, 'Here are some news articles...');
                    for (let i = 0; i < 3; i++) {
                      setTimeout(() => {
                        bot.reply(message, `<${json.results[i].url}>`);
                      }, i * 1000);
                    }
                  });
              } else {
                throw new Error(apiResponse.json());
              }
            })
            .catch(err => {
              // eslint-disable-next-line no-console
              console.error('error', err);
              bot.reply(message, 'Error fetching news');
            });
          } else {
            // this happens if the conversation ended prematurely for some reason
            bot.reply(message, 'OK, nevermind!');
          }
        });
      }
    });
  });

controller.hears(['identify yourself', 'who are you', 'what is your name'],
  'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, ':robot_face: I am a bot named <@' + bot.identity.name + '>.');
  });
