const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Register = require('../Models/Users') 
const Staff = require('../Models/Staffs')

module.exports = {
conf: {name: 'kayıtsız', aliases: ["unregister"], help: "!kayıtsız @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.RegisterPermission) && !perms.ExtraPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return;

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi"
if(!reason) return message.channel.send(nembed.setDescription(`${member} üyesini neden kayıtsıza atmak istiyorsunuz ?`))

await member.setNickname(member.user.username)
await member.roles.set(member.roles.cache.has(role.BoosterRole) ? [role.BoosterRole, role.UnregisterRole] : [role.UnregisterRole]).catch();
message.channel.send(embed.setDescription(`${member} üyesi ${message.author} tarafından "${reason}" gerekçesiyle kayıtsıza atıldı.`)).then(x => x.delete({timeout: 6500}))
}}
