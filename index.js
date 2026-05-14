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
const carrinhos = {};
const suportePaineis = {};

// ======================================================
// READY
// ======================================================

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ======================================================
// FUNÇÕES
// ======================================================

function isDono(member) {

return member.roles.cache.some(r =>
r.name === "DONO"
);

}

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

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

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

await message.reply("✅ servidor criado");

}

// ======================================================
// !M
// ======================================================

if (command === "m") {

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const modal = new ModalBuilder()
.setCustomId("modal_m")
.setTitle("CRIAR EMBED");

const texto = new TextInputBuilder()
.setCustomId("texto")
.setLabel("Mensagem")
.setStyle(TextInputStyle.Paragraph)
.setRequired(true);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("Cor HEX")
.setPlaceholder("#8000ff")
.setStyle(TextInputStyle.Short)
.setRequired(true);

modal.addComponents(
new ActionRowBuilder().addComponents(texto),
new ActionRowBuilder().addComponents(cor)
);

await message.channel.send({
content: "Clique abaixo",
components: [
new ActionRowBuilder().addComponents(
new ButtonBuilder()
.setCustomId("abrir_m")
.setLabel("📨 Criar")
.setStyle(ButtonStyle.Primary)
)
]
});

message.modalData = modal;

}

// ======================================================
// VENDAS
// ======================================================

if (command === "vendas") {

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const id = Date.now().toString();

paineis[id] = {

titulo: "NOVO PAINEL",

texto: "Configure na engrenagem",

imagem: "",

thumbnail: "",

footer: "",

cor: "#8000ff",

pix: "",

textoPix: "",

tempo: 600000,

produtos: []

};

const painel = paineis[id];

const embed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(painel.texto)

.setColor(painel.cor);

const menu = new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Nenhum produto");

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

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const id = Date.now().toString();

suportePaineis[id] = {

titulo: "🎫 SUPORTE",

texto: "Abra suporte abaixo",

cor: "#8000ff",

imagem: "",

thumbnail: "",

footer: ""

};

const embed = new EmbedBuilder()

.setTitle("🎫 SUPORTE")

.setDescription("Abra suporte abaixo")

.setColor("#8000ff");

const menu = new StringSelectMenuBuilder()

.setCustomId(`ticket_${id}`)

.setPlaceholder("Abrir suporte")

.addOptions([
{
label: "SUPORTE",
description: "Ajuda geral",
value: "1"
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

if (!isStaff(message.member))
return message.reply("❌ apenas staff");

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 bloqueado");

}

// ======================================================
// UNLOCK
// ======================================================

if (command === "unlock") {

if (!isStaff(message.member))
return message.reply("❌ apenas staff");

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 desbloqueado");

}

// ======================================================
// CLEAR
// ======================================================

if (command === "clear") {

if (!isStaff(message.member))
return message.reply("❌ apenas staff");

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
// BOTÕES
// ======================================================

if (interaction.isButton()) {

// ======================================================
// !M
// ======================================================

if (interaction.customId === "abrir_m") {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const modal = new ModalBuilder()
.setCustomId("modal_m")
.setTitle("CRIAR EMBED");

const texto = new TextInputBuilder()
.setCustomId("texto")
.setLabel("Mensagem")
.setStyle(TextInputStyle.Paragraph);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("Cor HEX")
.setPlaceholder("#8000ff")
.setStyle(TextInputStyle.Short);

modal.addComponents(
new ActionRowBuilder().addComponents(texto),
new ActionRowBuilder().addComponents(cor)
);

await interaction.showModal(modal);

}

// ======================================================
// CONFIG VENDAS
// ======================================================

if (interaction.customId.startsWith("config_")) {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const id = interaction.customId.replace("config_", "");

const modal = new ModalBuilder()
.setCustomId(`modal_config_${id}`)
.setTitle("CONFIG VENDAS");

const titulo = new TextInputBuilder()
.setCustomId("titulo")
.setLabel("Nome Painel")
.setStyle(TextInputStyle.Short);

const texto = new TextInputBuilder()
.setCustomId("texto")
.setLabel("Texto Painel")
.setStyle(TextInputStyle.Paragraph);

const produto = new TextInputBuilder()
.setCustomId("produto")
.setLabel("Produto")
.setStyle(TextInputStyle.Short);

const valor = new TextInputBuilder()
.setCustomId("valor")
.setLabel("Valor")
.setStyle(TextInputStyle.Short);

const pix = new TextInputBuilder()
.setCustomId("pix")
.setLabel("PIX")
.setStyle(TextInputStyle.Short);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(texto),
new ActionRowBuilder().addComponents(produto),
new ActionRowBuilder().addComponents(valor),
new ActionRowBuilder().addComponents(pix)
);

await interaction.showModal(modal);

}

}

// ======================================================
// MODAL
// ======================================================

if (interaction.isModalSubmit()) {

// ======================================================
// !M
// ======================================================

if (interaction.customId === "modal_m") {

const texto =
interaction.fields.getTextInputValue("texto");

const cor =
interaction.fields.getTextInputValue("cor");

const embed = new EmbedBuilder()
.setDescription(texto)
.setColor(cor);

await interaction.reply({
embeds: [embed]
});

}

// ======================================================
// CONFIG VENDAS
// ======================================================

if (interaction.customId.startsWith("modal_config_")) {

const id =
interaction.customId.replace("modal_config_", "");

const painel = paineis[id];

painel.titulo =
interaction.fields.getTextInputValue("titulo");

painel.texto =
interaction.fields.getTextInputValue("texto");

const produto =
interaction.fields.getTextInputValue("produto");

const valor =
interaction.fields.getTextInputValue("valor");

painel.pix =
interaction.fields.getTextInputValue("pix");

painel.produtos.push({
nome: produto,
valor: valor
});

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

}

// ======================================================
// MENU
// ======================================================

if (interaction.isStringSelectMenu()) {

// ======================================================
// COMPRAR
// ======================================================

if (interaction.customId.startsWith("comprar_")) {

const id =
interaction.customId.replace("comprar_", "");

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

carrinhos[canal.id] = {
confirmado: false
};

const embed = new EmbedBuilder()

.setTitle("🛒 CARRINHO")

.setDescription(`
💳 PIX:
${painel.pix}

${painel.textoPix}
`)

.setColor(painel.cor);

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

if (!carrinhos[canal.id]?.confirmado) {

canal.delete().catch(() => {});

}

}, painel.tempo);

}

}

});

client.login(TOKEN);
