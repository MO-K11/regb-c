const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const logs = require('../Settings/Logs.json')
const perms = require('../Settings/Permissions.json')
const role = require('../Settings/Roles.json')
const other = require('../Settings/Other.json')
const settings = require('../config')
const moment = require('moment')

module.exports = async (member) => {
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
if(guvenilirlik) {
member.roles.remove(role.UnregisterRole)        
member.roles.add(role.SuspectRole)    
member.guild.channels.cache.get(logs.SuspectLog).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic:true})).setDescription(`• ${member} adlı üyenin hesabı yeni açıldığı için tüm rollerini aldım ve <@&${role.SuspectRole}> verdim.`).setTimestamp().setColor(client.warnColor()))
} else {     
ServerHg(member)
member.roles.add(role.UnregisterRole)
if(member.user.username.includes(settings.Tag)){
member.roles.add(role.TagRole)
}
}

}
module.exports.configuration = {name: "guildMemberAdd"}

function ServerHg(member) {
member.guild.channels.cache.get(logs.WelcomeChannel).send(`
${other.HosgeldinKalp} Sunucumuza hoş geldin ${member} ! ${other.HosgeldinKalp}\n
Hesabın **${global.tarihsel(member.user.createdAt)}** tarihinde (\`${global.tarihHesapla(member.user.createdAt)}\`) oluşturulmuş.\n
Sunucumuzun kurallarına <#${logs.RulesChannel}> göz atmanız tavsiye ederiz ceza işlemlerini kurallara göre yapıyoruz.\n
Sunucumuza Kayıt olmak için solda ki odalara girip ses teyit vererek kayıt olabilirsin.\n
Seninle birlikte sunucumuz **${member.guild.memberCount}** kişi oldu ! Tagımızı (**${settings.Tag}**) alarak ailemizin bir parçası olabilirsin.`)}