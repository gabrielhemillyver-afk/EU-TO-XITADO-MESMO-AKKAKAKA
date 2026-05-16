const {
Client,
GatewayIntentBits,
PermissionsBitField,
ChannelType,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
StringSelectMenuBuilder,
ModalBuilder,
TextInputBuilder,
TextInputStyle
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const PREFIX = "!";
const TOKEN = process.env.TOKEN;

// ========================================
// READY
// ========================================

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ========================================
// DONO
// ========================================

function isDono(member) {

const cargo =
member.guild.roles.cache.find(
r => r.name === "DONO"
);

if (!cargo) return true;

return member.roles.cache.has(cargo.id);

}

// ========================================
// STAFF
// ========================================

function isStaff(member) {

return member.roles.cache.some(r =>
[
"DONO",
"SUB DONO",
"SUPORTE"
].includes(r.name)
);

}

// ========================================
// COMANDOS
// ========================================

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(PREFIX)) return;

const args =
message.content
.slice(PREFIX.length)
.trim()
.split(/ +/);

const command =
args.shift().toLowerCase();

// ========================================
// !XIT
// ========================================

if (command === "xit") {

if (!message.member.permissions.has(
PermissionsBitField.Flags.Administrator
)) return;

const cargos = [

["DONO", "#000000"],
["SUB DONO", "#000000"],
["SUPORTE", "#00008B"],
["MOD APK", "#87CEFA"],
["IPHONE", "#00FFFF"],
["DISCORD.GG", "#FFFF00"]

];

for (const cargo of cargos) {

if (!message.guild.roles.cache.find(
r => r.name === cargo[0]
)) {

await message.guild.roles.create({
name: cargo[0],
color: cargo[1]
});

}

}

const estrutura = [

{
categoria: "📌 RECEPÇÃO",
canais: [
"📢・avisos",
"👤・crie-seu-painel",
"🔗・url",
"🎁・verificação",
"🎁・rewards",
"⚙️・atualizações",
"📨・rede-sociais"
]
},

{
categoria: "🎫 TICKET SUPORTE",
canais: [
"🎫・abrir-ticket",
"🌟・avaliação-ticket"
]
},

{
categoria: "🍎 IOS",
canais: [
"☕・certificado・gbox",
"🍎・ios-menu",
"🛠️・auxílio-ios",
"🍎・ffh4x-ios",
"🍎・ffh4x-safe",
"🍎・ffh4x-rage",  
"🍎・holograma-ios",
"🍎・proxy-ios",
"🍎・combo-ios-apostado",
"🍎・otimização-ios"
]
},

{
categoria: "🤖 ANDROID",
canais: [
"🏅・m0d・4pk・andr0id",
"🏅・ffh4xhg・android",
"🏅・mod・safe・dripclient",
"🏅・passador・de・replay・android",
"🏅・ffh4xlite・android",
"🏅・ffh4xbypass・android",
"🏅・proxy・android・external",
"🏅・pack・e・otimização・full",
"🏅・combo・apostado・android",
"🛠️・auxílio・android",
"🌌・holograma・android",
"🎛️・painel・legit",
"🎯・gerador・de・sensi・android"
]
}

];

for (const item of estrutura) {

const categoria =
await message.guild.channels.create({
name: item.categoria,
type: ChannelType.GuildCategory
});

for (const canal of item.canais) {

await message.guild.channels.create({
name: canal,
type: ChannelType.GuildText,
parent: categoria.id
});

}

}

await message.guild.channels.create({
name: "📜・logs",
type: ChannelType.GuildText
});

message.reply("✅ servidor criado");

}

// ========================================
// !SUP
// ========================================

if (command === "sup") {

if (!isDono(message.member))
return;

const embed = new EmbedBuilder()

.setTitle("🎫 CENTRAL DE SUPORTE")

.setDescription(`
> Escolha abaixo qual suporte deseja.

🍎 SUPORTE IOS
🤖 SUPORTE ANDROID
🌐 SUPORTE GERAL
`)

.setColor("#8000ff")

.setImage("URL_DA_IMAGEM");

const menu =
new StringSelectMenuBuilder()

.setCustomId("abrir_ticket")

.setPlaceholder(
"Selecionar suporte"
)

.addOptions([

{
label: "SUPORTE IOS",
emoji: "🍎",
description: "Abrir suporte IOS",
value: "ios"
},

{
label: "SUPORTE ANDROID",
emoji: "🤖",
description: "Abrir suporte Android",
value: "android"
},

{
label: "SUPORTE GERAL",
emoji: "🌐",
description: "Abrir suporte Geral",
value: "geral"
}

]);

await message.channel.send({

embeds: [embed],

components: [

new ActionRowBuilder()
.addComponents(menu)

]

});

}

// ========================================
// !M
// ========================================

if (command === "m") {

if (!isDono(message.member))
return;

const botao =
new ButtonBuilder()

.setCustomId("abrir_modal_m")

.setLabel("📨 Abrir Formulário")

.setStyle(ButtonStyle.Primary);

await message.channel.send({

content: "📨 clique abaixo",

components: [

new ActionRowBuilder()
.addComponents(botao)

]

});

}

});

// ========================================
// INTERAÇÕES
// ========================================

client.on(
"interactionCreate",
async interaction => {

// ========================================
// MODAL M
// ========================================

if (
interaction.isButton() &&
interaction.customId ===
"abrir_modal_m"
) {

const modal =
new ModalBuilder()

.setCustomId("modal_mensagem")

.setTitle("ENVIAR MENSAGEM");

const texto =
new TextInputBuilder()

.setCustomId("texto")

.setLabel("Mensagem")

.setStyle(
TextInputStyle.Paragraph
);

const cor =
new TextInputBuilder()

.setCustomId("cor")

.setLabel("Cor HEX")

.setPlaceholder("#8000ff")

.setStyle(
TextInputStyle.Short
);

modal.addComponents(

new ActionRowBuilder()
.addComponents(texto),

new ActionRowBuilder()
.addComponents(cor)

);

await interaction.showModal(modal);

}

// ========================================
// ENVIAR M
// ========================================

if (
interaction.isModalSubmit() &&
interaction.customId ===
"modal_mensagem"
) {

const texto =
interaction.fields
.getTextInputValue("texto");

const cor =
interaction.fields
.getTextInputValue("cor");

const embed =
new EmbedBuilder()

.setDescription(texto)

.setColor(cor || "#8000ff");

await interaction.channel.send({
embeds: [embed]
});

await interaction.reply({
content: "✅ enviada",
ephemeral: true
});

}

// ========================================
// ABRIR TICKET
// ========================================

if (
interaction.isStringSelectMenu() &&
interaction.customId ===
"abrir_ticket"
) {

const tipo =
interaction.values[0];

let nome = "ticket";

if (tipo === "ios")
nome = "🍎・ios";

if (tipo === "android")
nome = "🤖・android";

if (tipo === "geral")
nome = "🌐・geral";

const canal =
await interaction.guild.channels.create({

name:
`${nome}-${interaction.user.username}`,

type: ChannelType.GuildText,

permissionOverwrites: [

{
id: interaction.guild.id,
deny: [
PermissionsBitField.Flags.ViewChannel
]
},

{
id: interaction.user.id,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
},

{
id: interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
)?.id,

allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
},

{
id: interaction.guild.roles.cache.find(
r => r.name === "DONO"
)?.id,

allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
},

{
id: interaction.guild.roles.cache.find(
r => r.name === "SUB DONO"
)?.id,

allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages,
PermissionsBitField.Flags.ReadMessageHistory
]
}

]

});

// ========================================
// BOTÕES
// ========================================

const assumir =
new ButtonBuilder()

.setCustomId("assumir_ticket")

.setLabel("✅ ASSUMIR")

.setStyle(ButtonStyle.Success);

const sair =
new ButtonBuilder()

.setCustomId("sair_ticket")

.setLabel("🚪 SAIR")

.setStyle(ButtonStyle.Secondary);

const fechar =
new ButtonBuilder()

.setCustomId("fechar_ticket")

.setLabel("🔒 FECHAR")

.setStyle(ButtonStyle.Danger);

// ========================================
// EMBED TICKET
// ========================================

const embed =
new EmbedBuilder()

.setTitle("🎫 TICKET ABERTO")

.setDescription(`
👋 Olá ${interaction.user},

🔔 Seu ticket foi aberto.

⏳ Aguarde algum suporte assumir.
`)

.setColor("#8000ff")

.setImage("URL_DA_IMAGEM");

await canal.send({

content: `${interaction.user}`,

embeds: [embed],

components: [

new ActionRowBuilder()
.addComponents(
assumir,
sair,
fechar
)

]

});

await interaction.reply({

content:
`✅ ticket criado: ${canal}`,

ephemeral: true

});

}

// ========================================
// ASSUMIR
// ========================================

if (
interaction.isButton() &&
interaction.customId ===
"assumir_ticket"
) {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ sem permissão",
ephemeral: true
});

}

await interaction.channel.send(`
✅ ${interaction.user}
assumiu o ticket.
`);

await interaction.reply({
content: "✅ assumido",
ephemeral: true
});

}

// ========================================
// SAIR
// ========================================

if (
interaction.isButton() &&
interaction.customId ===
"sair_ticket"
) {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ sem permissão",
ephemeral: true
});

}

await interaction.channel.send(`
🚪 ${interaction.user}
saiu do ticket.
`);

await interaction.reply({
content: "✅ saiu",
ephemeral: true
});

}

// ========================================
// FECHAR
// ========================================

if (
interaction.isButton() &&
interaction.customId ===
"fechar_ticket"
) {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ sem permissão",
ephemeral: true
});

}

await interaction.reply({
content: "🔒 fechando...",
ephemeral: true
});

setTimeout(() => {
interaction.channel.delete();
}, 3000);

}

});

client.login(TOKEN);
