const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const config = require("./config.json");
const fs = require("fs");
const ytdl = require("ytdl-core");
var opusscript = require("opusscript");

client.commands = new Discord.Collection();



fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if (jsFile.length <= 0) {
        console.log("Can't Find Commands!");
        return;
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)
        client.commands.set(props.help.name, props)
    });

});


client.on("ready", async () => {
    console.log("I am ready!");
    client.user.setActivity('Squirrels', { type: 'WATCHING' });
});

client.on("message", async (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.toLowerCase().split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = client.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(client, message, args);


});
client.login(config.token);