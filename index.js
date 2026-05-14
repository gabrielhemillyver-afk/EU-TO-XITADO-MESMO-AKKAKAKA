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
TextInputStyle,
SlashCommandBuilder,
REST,
Routes
} = require("discord.js");

// ========================================
// CONFIG
// ========================================

const TOKEN = process.env.TOKEN;

const CLIENT_ID = "COLOCA_CLIENT_ID";

// ========================================
// CLIENT
// ========================================

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

// ========================================
// DATABASE MEMÓRIA
// ========================================

const vendasPaineis = {};
const suportePaineis = {};

// ========================================
// FUNÇÃO DONO
// ========================================

function isDono(member) {

return member.roles.cache.some(
r => r.name === "DONO"
);

}

// ========================================
// SLASH
// ========================================

const commands = [

new SlashCommandBuilder()
.setName("setup")
.setDescription("Criar servidor"),

new SlashCommandBuilder()
.setName("vendas")
.setDescription("Criar painel vendas"),

new SlashCommandBuilder()
.setName("sup")
.setDescription("Criar painel suporte"),

new SlashCommandBuilder()
.setName("lock")
.setDescription("Bloquear canal"),

new SlashCommandBuilder()
.setName("unlock")
.setDescription("Desbloquear canal"),

new SlashCommandBuilder()
.setName("clear")
.setDescription("Apagar mensagens")
.addIntegerOption(option =>
option
.setName("quantidade")
.setDescription("Quantidade")
.setRequired(true)
)

].map(cmd => cmd.toJSON());

// ========================================
// READY
// ========================================

client.once("ready", async () => {

console.log(`${client.user.tag} ONLINE`);

const rest = new REST({ version: "10" }).setToken(TOKEN);

await rest.put(
Routes.applicationCommands(CLIENT_ID),
{
body: commands
}
);

console.log("Slash carregado.");

});

// ========================================
// INTERAÇÕES
// ========================================

client.on("interactionCreate", async interaction => {

// ========================================
// SLASH
// ========================================

if (interaction.isChatInputCommand()) {

// ========================================
// PERMISSÃO DONO
// ========================================

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

// ========================================
// SETUP
// ========================================

if (interaction.commandName === "setup") {

const cargos = [

["DONO", "#000000"],
["SUB DONO", "#000000"],
["SUPORTE", "#00008B"],
["MOD APK", "#87CEFA"],
["IPHONE", "#00FFFF"],
["DISCORD.GG", "#FFFF00"]

];

for (const cargo of cargos) {

if (!interaction.guild.roles.cache.find(r => r.name === cargo[0])) {

await interaction.guild.roles.create({
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
}

];

for (const item of estrutura) {

const categoria = await interaction.guild.channels.create({
name: item.categoria,
type: ChannelType.GuildCategory
});

for (const canal of item.canais) {

await interaction.guild.channels.create({
name: canal,
type: ChannelType.GuildText,
parent: categoria.id
});

}

}

await interaction.guild.channels.create({
name: "📜・logs",
type: ChannelType.GuildText
});

interaction.reply("✅ servidor criado");

}

// ========================================
// PAINEL VENDAS
// ========================================

if (interaction.commandName === "vendas") {

const id = Date.now().toString();

vendasPaineis[id] = {

titulo: "🔥 PAINEL DE VENDAS",

descricao: `
✅ Compra automática
✅ Entrega rápida
✅ Suporte ativo
`,

imagem: "https://i.imgur.com/u7D6wzB.png",

cor: "#8000ff",

thumbnail: "",

footer: "Ghostzada Store",

produto: "FFH4X ANDROID",

valor: "12,72",

emoji: "🏅",

pix: "000201010212",

textoPix: `
💸 Faça o pagamento via PIX abaixo.
`,

categoriaCarrinho: interaction.channel.parentId,

tempo: 600000

};

const painel = vendasPaineis[id];

const embed = new EmbedBuilder()
.setTitle(painel.titulo)
.setDescription(painel.descricao)
.setColor(painel.cor)
.setImage(painel.imagem)
.setFooter({
text: painel.footer
});

if (painel.thumbnail)
embed.setThumbnail(painel.thumbnail);

const menu = new StringSelectMenuBuilder()
.setCustomId(`produto_${id}`)
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
.setCustomId(`config_venda_${id}`)
.setEmoji("⚙️")
.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(config);

interaction.reply({
embeds: [embed],
components: [row1, row2]
});

}

// ========================================
// SUPORTE
// ========================================

if (interaction.commandName === "sup") {

const id = Date.now().toString();

suportePaineis[id] = {

titulo: "🎫 SUPORTE",

descricao: `
Abra suporte abaixo.
`,

imagem: "https://i.imgur.com/u7D6wzB.png",

cor: "#8000ff",

footer: "Ghostzada Support",

op1: "SUPORTE",
desc1: "Suporte Geral",

op2: "SUPORTE ANDROID",
desc2: "Ajuda Android",

op3: "SUPORTE IOS",
desc3: "Ajuda IOS"

};

const painel = suportePaineis[id];

const embed = new EmbedBuilder()
.setTitle(painel.titulo)
.setDescription(painel.descricao)
.setColor(painel.cor)
.setImage(painel.imagem)
.setFooter({
text: painel.footer
});

const menu = new StringSelectMenuBuilder()
.setCustomId(`ticket_${id}`)
.setPlaceholder("Abrir suporte")
.addOptions([
{
label: painel.op1,
description: painel.desc1,
value: "1"
},
{
label: painel.op2,
description: painel.desc2,
value: "2"
},
{
label: painel.op3,
description: painel.desc3,
value: "3"
}
]);

const config = new ButtonBuilder()
.setCustomId(`config_sup_${id}`)
.setEmoji("⚙️")
.setStyle(ButtonStyle.Secondary);

const row1 = new ActionRowBuilder().addComponents(menu);
const row2 = new ActionRowBuilder().addComponents(config);

interaction.reply({
embeds: [embed],
components: [row1, row2]
});

}

// ========================================
// LOCK
// ========================================

if (interaction.commandName === "lock") {

await interaction.channel.permissionOverwrites.edit(
interaction.guild.roles.everyone,
{
SendMessages: false
}
);

interaction.reply("🔒 canal bloqueado");

}

// ========================================
// UNLOCK
// ========================================

if (interaction.commandName === "unlock") {

await interaction.channel.permissionOverwrites.edit(
interaction.guild.roles.everyone,
{
SendMessages: true
}
);

interaction.reply("🔓 canal desbloqueado");

}

// ========================================
// CLEAR
// ========================================

if (interaction.commandName === "clear") {

const quantidade =
interaction.options.getInteger("quantidade");

await interaction.channel.bulkDelete(
quantidade,
true
);

interaction.reply(`🗑️ ${quantidade} apagadas`);

}

}

// ========================================
// BOTÕES
// ========================================

if (interaction.isButton()) {

// ========================================
// CONFIG VENDA
// ========================================

if (interaction.customId.startsWith("config_venda_")) {

if (!isDono(interaction.member)) {

return interaction.reply({
content: "❌ apenas DONO",
ephemeral: true
});

}

const id =
interaction.customId.replace("config_venda_", "");

const painel = vendasPaineis[id];

const modal = new ModalBuilder()
.setCustomId(`modal_venda_${id}`)
.setTitle("⚙️ CONFIG VENDAS");

const titulo = new TextInputBuilder()
.setCustomId("titulo")
.setLabel("TITULO")
.setStyle(TextInputStyle.Short)
.setValue(painel.titulo);

const descricao = new TextInputBuilder()
.setCustomId("descricao")
.setLabel("DESCRIÇÃO")
.setStyle(TextInputStyle.Paragraph)
.setValue(painel.descricao);

const imagem = new TextInputBuilder()
.setCustomId("imagem")
.setLabel("IMAGEM URL")
.setStyle(TextInputStyle.Short)
.setValue(painel.imagem);

const cor = new TextInputBuilder()
.setCustomId("cor")
.setLabel("COR HEX")
.setStyle(TextInputStyle.Short)
.setValue(painel.cor);

const produto = new TextInputBuilder()
.setCustomId("produto")
.setLabel("PRODUTO")
.setStyle(TextInputStyle.Short)
.setValue(painel.produto);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(descricao),
new ActionRowBuilder().addComponents(imagem),
new ActionRowBuilder().addComponents(cor),
new ActionRowBuilder().addComponents(produto)
);

await interaction.showModal(modal);

}

}

// ========================================
// SELECT MENU
// ========================================

if (interaction.isStringSelectMenu()) {

// ========================================
// COMPRAR
// ========================================

if (interaction.customId.startsWith("produto_")) {

const id =
interaction.customId.replace("produto_", "");

const painel = vendasPaineis[id];

const canal = await interaction.guild.channels.create({
name: `🛒-${interaction.user.username}`,
type: ChannelType.GuildText,

parent: painel.categoriaCarrinho,

permissionOverwrites: [

{
id: interaction.guild.roles.everyone,
deny: [
PermissionsBitField.Flags.ViewChannel
]
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

setTimeout(() => {
canal.delete().catch(() => {});
}, painel.tempo);

}

}

});

client.login(TOKEN);
