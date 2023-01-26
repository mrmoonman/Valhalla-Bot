const Discord = require("discord.js");
require("dotenv").config();
const sdk = require("api")("@opensea/v1.0#10fy4ug30l7qohm4q");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) {
    return;
  }

  if (messsage === "random") {
    //retrieve random id from opensea
  } else {
    //try and parse id
    let id = parseInt(message);

    //return image data in chat
  }
});

client.login(process.env.DISCORD_ID);
