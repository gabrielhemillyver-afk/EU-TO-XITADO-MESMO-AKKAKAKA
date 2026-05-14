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

let painelConfig = {
titulo: "🔥 PAINEL DE VENDAS",
descricao: "Selecione um produto abaixo.",
imagem: "https://i.imgur.com/u7D6wzB.png",
cor: "#8000ff",
produto: "FFH4X ANDROID",
valor: "12,72",
pix: "000201010212"
};

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

client.on("messageCreate", async message => {

if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const cmd = args.shift().toLowerCase();

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

message.reply("✅ servidor criado");

}

if (cmd === "vendas") {

const embed = new EmbedBuilder()
.setTitle(painelConfig.titulo)
.setDescription(painelConfig.descricao)
.setColor(painelConfig.cor)
.setImage(painelConfig.imagem);

const menu = new StringSelectMenuBuilder()
.setCustomId("produto")
.setPlaceholder("Selecione um produto")
.addOptions([
{
label: painelConfig.produto,
description: `R$ ${painelConfig.valor}`,
value: "produto1"
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

if (cmd === "sup") {

const embed = new EmbedBuilder()
.setTitle("🎫 SUPORTE")
.setDescription("Selecione uma opção abaixo.")
.setColor("#8000ff")
.setImage(painelConfig.imagem);

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
description: "Android",
value: "android"
},
{
label: "SUPORTE IOS",
description: "iPhone",
value: "ios"
}
]);

const row = new ActionRowBuilder().addComponents(menu);

message.channel.send({
embeds: [embed],
components: [row]
});

}

if (cmd === "lock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: false
}
);

message.reply("🔒 canal bloqueado");

}

if (cmd === "unlock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("🔓 canal desbloqueado");

}

if (cmd === "clear") {

const quantidade = parseInt(args[0]);

if (!quantidade) return;

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`🗑️ apaguei ${quantidade}`);

}

});

client.on("interactionCreate", async interaction => {

if (interaction.isButton()) {

if (interaction.customId === "configurar") {

const modal = new ModalBuilder()
.setCustomId("modal_config")
.setTitle("Configurar Painel");

const titulo = new TextInputBuilder()
.setCustomId("titulo")
.setLabel("Título")
.setStyle(TextInputStyle.Short)
.setValue(painelConfig.titulo);

const descricao = new TextInputBuilder()
.setCustomId("descricao")
.setLabel("Descrição")
.setStyle(TextInputStyle.Paragraph)
.setValue(painelConfig.descricao);

const imagem = new TextInputBuilder()
.setCustomId("imagem")
.setLabel("URL da imagem")
.setStyle(TextInputStyle.Short)
.setValue(painelConfig.imagem);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("Cor HEX")
.setStyle(TextInputStyle.Short)
.setValue(painelConfig.cor);

const produto = new TextInputBuilder()
.setCustomId("produto")
.setLabel("Nome do produto + valor")
.setStyle(TextInputStyle.Short)
.setValue(`${painelConfig.produto}|${painelConfig.valor}`);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(descricao),
new ActionRowBuilder().addComponents(imagem),
new ActionRowBuilder().addComponents(cor),
new ActionRowBuilder().addComponents(produto)
);

await interaction.showModal(modal);

}

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

if (interaction.customId === "fechar_ticket") {

await interaction.reply("🗑️ fechando");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

if (interaction.customId === "confirmar_pagamento") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporte.id)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.reply("✅ pagamento confirmado");

}

if (interaction.customId === "finalizar_compra") {

interaction.reply("🗑️ finalizando");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

}

if (interaction.isModalSubmit()) {

if (interaction.customId === "modal_config") {

const produtoInfo = interaction.fields.getTextInputValue("produto").split("|");

painelConfig = {

titulo: interaction.fields.getTextInputValue("titulo"),
descricao: interaction.fields.getTextInputValue("descricao"),
imagem: interaction.fields.getTextInputValue("imagem"),
cor: interaction.fields.getTextInputValue("cor"),
produto: produtoInfo[0],
valor: produtoInfo[1],
pix: painelConfig.pix

};

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

}

if (interaction.isStringSelectMenu()) {

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
${painelConfig.produto}

💸 Valor:
R$ ${painelConfig.valor}

📜 Leia os termos antes de comprar.
`)
.setColor(painelConfig.cor);

const pagar = new ButtonBuilder()
.setCustomId("pagar")
.setLabel("💳 PAGAMENTO")
.setStyle(ButtonStyle.Success);

const suporte = new ButtonBuilder()
.setCustomId("chamar_suporte")
.setLabel("👤 SUPORTE")
.setStyle(ButtonStyle.Primary);

const confirmar = new ButtonBuilder()
.setCustomId("confirmar_pagamento")
.setLabel("✅ CONFIRMAR")
.setStyle(ButtonStyle.Secondary);

const finalizar = new ButtonBuilder()
.setCustomId("finalizar_compra")
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
