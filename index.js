const {
Client,
GatewayIntentBits,
PermissionsBitField,
ChannelType,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
StringSelectMenuBuilder
} = require("discord.js");

const TOKEN = process.env.TOKEN;
const PREFIX = "!";

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const paineis = {};
const tickets = {};
const configs = {};

// ======================================================
// READY
// ======================================================

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ======================================================
// FUNÇÕES
// ======================================================

function isStaff(member) {

return member.roles.cache.some(r =>
[
"DONO",
"SUB DONO",
"SUPORTE"
].includes(r.name)
);

}

// ======================================================
// COMANDOS
// ======================================================

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(PREFIX)) return;

const args = message.content.slice(PREFIX.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

// ======================================================
// SETUP
// ======================================================

if (command === "setup") {

const cargos = [

["DONO", "#000000"],
["SUB DONO", "#000000"],
["SUPORTE", "#00008B"],
["MOD APK", "#87CEFA"],
["IPHONE", "#00FFFF"],
["DISCORD.GG", "#FFFF00"]

];

for (const cargo of cargos) {

if (!message.guild.roles.cache.find(r => r.name === cargo[0])) {

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
categoria: "❓ FAQ ( LOJA )",
canais: [
"⛓️・como-comprar",
"🌐・site-oficial"
]
},

{
categoria: "📌 IMPORTANTE",
canais: [
"📜・termos",
"📊・avaliação",
"📊・avaliação-entregues",
"✅・compras-entregues"
]
},

{
categoria: "🎫 TICKET SUPORTE",
canais: [
"👥・ticket",
"🌟・avaliação-ticket"
]
},

{
categoria: "🍎 CERTIFICADO IOS",
canais: [
"☕・certificado・gbox",
"☕・certificado・esign",
"☕・certificado・scarlet",
"☕・certificado・maplesigner"
]
},

{
categoria: "🤖 ANDROID NOVA ATUALIZAÇÃO",
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
},

{
categoria: "🍎 IPHONE NOVA ATUALIZAÇÃO",
canais: [
"🏅・ffh4x・ios・rage",
"🏅・ffh4x・ios・legit",
"🏅・ios・safe・menu",
"🏅・byp4ss・full・iphone",
"🏅・painel・iphone・safe",
"🏅・painel・ios・premium",
"🏅・hspescoco・todos・ios",
"🏅・ios・drip・premium",
"🏅・combo・apostador・ios",
"🏅・proxy・ios・external",
"🏅・pack・ios・fps",
"🛠️・auxílio-ios",
"🌌・holograma・ios",
"🎯・gerador・de・sensi・ios"
]
}

];

for (const item of estrutura) {

const categoria = await message.guild.channels.create({
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

// ======================================================
// !M
// ======================================================

if (command === "m") {

const cor = args.pop();

const texto = args.join(" ");

if (!texto || !cor)
return message.reply("❌ use !m mensagem cor");

const embed = new EmbedBuilder()
.setDescription(texto)
.setColor(cor);

message.channel.send({
embeds: [embed]
});

}

// ======================================================
// VENDAS
// ======================================================

if (command === "vendas") {

const id = Date.now().toString();

configs[id] = {

painel: "Ghostzada Store",

texto: "✅ Compra automática\n✅ Entrega rápida",

imagem: "https://i.imgur.com/u7D6wzB.png",

thumbnail: "",

footer: "Ghostzada",

cor: "#8000ff",

produto: "FFH4X ANDROID",

emoji: "🏅",

valor: "12,72",

pix: "SUA_CHAVE_PIX",

textoPix: "⚠️ envie comprovante",

tempo: 600000

};

const c = configs[id];

const embed = new EmbedBuilder()

.setTitle(c.painel)

.setDescription(`
${c.texto}

${c.emoji} ${c.produto}
💸 R$ ${c.valor}
`)

.setColor(c.cor)

.setImage(c.imagem)

.setFooter({
text: c.footer
});

if (c.thumbnail)
embed.setThumbnail(c.thumbnail);

const menu = new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Selecione um produto")

.addOptions([
{
label: c.produto,
description: `R$ ${c.valor}`,
emoji: c.emoji,
value: "comprar"
}
]);

const engrenagem = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(engrenagem);

message.channel.send({
embeds: [embed],
components: [row1, row2]
});

}

// ======================================================
// SUPORTE
// ======================================================

if (command === "sup") {

const id = Date.now().toString();

const embed = new EmbedBuilder()

.setTitle("🎫 SUPORTE")

.setDescription("Selecione abaixo")

.setColor("#8000ff");

const menu = new StringSelectMenuBuilder()

.setCustomId(`ticket_${id}`)

.setPlaceholder("Abrir suporte")

.addOptions([

{
label: "SUPORTE",
description: "Ajuda geral",
value: "1"
},

{
label: "SUPORTE IOS",
description: "Ajuda IOS",
value: "2"
},

{
label: "SUPORTE ANDROID",
description: "Ajuda Android",
value: "3"
}

]);

const engrenagem = new ButtonBuilder()

.setCustomId(`configsup_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(engrenagem);

message.channel.send({
embeds: [embed],
components: [row1, row2]
});

}

// ======================================================
// LOCK
// ======================================================

if (command === "lock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 canal bloqueado");

}

// ======================================================
// UNLOCK
// ======================================================

if (command === "unlock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 canal desbloqueado");

}

// ======================================================
// CLEAR
// ======================================================

if (command === "clear") {

const quantidade = parseInt(args[0]);

if (!quantidade)
return message.reply("❌ use !clear 10");

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`🗑️ ${quantidade} apagadas`);

}

});

// ======================================================
// INTERAÇÕES
// ======================================================

client.on("interactionCreate", async interaction => {

// ======================================================
// SELECT MENU
// ======================================================

if (interaction.isStringSelectMenu()) {

// ======================================================
// COMPRAR
// ======================================================

if (interaction.customId.startsWith("comprar_")) {

const id = interaction.customId.replace("comprar_", "");

const c = configs[id];

const canal = await interaction.guild.channels.create({

name: `🛒-${interaction.user.username}`,

type: ChannelType.GuildText,

permissionOverwrites: [

{
id: interaction.guild.roles.everyone,
deny: [PermissionsBitField.Flags.ViewChannel]
},

{
id: interaction.user.id,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages
]
}

]

});

tickets[canal.id] = {
confirmado: false
};

const embed = new EmbedBuilder()

.setTitle("🛒 CARRINHO")

.setDescription(`
📦 Produto:
${c.emoji} ${c.produto}

💸 Valor:
R$ ${c.valor}

💳 PIX:
${c.pix}

${c.textoPix}
`)

.setColor(c.cor);

const pagar = new ButtonBuilder()
.setCustomId("pagar")
.setLabel("💳 PAGAMENTO")
.setStyle(ButtonStyle.Success);

const suporte = new ButtonBuilder()
.setCustomId("suporte")
.setLabel("👤 SUPORTE")
.setStyle(ButtonStyle.Primary);

const confirmar = new ButtonBuilder()
.setCustomId("confirmar")
.setLabel("✅ CONFIRMAR")
.setStyle(ButtonStyle.Secondary);

const finalizar = new ButtonBuilder()
.setCustomId("finalizar")
.setLabel("🗑️ FINALIZAR")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
pagar,
suporte,
confirmar,
finalizar
);

await canal.send({
content: `${interaction.user}`,
embeds: [embed],
components: [row]
});

interaction.reply({
content: `✅ carrinho criado ${canal}`,
ephemeral: true
});

setTimeout(async () => {

if (!tickets[canal.id]?.confirmado) {

canal.delete().catch(() => {});

}

}, c.tempo);

}

// ======================================================
// TICKET
// ======================================================

if (interaction.customId.startsWith("ticket_")) {

const canal = await interaction.guild.channels.create({

name: `🎫-${interaction.user.username}`,

type: ChannelType.GuildText,

permissionOverwrites: [

{
id: interaction.guild.roles.everyone,
deny: [PermissionsBitField.Flags.ViewChannel]
},

{
id: interaction.user.id,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages
]
}

]

});

const aceitar = new ButtonBuilder()
.setCustomId("aceitar")
.setLabel("✅ ACEITAR/")
.setStyle(ButtonStyle.Success);

const sair = new ButtonBuilder()
.setCustomId("sair")
.setLabel("🚪 SAIR")
.setStyle(ButtonStyle.Secondary);

const fechar = new ButtonBuilder()
.setCustomId("fechar")
.setLabel("🗑️ FECHAR")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
aceitar,
sair,
fechar
);

await canal.send({
content: `${interaction.user}`,
components: [row]
});

interaction.reply({
content: `✅ ticket criado ${canal}`,
ephemeral: true
});

}

}

// ======================================================
// BOTÕES
// ======================================================

if (interaction.isButton()) {

if (interaction.customId === "confirmar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

tickets[interaction.channel.id].confirmado = true;

interaction.reply({
content: "✅ pagamento confirmado",
ephemeral: true
});

}

if (interaction.customId === "finalizar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.channel.delete();

}

if (interaction.customId === "fechar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.channel.delete();

}

if (interaction.customId === "aceitar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.reply({
content: "✅ ticket assumido",
ephemeral: true
});

}

}

});

client.login(TOKEN);
