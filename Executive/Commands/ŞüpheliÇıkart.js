const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Register = require('../Models/Users') 
const Staff = require('../Models/Staffs')

module.exports = {
conf: {name: 'şüpheli', aliases: ["şüpheliden-çıkart"], help: "!şüpheli @Striga/ID sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.RoleManagerPermissions.some(x => message.member.roles.cache.get(x)) &&  !message.member.hasPermission('ADMINISTRATOR')) return;

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi"
if(!reason) return message.channel.send(nembed.setDescription(`${member} üyesini neden kayıtsıza atmak istiyorsunuz ?`))
if(!member.roles.cache.get(role.SuspectRole)) return message.channel.send(nembed.setDescription(`${member} adlı üye <@&${role.SuspectRole}> rolüne sahip değil.`));

await member.roles.remove(role.SuspectRole)
await member.roles.add(role.UnregisterRole)

message.channel.send(embed.setDescription(`${member} üyesi ${message.author} tarafından "${reason}" gerekçesiyle şüpheliden çıkartıldı.`)).then(x => x.delete({timeout: 6500}))

client.channels.cache.get(logs.SuspectCommandLog).send(new MessageEmbed()
.setDescription(`Üye: ${member.toString()} - **${member.id}**\nYetkili: ${message.author} - **${message.author.id}**"\nİşlem: Şüpheliden Çıkartma`)
.setColor("RANDOM")
.setFooter(""+ moment(Date.now()).format("LLL")+"")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})))

}}
