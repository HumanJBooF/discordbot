const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    let mute = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mute) return message.reply("Couldn't find user.");

    if (mute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them.");

    let muteRole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                })
            })
        } catch (e) {
            console.log(e.stack)
        }
    }
    //end of create role

    let muteTime = args[1];

    if (!muteTime) return message.reply("You didn't specify a time");

    await (mute.addRole(muteRole.id));
    message.reply(`<@${mute.id}> has been muted for ${ms(ms(muteTime))}`);

    setTimeout(function () {
        mute.removeRole(muteRole.id);
        message.channel.send(`<@${mute.id}> has been unmuted`)
    }, ms(muteTime))

    //end of module
}

module.exports.help = {
    name: 'tempmute'
}