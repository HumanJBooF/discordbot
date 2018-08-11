const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let sIcon = message.guild.iconURL;
    let severEmbed = new Discord.RichEmbed()
        .setDescription('Server Information')
        .setColor('#ff0000')
        .setThumbnail(sIcon)
        .addField('Server Name', message.guild.name)
        .addField('Created On', message.guild.createdAt)
        .addField('You Joined', message.guild.joinedAt)
        .addField('Total Members', message.guild.memberCount);

    return message.channel.send(severEmbed);
}

module.exports.help = {
    name: 'serverinfo'
}