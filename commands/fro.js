const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.channel.send('Whats up Froman!')
}

module.exports.help = {
    name: 'fro'
}