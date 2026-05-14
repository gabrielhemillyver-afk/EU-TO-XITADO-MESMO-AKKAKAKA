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

const prefix = "+";

// ================= CONFIG GLOBAL =================

let painel = {

titulo: "🔥 PAINEL DE VENDAS",

descricao: `
✅ Compra automática
✅ Entrega rápida
✅ Suporte ativo
`,

imagem: "https://i.imgur.com/u7D6wzB.png",

cor: "#8000ff",

produto: "FFH4X ANDROID",

valor: "12,72",

emoji: "🏅",

pix: "000201010212",

textoPix: `
💸 Faça o pagamento via PIX abaixo.

⚡ Após pagar clique em confirmar pagamento.
`

};

// ================= READY =================

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ================= COMANDOS =================

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const cmd = args.shift().toLowerCase();

// ================= SETUP =================

if (cmd === "setup") {

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
},

{
categoria: "🛡️ BYPASS TODOS IOS",
canais: [
"🏅・bypass・todos・ios"
]
},

{
categoria: "📶 BYPASS IOS VIA WIFI",
canais: [
"🛜・xit・via・wifi"
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

message.reply("✅ servidor configurado");

}

// ================= PAINEL VENDAS =================

if (cmd === "vendas") {

const embed = new EmbedBuilder()
.setTitle(painel.titulo)
.setDescription(painel.descricao)
.setColor(painel.cor)
.setImage(painel.imagem);

const menu = new StringSelectMenuBuilder()
.setCustomId("produto")
.setPlaceholder("Selecione um produto")
.addOptions([
{
label: painel.produto,
description: `R$ ${painel.valor}`,
emoji: painel.emoji,
value: "produto"
}
]);

const config = new ButtonBuilder()
.setCustomId("configurar")
.setEmoji("⚙️")
.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(config);

message.channel.send({
embeds: [embed],
components: [row1, row2]
});

}

// ================= SUPORTE =================

if (cmd === "sup") {

const embed = new EmbedBuilder()
.setTitle("🎫 SUPORTE")
.setDescription(`
Selecione uma opção abaixo.
`)
.setColor("#8000ff")
.setImage(painel.imagem);

const menu = new StringSelectMenuBuilder()
.setCustomId("ticket")
.setPlaceholder("Abrir suporte")
.addOptions([
{
label: "SUPORTE",
description: "Suporte geral",
value: "geral"
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

// ================= LOCK =================

if (cmd === "lock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 canal bloqueado");

}

// ================= UNLOCK =================

if (cmd === "unlock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 canal desbloqueado");

}

// ================= CLEAR =================

if (cmd === "clear") {

const quantidade = parseInt(args[0]);

if (!quantidade) return;

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`🗑️ apaguei ${quantidade} mensagens`);

}

});

// ================= INTERAÇÕES =================

client.on("interactionCreate", async interaction => {

// ================= CONFIGURAR =================

if (interaction.isButton()) {

if (interaction.customId === "configurar") {

const modal = new ModalBuilder()
.setCustomId("modal_config")
.setTitle("⚙️ CONFIGURAR PAINEL");

const titulo = new TextInputBuilder()
.setCustomId("titulo")
.setLabel("Título")
.setStyle(TextInputStyle.Short)
.setValue(painel.titulo);

const descricao = new TextInputBuilder()
.setCustomId("descricao")
.setLabel("Descrição")
.setStyle(TextInputStyle.Paragraph)
.setValue(painel.descricao);

const imagem = new TextInputBuilder()
.setCustomId("imagem")
.setLabel("URL DA IMAGEM")
.setStyle(TextInputStyle.Short)
.setValue(painel.imagem);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("COR HEX")
.setStyle(TextInputStyle.Short)
.setValue(painel.cor);

const produto = new TextInputBuilder()
.setCustomId("produto")
.setLabel("PRODUTO|VALOR|EMOJI|PIX")
.setStyle(TextInputStyle.Paragraph)
.setValue(`${painel.produto}|${painel.valor}|${painel.emoji}|${painel.pix}`);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(descricao),
new ActionRowBuilder().addComponents(imagem),
new ActionRowBuilder().addComponents(cor),
new ActionRowBuilder().addComponents(produto)
);

await interaction.showModal(modal);

}

// ================= PAGAMENTO =================

if (interaction.customId === "pagar") {

const embed = new EmbedBuilder()
.setTitle("💳 PAGAMENTO")
.setDescription(`
${painel.textoPix}

🔑 PIX:
${painel.pix}
`)
.setColor(painel.cor);

const confirmar = new ButtonBuilder()
.setCustomId("confirmar_pagamento")
.setLabel("✅ CONFIRMAR")
.setStyle(ButtonStyle.Success);

const suporte = new ButtonBuilder()
.setCustomId("suporte_compra")
.setLabel("👤 SUPORTE")
.setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(
confirmar,
suporte
);

interaction.reply({
embeds: [embed],
components: [row]
});

}

// ================= CONFIRMAR =================

if (interaction.customId === "confirmar_pagamento") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

const dono = interaction.guild.roles.cache.find(
r => r.name === "DONO"
);

const sub = interaction.guild.roles.cache.find(
r => r.name === "SUB DONO"
);

if (
!interaction.member.roles.cache.has(suporte.id) &&
!interaction.member.roles.cache.has(dono.id) &&
!interaction.member.roles.cache.has(sub.id)
) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.reply("✅ pagamento confirmado");

}

// ================= FINALIZAR =================

if (interaction.customId === "finalizar") {

interaction.reply("🗑️ finalizando compra");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

// ================= ACEITAR TICKET =================

if (interaction.customId === "aceitar_ticket") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporte.id)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

await interaction.reply("✅ ticket aceito");

}

// ================= FECHAR TICKET =================

if (interaction.customId === "fechar_ticket") {

interaction.reply("🗑️ fechando ticket");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

}

// ================= MODAL =================

if (interaction.isModalSubmit()) {

if (interaction.customId === "modal_config") {

const produtoInfo =
interaction.fields.getTextInputValue("produto").split("|");

painel.titulo =
interaction.fields.getTextInputValue("titulo");

painel.descricao =
interaction.fields.getTextInputValue("descricao");

painel.imagem =
interaction.fields.getTextInputValue("imagem");

painel.cor =
interaction.fields.getTextInputValue("cor");

painel.produto = produtoInfo[0];
painel.valor = produtoInfo[1];
painel.emoji = produtoInfo[2];
painel.pix = produtoInfo[3];

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

}

// ================= SELECT MENU =================

if (interaction.isStringSelectMenu()) {

// ================= PRODUTO =================

if (interaction.customId === "produto") {

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

📜 Leia os termos antes de comprar.
`)
.setColor(painel.cor);

const pagar = new ButtonBuilder()
.setCustomId("pagar")
.setLabel("💳 PAGAMENTO")
.setStyle(ButtonStyle.Success);

const finalizar = new ButtonBuilder()
.setCustomId("finalizar")
.setLabel("🗑️ FINALIZAR")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
pagar,
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

// ================= TICKET =================

if (interaction.customId === "ticket") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

const dono = interaction.guild.roles.cache.find(
r => r.name === "DONO"
);

const sub = interaction.guild.roles.cache.find(
r => r.name === "SUB DONO"
);

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
},

{
id: suporte.id,
allow: [PermissionsBitField.Flags.ViewChannel]
},

{
id: dono.id,
allow: [PermissionsBitField.Flags.ViewChannel]
},

{
id: sub.id,
allow: [PermissionsBitField.Flags.ViewChannel]
}

]

});

const aceitar = new ButtonBuilder()
.setCustomId("aceitar_ticket")
.setLabel("✅ ACEITAR")
.setStyle(ButtonStyle.Success);

const fechar = new ButtonBuilder()
.setCustomId("fechar_ticket")
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

});

client.login(process.env.TOKEN);
