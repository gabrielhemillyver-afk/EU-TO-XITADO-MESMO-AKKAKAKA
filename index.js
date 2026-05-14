// ==========================================
// BOT ORG COMPLETO - INDEX.JS
// PREFIXO +
// ==========================================

require("dotenv").config();

const {
Client,
GatewayIntentBits,
PermissionsBitField,
ChannelType,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers
]
});

const prefix = "+";

// ==========================================
// FILAS
// ==========================================

const filas = {
mobile1v1: [],
mobile2v2: [],
mobile3v3: [],
mobile4v4: [],

misto2v2: [],
misto3v3: [],
misto4v4: [],

emu1v1: [],
emu2v2: [],
emu3v3: [],
emu4v4: []
};

const mediadores = [];

// ==========================================
// READY
// ==========================================

client.once("ready", () => {

console.log(`✅ ${client.user.tag} ONLINE`);

});

// ==========================================
// MESSAGE CREATE
// ==========================================

client.on("messageCreate", async message => {

if (message.author.bot) return;

if (!message.content.startsWith(prefix)) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);

const cmd = args.shift().toLowerCase();

// ==========================================
// +ORG
// ==========================================

if (cmd === "org") {

if (!message.member.permissions.has(
PermissionsBitField.Flags.Administrator
)) return;

// ==========================================
// CARGOS
// ==========================================

await message.guild.roles.create({
name: "DONO",
color: "#000000"
});

await message.guild.roles.create({
name: "CEO",
color: "#00ff00"
});

await message.guild.roles.create({
name: "GERENTE",
color: "#ff0000"
});

await message.guild.roles.create({
name: "ADM",
color: "#0011ff"
});

await message.guild.roles.create({
name: "SUP",
color: "#7a00ff"
});

await message.guild.roles.create({
name: "SS",
color: "#00c3ff"
});

await message.guild.roles.create({
name: "MEDIADOR",
color: "#ffaa00"
});

// ==========================================
// CATEGORIAS
// ==========================================

const mobile = await message.guild.channels.create({
name: "📱 MOBILE",
type: ChannelType.GuildCategory
});

const misto = await message.guild.channels.create({
name: "💻 MISTO",
type: ChannelType.GuildCategory
});

const emulador = await message.guild.channels.create({
name: "🖥 EMULADOR",
type: ChannelType.GuildCategory
});

const mediador = await message.guild.channels.create({
name: "🏦 MEDIADOR",
type: ChannelType.GuildCategory
});

// ==========================================
// MOBILE
// ==========================================

const mobile1v1 = await message.guild.channels.create({
name: "🎰1x1-mobile",
type: ChannelType.GuildText,
parent: mobile.id
});

await message.guild.channels.create({
name: "🎰2x2-mobile",
type: ChannelType.GuildText,
parent: mobile.id
});

await message.guild.channels.create({
name: "🎰3x3-mobile",
type: ChannelType.GuildText,
parent: mobile.id
});

await message.guild.channels.create({
name: "🎰4x4-mobile",
type: ChannelType.GuildText,
parent: mobile.id
});

// ==========================================
// MISTO
// ==========================================

await message.guild.channels.create({
name: "💻2x2-misto",
type: ChannelType.GuildText,
parent: misto.id
});

await message.guild.channels.create({
name: "💻3x3-misto",
type: ChannelType.GuildText,
parent: misto.id
});

await message.guild.channels.create({
name: "💻4x4-misto",
type: ChannelType.GuildText,
parent: misto.id
});

// ==========================================
// EMULADOR
// ==========================================

await message.guild.channels.create({
name: "🖥1x1-emulador",
type: ChannelType.GuildText,
parent: emulador.id
});

await message.guild.channels.create({
name: "🖥2x2-emulador",
type: ChannelType.GuildText,
parent: emulador.id
});

await message.guild.channels.create({
name: "🖥3x3-emulador",
type: ChannelType.GuildText,
parent: emulador.id
});

await message.guild.channels.create({
name: "🖥4x4-emulador",
type: ChannelType.GuildText,
parent: emulador.id
});

// ==========================================
// MEDIADOR
// ==========================================

await message.guild.channels.create({
name: "👥fila-mediador",
type: ChannelType.GuildText,
parent: mediador.id
});

await message.guild.channels.create({
name: "💸configurar-pix",
type: ChannelType.GuildText,
parent: mediador.id
});

// ==========================================
// EMBED FILA
// ==========================================

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle("🎰 FILA 1X1 MOBILE")
.setDescription(`
🧊 Gelo infinito

💸 VALOR: R$5

👥 Jogadores:
0/2
`)
.setThumbnail(message.guild.iconURL());

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("entrar_1x1")
.setLabel("ENTRAR")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("sair_1x1")
.setLabel("SAIR")
.setStyle(ButtonStyle.Danger)

);

await mobile1v1.send({
embeds: [embed],
components: [row]
});

message.reply("✅ Organização criada");

}

// ==========================================
// +CONFIGURAR
// ==========================================

if (cmd === "configurar") {

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle("⚙️ CONFIGURAÇÃO")
.setDescription(`
🎰 FILAS
⚙️ SISTEMA
📱 SS
🎨 APARÊNCIA
`)
.setThumbnail(message.guild.iconURL());

message.reply({
embeds: [embed]
});

}

// ==========================================
// +MEDIADOR
// ==========================================

if (cmd === "mediador") {

if (!message.member.roles.cache.some(
r => r.name === "MEDIADOR"
)) return;

if (!mediadores.includes(message.author.id)) {
mediadores.push(message.author.id);
}

message.reply("✅ Você entrou na fila mediador");

}

// ==========================================
// +P
// ==========================================

if (cmd === "p") {

const user =
message.mentions.users.first() ||
message.author;

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle(`📊 PERFIL ${user.username}`)
.setDescription(`
🏆 Vitórias: 0

❌ Derrotas: 0

📈 Winrate: 0%
`)
.setThumbnail(user.displayAvatarURL());

message.reply({
embeds: [embed]
});

}

// ==========================================
// +SSMOB
// ==========================================

if (cmd === "ssmob") {

const embed = new EmbedBuilder()
.setColor("#0099ff")
.setTitle("📱 SS MOBILE")
.setDescription(`
Solicitação enviada.
`);

message.reply({
embeds: [embed]
});

}

// ==========================================
// +SSEMU
// ==========================================

if (cmd === "ssemu") {

const embed = new EmbedBuilder()
.setColor("#0099ff")
.setTitle("💻 SS EMULADOR")
.setDescription(`
Solicitação enviada.
`);

message.reply({
embeds: [embed]
});

}

// ==========================================
// +LIMPAR
// ==========================================

if (cmd === "limpar") {

const msgs = await message.channel.messages.fetch();

await message.channel.bulkDelete(msgs);

message.channel.send("✅ Canal limpo");

}

});

// ==========================================
// BOTÕES
// ==========================================

client.on("interactionCreate", async interaction => {

if (!interaction.isButton()) return;

// ==========================================
// ENTRAR FILA
// ==========================================

if (interaction.customId === "entrar_1x1") {

if (filas.mobile1v1.includes(interaction.user.id))
return interaction.reply({
content: "❌ Você já entrou",
ephemeral: true
});

filas.mobile1v1.push(interaction.user.id);

await interaction.reply({
content: "✅ Entrou na fila",
ephemeral: true
});

// ==========================================
// COMPLETOU
// ==========================================

if (filas.mobile1v1.length >= 2) {

const p1 = filas.mobile1v1[0];
const p2 = filas.mobile1v1[1];

filas.mobile1v1.shift();
filas.mobile1v1.shift();

const canal = await interaction.guild.channels.create({
name: `🎰aposta-${interaction.user.username}`,
type: ChannelType.GuildText
});

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle("🎰 APOSTA ENCONTRADA")
.setDescription(`
👤 <@${p1}>
👤 <@${p2}>

💸 VALOR: R$5
`)
.setThumbnail(interaction.guild.iconURL());

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("confirmar")
.setLabel("Confirmar")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("cancelar")
.setLabel("Cancelar")
.setStyle(ButtonStyle.Danger)

);

await canal.send({
content: `<@${p1}> <@${p2}>`,
embeds: [embed],
components: [row]
});

}

}

// ==========================================
// CANCELAR
// ==========================================

if (interaction.customId === "cancelar") {

await interaction.channel.delete();

}

// ==========================================
// CONFIRMAR
// ==========================================

if (interaction.customId === "confirmar") {

await interaction.channel.bulkDelete(100);

const mediador = mediadores[0];

const embed = new EmbedBuilder()
.setColor("#ffaa00")
.setTitle("🏦 MEDIADOR CHAMADO")
.setDescription(`
👨‍💼 Mediador:
<@${mediador || interaction.user.id}>

💸 Envie pagamento
`)
.setThumbnail(interaction.guild.iconURL());

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("fornecer")
.setLabel("Fornecer Sala")
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("finalizar")
.setLabel("Finalizar")
.setStyle(ButtonStyle.Success)

);

await interaction.channel.send({
embeds: [embed],
components: [row]
});

}

// ==========================================
// FORNECER SALA
// ==========================================

if (interaction.customId === "fornecer") {

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle("🎮 SALA FORNECIDA")
.setDescription(`
🆔 ID: 123456

🔐 SENHA: 9999
`)
.setThumbnail(interaction.guild.iconURL());

await interaction.reply({
embeds: [embed]
});

}

// ==========================================
// FINALIZAR
// ==========================================

if (interaction.customId === "finalizar") {

const embed = new EmbedBuilder()
.setColor("#00ff88")
.setTitle("🏆 APOSTA FINALIZADA")
.setDescription(`
🥇 Vencedor definido.

💸 Pagamento enviado.
`);

await interaction.reply({
embeds: [embed]
});

setTimeout(() => {
interaction.channel.delete();
}, 5000);

}

});

client.login(process.env.TOKEN);
