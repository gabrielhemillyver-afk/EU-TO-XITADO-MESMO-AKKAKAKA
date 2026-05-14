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
} = require('discord.js');

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

const prefix = "+";

const produtos = {
android: {
nome: "FFH4X ANDROID",
valor: "12,72"
},
ios: {
nome: "FFH4X IOS",
valor: "15,00"
}
};

client.once("ready", async () => {

console.log(`${client.user.tag} ONLINE`);

client.guilds.cache.forEach(async guild => {

const cargos = [
{ nome: "DONO", cor: "#000000" },
{ nome: "SUB DONO", cor: "#000000" },
{ nome: "SUPORTE", cor: "#00008B" },
{ nome: "MOD APK", cor: "#87CEFA" },
{ nome: "IPHONE", cor: "#00FFFF" },
{ nome: "DISCORD.GG", cor: "#FFFF00" }
];

for (const cargo of cargos) {
if (!guild.roles.cache.find(r => r.name === cargo.nome)) {
await guild.roles.create({
name: cargo.nome,
color: cargo.cor
});
}
}

});

});

client.on("messageCreate", async message => {

if (message.author.bot) return;

if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const cmd = args.shift().toLowerCase();

if (cmd === "setup") {

const categorias = [
"RECEPÇÃO",
"FAQ ( LOJA )",
"IMPORTANTE",
"TICKET SUPORTE",
"CERTIFICADO IOS",
"ANDROID NOVA ATUALIZAÇÃO",
"IPHONE NOVA ATUALIZAÇÃO",
"BYPASS TODOS IOS"
];

for (const nome of categorias) {

const categoria = await message.guild.channels.create({
name: nome,
type: ChannelType.GuildCategory
});

await message.guild.channels.create({
name: "avisos",
type: ChannelType.GuildText,
parent: categoria.id
});

}

message.reply("Servidor configurado.");

}

if (cmd === "vendas") {

const embed = new EmbedBuilder()
.setTitle("FFH4X RAGE ANDROID 🔥")
.setDescription(`
Seu painel de vendas.

Selecione um produto abaixo.
`)
.setColor("#8000ff")
.setImage("https://i.imgur.com/yourimage.png");

const menu = new StringSelectMenuBuilder()
.setCustomId("produto")
.setPlaceholder("Selecione um Produto")
.addOptions([
{
label: "FFH4X ANDROID",
description: "Produto Android",
value: "android"
},
{
label: "FFH4X IOS",
description: "Produto IOS",
value: "ios"
}
]);

const config = new ButtonBuilder()
.setCustomId("config")
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
.setTitle("Ghostzada")
.setDescription(`
Precisa de ajuda?

Abra um ticket abaixo.
`)
.setColor("#8000ff");

const menu = new StringSelectMenuBuilder()
.setCustomId("ticket")
.setPlaceholder("Selecione uma opção...")
.addOptions([
{
label: "Suporte",
description: "Dúvidas gerais",
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

message.reply("Canal bloqueado.");

}

if (cmd === "unlock") {

await message.channel.permissionOverwrites.edit(
message.guild.roles.everyone,
{
SendMessages: true
}
);

message.reply("Canal desbloqueado.");

}

if (cmd === "clear") {

const quantidade = parseInt(args[0]);

if (!quantidade) return;

await message.channel.bulkDelete(quantidade, true);

message.channel.send(`Apaguei ${quantidade} mensagens.`);

}

});

client.on("interactionCreate", async interaction => {

if (interaction.isStringSelectMenu()) {

if (interaction.customId === "produto") {

const produto = produtos[interaction.values[0]];

const canal = await interaction.guild.channels.create({
name: `carrinho-${interaction.user.username}`,
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
.setTitle("Detalhes da sua compra")
.setDescription(`
Produto: ${produto.nome}

Valor:
R$ ${produto.valor}
`)
.setColor("#8000ff");

const pagamento = new ButtonBuilder()
.setCustomId("pagamento")
.setLabel("Ir para pagamento")
.setStyle(ButtonStyle.Success);

const suporte = new ButtonBuilder()
.setCustomId("suporte")
.setLabel("Chamar suporte")
.setStyle(ButtonStyle.Primary);

const confirmar = new ButtonBuilder()
.setCustomId("confirmar")
.setLabel("Confirmar pagamento")
.setStyle(ButtonStyle.Secondary);

const finalizar = new ButtonBuilder()
.setCustomId("finalizar")
.setLabel("Finalizar")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
pagamento,
suporte,
confirmar,
finalizar
);

canal.send({
content: `${interaction.user}`,
embeds: [embed],
components: [row]
});

interaction.reply({
content: `Seu carrinho foi criado: ${canal}`,
ephemeral: true
});

setTimeout(() => {

if (canal) {
canal.delete().catch(() => {});
}

}, 600000);

}

if (interaction.customId === "ticket") {

const canal = await interaction.guild.channels.create({
name: `ticket-${interaction.user.username}`,
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
.setLabel("Aceitar")
.setStyle(ButtonStyle.Success);

const sair = new ButtonBuilder()
.setCustomId("sair_ticket")
.setLabel("Sair")
.setStyle(ButtonStyle.Secondary);

const fechar = new ButtonBuilder()
.setCustomId("fechar_ticket")
.setLabel("Fechar")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
aceitar,
sair,
fechar
);

canal.send({
content: `${interaction.user}`,
components: [row]
});

interaction.reply({
content: `Ticket criado: ${canal}`,
ephemeral: true
});

}

}

if (interaction.isButton()) {

if (interaction.customId === "pagamento") {

const embed = new EmbedBuilder()
.setTitle("Pagamento")
.setDescription(`
Escolha sua forma de pagamento.
`)
.setColor("#8000ff");

const pix = new ButtonBuilder()
.setCustomId("pix")
.setLabel("Pagar com Pix")
.setStyle(ButtonStyle.Success);

const cartao = new ButtonBuilder()
.setCustomId("cartao")
.setLabel("Pagar com Cartão")
.setStyle(ButtonStyle.Secondary);

const row = new ActionRowBuilder().addComponents(
pix,
cartao
);

interaction.reply({
embeds: [embed],
components: [row]
});

}

if (interaction.customId === "confirmar") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporte.id)) {
return interaction.reply({
content: "Apenas suporte.",
ephemeral: true
});
}

interaction.reply("Pagamento confirmado.");

}

if (interaction.customId === "finalizar") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporte.id)) {
return interaction.reply({
content: "Apenas suporte.",
ephemeral: true
});
}

interaction.reply("Carrinho finalizado.");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

if (interaction.customId === "aceitar_ticket") {

const suporte = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporte.id)) {
return interaction.reply({
content: "Apenas suporte.",
ephemeral: true
});
}

await interaction.channel.permissionOverwrites.edit(
interaction.member.id,
{
ViewChannel: true,
SendMessages: true
}
);

interaction.reply("Ticket aceito.");

}

if (interaction.customId === "sair_ticket") {

await interaction.channel.permissionOverwrites.delete(
interaction.member.id
);

interaction.reply("Você saiu do ticket.");

}

if (interaction.customId === "fechar_ticket") {

interaction.reply("Fechando ticket.");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

}

});

client.login(process.env.TOKEN);
