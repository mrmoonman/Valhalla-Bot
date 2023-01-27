require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
const token = process.env.DISCORD_ID;
// Log in to Discord with your client's token
client.login(token);

client.on("messageCreate", async (message) => {
  if (message.content.charAt(0) == "!") {
    let command = message.content.split("!")[1];
    let commandNum = parseInt(command);
    if (commandNum != NaN && commandNum > 0 && commandNum < 9001) {
    } else if (command === "random") {
      command = parseInt(Math.random() * (9000 - 1) + 1).toString();
    }

    if (command != "") {
      const embedValhalla = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Valhalla ${command}`)
        .setImage(
          `https://valhalla-nft-production-compressed.s3.amazonaws.com/${command}.png`
        );
      message.channel.send({ embeds: [embedValhalla] });
    }
  }
});
