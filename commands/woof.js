const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.channel.send('WOOF WOOF WOOF!')
}

module.exports.help = {
    name: 'woof'
}