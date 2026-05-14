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

const TOKEN = "SEU_TOKEN";
const PREFIX = "!";

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const paineis = {};

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ========================================
// MENSAGENS
// ========================================

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(PREFIX)) return;

const args = message.content.slice(PREFIX.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

// ========================================
// SETUP
// ========================================

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
"☕・certificado・gbox"
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
categoria: "📱 IPHONE NOVA ATUALIZAÇÃO",
canais: [
"🏅・ffh4x・ios・rage",
"🏅・byp4ss・full・iphone",
"🏅・painel・iphone・safe",
"🏅・hspescoco・todos・ios",
"🛠️・auxílio-ios"
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

// ========================================
// PAINEL VENDAS
// ========================================

if (command === "vendas") {

const id = Date.now().toString();

paineis[id] = {

produto: "FFH4X ANDROID",
valor: "12,72",
emoji: "🏅",
pix: "SUA_CHAVE_PIX"

};

const painel = paineis[id];

const embed = new EmbedBuilder()

.setTitle("🔥 PAINEL DE VENDAS")

.setDescription(`
✅ Compra automática
✅ Entrega rápida
✅ Suporte ativo

📦 Produto:
${painel.emoji} ${painel.produto}

💸 Valor:
R$ ${painel.valor}
`)

.setColor("#8000ff")

.setImage("https://i.imgur.com/u7D6wzB.png");

const menu = new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Selecione um produto")

.addOptions([
{
label: painel.produto,
description: `R$ ${painel.valor}`,
emoji: painel.emoji,
value: "produto"
}
]);

const row = new ActionRowBuilder().addComponents(menu);

message.channel.send({
embeds: [embed],
components: [row]
});

}

// ========================================
// PAINEL SUPORTE
// ========================================

if (command === "sup") {

const embed = new EmbedBuilder()

.setTitle("🎫 SUPORTE")

.setDescription(`
Selecione abaixo para abrir suporte.
`)

.setColor("#8000ff")

.setImage("https://i.imgur.com/u7D6wzB.png");

const menu = new StringSelectMenuBuilder()

.setCustomId("ticket")

.setPlaceholder("Abrir suporte")

.addOptions([

{
label: "SUPORTE",
description: "Ajuda geral",
value: "sup"
},

{
label: "SUPORTE ANDROID",
description: "Ajuda Android",
value: "android"
},

{
label: "SUPORTE IOS",
description: "Ajuda IOS",
value: "ios"
}

]);

const row = new ActionRowBuilder().addComponents(menu);

message.channel.send({
embeds: [embed],
components: [row]
});

}

// ========================================
// LOCK
// ========================================

if (command === "lock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 canal bloqueado");

}

// ========================================
// UNLOCK
// ========================================

if (command === "unlock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 canal desbloqueado");

}

// ========================================
// CLEAR
// ========================================

if (command === "clear") {

const quantidade = parseInt(args[0]);

if (!quantidade)
return message.reply("❌ use !clear 10");

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`🗑️ ${quantidade} apagadas`);

}

});

// ========================================
// INTERAÇÕES
// ========================================

client.on("interactionCreate", async interaction => {

// ========================================
// SELECT MENU
// ========================================

if (interaction.isStringSelectMenu()) {

// ========================================
// COMPRAR
// ========================================

if (interaction.customId.startsWith("comprar_")) {

const id = interaction.customId.replace("comprar_", "");

const painel = paineis[id];

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

const embed = new EmbedBuilder()

.setTitle("🛒 CARRINHO")

.setDescription(`
📦 Produto:
${painel.emoji} ${painel.produto}

💸 Valor:
R$ ${painel.valor}

💳 PIX:
${painel.pix}
`)

.setColor("#8000ff");

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

setTimeout(() => {
canal.delete().catch(() => {});
}, 600000);

}

// ========================================
// TICKET
// ========================================

if (interaction.customId === "ticket") {

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

.setLabel("✅ ACEITAR")

.setStyle(ButtonStyle.Success);

const fechar = new ButtonBuilder()

.setCustomId("fechar")

.setLabel("🗑️ FECHAR")

.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
aceitar,
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

// ========================================
// BOTÕES
// ========================================

if (interaction.isButton()) {

if (interaction.customId === "finalizar") {

await interaction.channel.delete();

}

if (interaction.customId === "fechar") {

await interaction.channel.delete();

}

if (interaction.customId === "confirmar") {

await interaction.reply({
content: "✅ pagamento confirmado",
ephemeral: true
});

}

if (interaction.customId === "pagar") {

await interaction.reply({
content: "💳 faça o pagamento no PIX enviado",
ephemeral: true
});

}

}

});

client.login(TOKEN);
