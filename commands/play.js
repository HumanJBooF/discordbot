const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var opusscript = require("opusscript");


module.exports.run = async (client, message, args) => {

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!");

    const permission = voiceChannel.permissionsFor(message.client.user);
    if (!permission.has('CONNECT')) {
        return message.channel.send("I can't connect, make sure I have the right permission!")
    }
    if (!permission.has('SPEAK')) {
        return message.channel.send("I can't speak unless you give me the right permission son!")
    }

    try {
        var connection = await voiceChannel.join();
    } catch (error) {
        console.error(`I could not join the channel: ${error}`);
        return message.channel.send(`I could not join the channel: ${error}`);
    }

    const dispatcher = connection.playStream(ytdl(args[1]))
        .on('end', () => {
            console.log('song ended!');
            voiceChannel.leave();
        })
        .on('error', error => {
            console.error(error)
        });
        dispatcher.setVolumeLogarithmic(5 / 5);
}

module.exports.help = {
    name: "play"
}