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
const PREFIX = "!x";

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const paineis = {};
const suportePaineis = {};
const carrinhos = {};

// ========================================
// READY
// ========================================

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ========================================
// FUNÇÕES
// ========================================

function isDono(member) {

const cargo = member.guild.roles.cache.find(
r => r.name === "DONO"
);

if (!cargo) return true;

return member.roles.cache.has(cargo.id);

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

// ========================================
// COMANDOS
// ========================================

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(PREFIX)) return;

const args =
message.content.slice(PREFIX.length).trim().split(/ +/);

const command = args.shift().toLowerCase();

// ========================================
// !XIT
// ========================================

if (command === "it") {

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

message.reply("✅ cargos criados");

}

// ========================================
// !XM
// ========================================

if (command === "m") {

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const botao = new ButtonBuilder()

.setCustomId("abrir_embed")

.setLabel("📨 Criar Embed")

.setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(botao);

message.channel.send({
content: "Clique abaixo",
components: [row]
});

}

// ========================================
// !XVENDAS
// ========================================

if (command === "vendas") {

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const id = Date.now().toString();

paineis[id] = {

mensagemId: "",
canalId: "",

titulo: "NOVO PAINEL",

texto: "Configure tudo na engrenagem",

imagem: "",

thumbnail: "",

footer: "",

cor: "#8000ff",

pix: "",

textoPix: "",

url: "",

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

.setPlaceholder("Nenhum produto")

.addOptions([
{
label: "Nenhum produto",
description: "Configure na engrenagem",
value: "none"
}
]);

const engrenagem = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const row1 =
new ActionRowBuilder().addComponents(menu);

const row2 =
new ActionRowBuilder().addComponents(engrenagem);

const painelMsg = await message.channel.send({
embeds: [embed],
components: [row1, row2]
});

paineis[id].mensagemId = painelMsg.id;
paineis[id].canalId = message.channel.id;

}

// ========================================
// !XSUP
// ========================================

if (command === "sup") {

if (!isDono(message.member))
return message.reply("❌ apenas DONO");

const id = Date.now().toString();

suportePaineis[id] = {

mensagemId: "",
canalId: "",

titulo: "🎫 SUPORTE",

texto: "Abra suporte abaixo",

cor: "#8000ff",

imagem: ""

};

const painel = suportePaineis[id];

const embed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(painel.texto)

.setColor(painel.cor);

const menu = new StringSelectMenuBuilder()

.setCustomId(`ticket_${id}`)

.setPlaceholder("Selecione uma opção")

.addOptions([

{
label: "Suporte",
description: "Ajuda geral",
value: "geral"
},

{
label: "Suporte Android",
description: "Ajuda Android",
value: "android"
},

{
label: "Suporte iOS",
description: "Ajuda iOS",
value: "ios"
}

]);

const engrenagem = new ButtonBuilder()

.setCustomId(`configsup_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const row1 =
new ActionRowBuilder().addComponents(menu);

const row2 =
new ActionRowBuilder().addComponents(engrenagem);

const painelMsg = await message.channel.send({
embeds: [embed],
components: [row1, row2]
});

suportePaineis[id].mensagemId = painelMsg.id;
suportePaineis[id].canalId = message.channel.id;

}

// ========================================
// LOCK
// ========================================

if (command === "lock") {

if (!isStaff(message.member))
return;

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 bloqueado");

}

// ========================================
// UNLOCK
// ========================================

if (command === "unlock") {

if (!isStaff(message.member))
return;

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 desbloqueado");

}

// ========================================
// CLEAR
// ========================================

if (command === "clear") {

if (!isStaff(message.member))
return;

const quantidade = parseInt(args[0]);

if (!quantidade)
return message.reply("❌ use !xclear 10");

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`🗑️ ${quantidade} apagadas`);

}

});

// ========================================
// INTERAÇÕES
// ========================================

client.on("interactionCreate", async interaction => {

// ========================================
// BOTÕES
// ========================================

if (interaction.isButton()) {

// ========================================
// EMBED
// ========================================

if (interaction.customId === "abrir_embed") {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const modal = new ModalBuilder()

.setCustomId("modal_embed")

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

// ========================================
// CONFIG VENDAS
// ========================================

if (interaction.customId.startsWith("config_")) {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const id =
interaction.customId.replace("config_", "");

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

const url = new TextInputBuilder()
.setCustomId("url")
.setLabel("URL IMAGEM")
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

// ========================================
// CONFIG SUP
// ========================================

if (interaction.customId.startsWith("configsup_")) {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const id =
interaction.customId.replace("configsup_", "");

const modal = new ModalBuilder()

.setCustomId(`modal_sup_${id}`)

.setTitle("CONFIG SUPORTE");

const titulo = new TextInputBuilder()
.setCustomId("titulo")
.setLabel("Título")
.setStyle(TextInputStyle.Short);

const texto = new TextInputBuilder()
.setCustomId("texto")
.setLabel("Texto")
.setStyle(TextInputStyle.Paragraph);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("Cor HEX")
.setStyle(TextInputStyle.Short);

const imagem = new TextInputBuilder()
.setCustomId("imagem")
.setLabel("Imagem URL")
.setStyle(TextInputStyle.Short);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(texto),
new ActionRowBuilder().addComponents(cor),
new ActionRowBuilder().addComponents(imagem)
);

await interaction.showModal(modal);

}

// ========================================
// PAGAMENTO
// ========================================

if (interaction.customId === "confirmar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

carrinhos[interaction.channel.id].confirmado = true;

interaction.reply("✅ pagamento confirmado");

}

// ========================================
// FINALIZAR
// ========================================

if (interaction.customId === "finalizar") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

await interaction.channel.delete();

}

// ========================================
// ACEITAR
// ========================================

if (interaction.customId === "aceitar_ticket") {

if (!isStaff(interaction.member)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

await interaction.channel.permissionOverwrites.set([

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

]);

interaction.reply("✅ ticket assumido");

}

}

// ========================================
// MODAL
// ========================================

if (interaction.isModalSubmit()) {

// ========================================
// EMBED
// ========================================

if (interaction.customId === "modal_embed") {

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

// ========================================
// CONFIG VENDAS
// ========================================

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

const canal =
client.channels.cache.get(painel.canalId);

const mensagem =
await canal.messages.fetch(
painel.mensagemId
);

const novoEmbed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(`
${painel.texto}

💳 PIX:
${painel.pix}
`)

.setColor(painel.cor);

const menuNovo = new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Selecione um produto")

.addOptions(

painel.produtos.map((p, i) => ({
label: p.nome,
description: `R$ ${p.valor}`,
value: `${i}`
}))

);

const botaoNovo = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const rowNovo1 =
new ActionRowBuilder().addComponents(menuNovo);

const rowNovo2 =
new ActionRowBuilder().addComponents(botaoNovo);

await mensagem.edit({
embeds: [novoEmbed],
components: [rowNovo1, rowNovo2]
});

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

// ========================================
// CONFIG SUPORTE
// ========================================

if (interaction.customId.startsWith("modal_sup_")) {

const id =
interaction.customId.replace("modal_sup_", "");

const painel = suportePaineis[id];

painel.titulo =
interaction.fields.getTextInputValue("titulo");

painel.texto =
interaction.fields.getTextInputValue("texto");

painel.cor =
interaction.fields.getTextInputValue("cor");

painel.imagem =
interaction.fields.getTextInputValue("imagem");

const canal =
client.channels.cache.get(painel.canalId);

const mensagem =
await canal.messages.fetch(
painel.mensagemId
);

const embed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(painel.texto)

.setColor(painel.cor);

if (painel.imagem)
embed.setImage(painel.imagem);

const menu = new StringSelectMenuBuilder()

.setCustomId(`ticket_${id}`)

.setPlaceholder("Selecione uma opção")

.addOptions([

{
label: "Suporte",
description: "Ajuda geral",
value: "geral"
},

{
label: "Suporte Android",
description: "Ajuda Android",
value: "android"
},

{
label: "Suporte iOS",
description: "Ajuda iOS",
value: "ios"
}

]);

const engrenagem = new ButtonBuilder()

.setCustomId(`configsup_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const row1 =
new ActionRowBuilder().addComponents(menu);

const row2 =
new ActionRowBuilder().addComponents(engrenagem);

await mensagem.edit({
embeds: [embed],
components: [row1, row2]
});

await interaction.reply({
content: "✅ suporte atualizado",
ephemeral: true
});

}

}

// ========================================
// SELECT MENU
// ========================================

if (interaction.isStringSelectMenu()) {

// ========================================
// COMPRAR
// ========================================

if (interaction.customId.startsWith("comprar_")) {

if (interaction.values[0] === "none") {

return interaction.reply({
content: "❌ nenhum produto",
ephemeral: true
});

}

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

// ========================================
// TICKET
// ========================================

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

.setCustomId("aceitar_ticket")

.setLabel("✅ Aceitar")

.setStyle(ButtonStyle.Success);

const sair = new ButtonBuilder()

.setCustomId("finalizar")

.setLabel("🗑️ Fechar")

.setStyle(ButtonStyle.Danger);

const row =
new ActionRowBuilder().addComponents(
aceitar,
sair
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

});

client.login(TOKEN);
