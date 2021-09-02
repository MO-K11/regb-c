const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Register = require('../Models/Users') 
const Staff = require('../Models/Staffs')
moment.locale("tr")
module.exports = {
conf: {name: 'kke', aliases: ["kim-tarafından-kayıt-edilmiş", "ktke"], help: "!kkee @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.RegisterPermission) && !perms.ExtraPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return; 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))

Register.find({UserID: member.id}, async(err, data) => {
if(err) console.log(err)
if(data.length < 1) return message.channel.send(nembed.setDescription(`Kullanıcının veritabanında kayıtlı bir isim kayıtı bulunamamakta.`))

let names = data.reverse().reverse()

message.channel.send(embed.setDescription(`
${member} adlı üyenin toplam ${data.length} kayıt işlemi gerçekleşmiş.

${names.map(x => `❯ \`${x.UserNames}\` - <@${x.Admin}> - ${x.Sex} (${moment(+x.Date).format("DD.MM.YYYY")})`).join("\n")}`))
})

}}
