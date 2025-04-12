// Require the Bolt package (github.com/slackapi/bolt)
require('dotenv').config(); // <-- Load env variables
// 
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});



app.message(/hello/i, async ({ message, say }) => {
  await say(`Hey there <@${message.user}>`);
});

(async () => {
  // Global middleware to log all incoming requests once the app starts
  app.use(async ({ body, next }) => {
    console.log("⚡️ Received request:", body); //Log app status and the incoming request
    await next(); //Pass to next middleware or listener
  });

  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
