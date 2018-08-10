const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kickedUser) return message.channel.send('Where is he!?!?');
    let kickedReason = args.join(" ").slice(22);
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Nice try buddy...');
    if (kickedUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That dude has been kicked');

    let kickEmbed = new Discord.RichEmbed()
        .setDescription('~Kick~')
        .setColor('#ff0000')
        .addField('Kicked User', `${kickedUser} with ID ${kickedUser.id}`)
        .addField('Kicked By', `<@${message.author.id}> with ID ${message.author.id}`)
        .addField('Kicked In', message.channel)
        .addField('Time', message.createdAt)
        .addField('Reason', kickedReason);

    let kickChannel = message.guild.channels.find(`name`, 'incidents');
    if (!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kickedUser).kick(kickedReason);
    kickChannel.send(kickEmbed);


    return;
}

module.exports.help = {
    name: 'kick'
}