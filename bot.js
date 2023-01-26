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
const ethers = require("ethers");

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
      const provider = new ethers.providers.JsonRpcProvider(
        `https://fragrant-maximum-lake.discover.quiknode.pro/${process.env.API_KEY}/`
      );
      provider.connection.headers = { "x-qn-api-version": 1 };
      provider
        .send("qn_fetchNFTsByCollection", {
          collection: "0x231d3559aa848Bf10366fB9868590F01d34bF240",
          omitFields: ["traits"],
          tokens: [command],
          page: 1,
          perPage: 10,
        })
        .then((res) => {
          const embedValhalla = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`Valhalla ${command}`)
            .setImage(res.tokens[0].imageUrl);
          message.channel.send({ embeds: [embedValhalla] });
          return res;
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    }
  }
});
