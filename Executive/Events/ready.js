const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const settings = require('../config')
module.exports = () => {
client.user.setPresence({ activity: { name: settings.ServerMessage }, status: settings.ServerCase });
if (settings.VoiceID && client.channels.cache.has(settings.VoiceID)) client.channels.cache.get(settings.VoiceID).join().catch();
}
module.exports.configuration = {name: "ready"}