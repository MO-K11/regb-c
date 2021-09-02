const { MessageEmbed } = require('discord.js')
const Register = require('../Models/Users') 
const Staff = require('../Models/Staffs')

module.exports = {
conf: {name: 'top-teyit', aliases: ["topteyit"], help: "!top-teyit"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.RegisterPermission) && !perms.ExtraPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return; 

let xembed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor('').setThumbnail(message.guild.iconURL({ dynamic: true}));
let TopRegister = await Staff.find().sort({ RegisterTotal: -1 });
TopRegister = TopRegister.filter(x => message.guild.members.cache.has(x.UserID)).splice(0, 15)
message.channel.send(xembed.setDescription(`**${message.guild.name}** Sunucusunun En Çok Kayıt Yapan İlk 15 Kişinin Listesi; \n\n${TopRegister.length  ?  TopRegister.map((d, index) => `${index+1}. <@${d.UserID}> | Toplam: \`${d.RegisterTotal}\` \n Toplam Erkek: \`${d.ManTotal}\` Toplam Kadın: \`${d.WomanTotal}\` `).join("\n\n") : "Bulunamadı!"}`));

}}