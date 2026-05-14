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
nome: "🏅・FFH4X ANDROID",
valor: "12,72"
},
ios: {
nome: "🏅・FFH4X IOS",
valor: "15,00"
},
bypass: {
nome: "🏅・BYPASS IOS",
valor: "20,00"
}
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
.setTitle("🔥 PAINEL DE VENDAS")
.setDescription(`
Selecione um produto abaixo.

✅ Android
✅ iPhone
✅ Bypass
`)
.setColor("#8000ff")
.setImage("https://i.imgur.com/u7D6wzB.png");

const menu = new StringSelectMenuBuilder()
.setCustomId("produto")
.setPlaceholder("Selecione um produto")
.addOptions([
{
label: "FFH4X ANDROID",
description: "Android",
value: "android"
},
{
label: "FFH4X IOS",
description: "iPhone",
value: "ios"
},
{
label: "BYPASS IOS",
description: "Bypass",
value: "bypass"
}
]);

const engrenagem = new ButtonBuilder()
.setCustomId("config")
.setEmoji("⚙️")
.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(engrenagem);

message.channel.send({
embeds: [embed],
components: [row1, row2]
});

}

if (cmd === "sup") {

const embed = new EmbedBuilder()
.setTitle("🎫 SUPORTE")
.setDescription(`
Abra um ticket abaixo.
`)
.setColor("#8000ff")
.setImage("https://i.imgur.com/u7D6wzB.png");

const menu = new StringSelectMenuBuilder()
.setCustomId("ticket")
.setPlaceholder("Selecione uma opção")
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

message.channel.send(`🗑️ apaguei ${quantidade} mensagens`);

}

});

client.on("interactionCreate", async interaction => {

if (interaction.isStringSelectMenu()) {

if (interaction.customId === "produto") {

const produto = produtos[interaction.values[0]];

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
Produto:
${produto.nome}

💸 Valor:
R$ ${produto.valor}
`)
.setColor("#8000ff");

const pagar = new ButtonBuilder()
.setCustomId("pagar")
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

const suporteRole = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

const donoRole = interaction.guild.roles.cache.find(
r => r.name === "DONO"
);

const subRole = interaction.guild.roles.cache.find(
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
id: suporteRole.id,
allow: [PermissionsBitField.Flags.ViewChannel]
},

{
id: donoRole.id,
allow: [PermissionsBitField.Flags.ViewChannel]
},

{
id: subRole.id,
allow: [PermissionsBitField.Flags.ViewChannel]
}

]

});

const aceitar = new ButtonBuilder()
.setCustomId("aceitar")
.setLabel("Aceitar")
.setStyle(ButtonStyle.Success);

const sair = new ButtonBuilder()
.setCustomId("sair")
.setLabel("Sair")
.setStyle(ButtonStyle.Secondary);

const fechar = new ButtonBuilder()
.setCustomId("fechar")
.setLabel("Fechar")
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

if (interaction.isButton()) {

if (interaction.customId === "pagar") {

const embed = new EmbedBuilder()
.setTitle("💳 PAGAMENTO")
.setDescription(`
Escolha uma forma de pagamento.
`)
.setColor("#8000ff");

const pix = new ButtonBuilder()
.setCustomId("pix")
.setLabel("PIX")
.setStyle(ButtonStyle.Success);

const cartao = new ButtonBuilder()
.setCustomId("cartao")
.setLabel("CARTÃO")
.setStyle(ButtonStyle.Primary);

const saldo = new ButtonBuilder()
.setCustomId("saldo")
.setLabel("SALDO")
.setStyle(ButtonStyle.Secondary);

const voltar = new ButtonBuilder()
.setCustomId("voltar")
.setLabel("VOLTAR")
.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
pix,
cartao,
saldo,
voltar
);

interaction.reply({
embeds: [embed],
components: [row]
});

}

if (interaction.customId === "confirmar") {

const suporteRole = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporteRole.id)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.reply("✅ pagamento confirmado");

}

if (interaction.customId === "finalizar") {

const suporteRole = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporteRole.id)) {

return interaction.reply({
content: "❌ apenas suporte",
ephemeral: true
});

}

interaction.reply("🗑️ finalizando");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

if (interaction.customId === "aceitar") {

const suporteRole = interaction.guild.roles.cache.find(
r => r.name === "SUPORTE"
);

if (!interaction.member.roles.cache.has(suporteRole.id)) {

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
},

{
id: interaction.member.id,
allow: [
PermissionsBitField.Flags.ViewChannel,
PermissionsBitField.Flags.SendMessages
]
}

]);

interaction.reply("✅ ticket aceito");

}

if (interaction.customId === "sair") {

await interaction.channel.permissionOverwrites.delete(
interaction.member.id
);

interaction.reply("🚪 você saiu");

}

if (interaction.customId === "fechar") {

interaction.reply("🗑️ fechando ticket");

setTimeout(() => {
interaction.channel.delete().catch(() => {});
}, 3000);

}

}

});

client.login(process.env.TOKEN);
