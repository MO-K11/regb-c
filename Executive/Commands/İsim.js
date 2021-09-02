const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Register = require('../Models/Users') 
const Staff = require('../Models/Staffs')

module.exports = {
conf: {name: 'isim', aliases: ["name"], help: "!isim @Striga/ID İsim Yaş"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.RegisterPermission) && !perms.ExtraPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return; 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const Name = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
const Age = args.slice(1).filter(arg => !isNaN(arg))[0] ?? undefined;

if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!Name) return message.channel.send(nembed.setDescription(`Lütfen geçerli bir isim belirtin.`))
if(!Age || isNaN(Age)) return message.channel.send(nembed.setDescription(`Lütfen geçerli bir yaş belirtin.`))
if(await client.NameGuard(Name)) return message.channel.send(nembed.setDescription(`Lütfen üyenin isminde küfür veya reklam içeren bir metin yazmayın aksi taktirde yetkilerinizi çekicem.`))
if(Name.length > 30) return message.channel.send(nembed.setDescription(`Lütfen üyenin ismini 30 karakteri geçmiyecek şekilde belirtin.`))
if(Age > 99) return message.channel.send(nembed.setDescription(`Lütfen 2 basamaktan daha fazla bir yaş belirtmeyin.`)) 
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendi isminizi güncelleyemezsiniz.`))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(member.roles.cache.get(role.SuspectRole)) return message.channel.send(nembed.setDescription(`${member} adlı üye <@&${role.SuspectRole}> rolüne sahip olduğu için işlem yapılamamakta.`));
if(member.roles.cache.get(role.JailRole)) return message.channel.send(nembed.setDescription(`${member} adlı üye <@&${role.JailRole}> rolüne sahip olduğu için işlem yapılamamakta.`));
if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))

const GuildName = `${member.user.username.includes(config.Tag) ? config.Tag : config.SecondaryTag} ${Name} | ${Age}`;

member.setNickname(GuildName);
member.roles.add(role.ManRoles);
member.roles.remove(role.UnregisterRole);

Register.find({UserID: member.id}, async(err, data) => {
if(err) console.log(err)
if(data.length < 1) return message.channel.send(embed.setDescription(`${member} üyesinin ismi ${message.author} tarafından "${GuildName}" olarak güncellendi.`))

client.channels.cache.get(logs.NameLog).send(new MessageEmbed()
.setDescription(`Üye: ${member.toString()} - **${member.id}**\nYetkili: ${message.author} - **${message.author.id}**\nİsim: "${GuildName}"\nİşlem: İsim Güncelleme`)
.setColor("RANDOM")
.setFooter(""+ moment(Date.now()).format("LLL")+"")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})))
}) 

let userData = new Register({GuildID: message.guild.id, UserID: member.id, Admin: message.author.id, UserNames: GuildName, Role: `İsim Güncelleme`, Sex: "İsim Güncelleme", Date: Date.now()})
userData.save().catch(err => console.log(`İsim datası kayıt edilirken bir sorun ile karşılaştım.`))

}}
