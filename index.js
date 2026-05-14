// ========================================
// GHOSTZADA BOT FULL FIX
// ========================================

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

const PREFIX = "!";
const TOKEN = process.env.TOKEN;

// ========================================
// DATABASE
// ========================================

const paineis = {};
const tickets = {};
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

const cargo =
member.guild.roles.cache.find(
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

const command =
args.shift().toLowerCase();

// ========================================
// !XIT
// ========================================

if (command === "xit") {

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
// !VENDAS
// ========================================

if (command === "vendas") {

if (!isDono(message.member))
return;

const id = Date.now().toString();

paineis[id] = {

mensagemId: "",
canalId: "",

titulo: "NOVO PAINEL",
texto: "Configure na engrenagem",
cor: "#8000ff",
url: "",
pix: "",

produtos: []

};

const embed = new EmbedBuilder()

.setTitle("NOVO PAINEL")

.setDescription("Configure na engrenagem")

.setColor("#8000ff");

const menu = new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Nenhum produto")

.addOptions([
{
label: "Nenhum produto",
description: "Adicione produto",
value: "none"
}
]);

const config = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const produto = new ButtonBuilder()

.setCustomId(`produto_${id}`)

.setLabel("➕ Produto")

.setStyle(ButtonStyle.Success);

const painel =
await message.channel.send({

embeds: [embed],

components: [

new ActionRowBuilder().addComponents(menu),

new ActionRowBuilder().addComponents(
config,
produto
)

]

});

paineis[id].mensagemId = painel.id;
paineis[id].canalId = message.channel.id;

}

// ========================================
// !SUP
// ========================================

if (command === "sup") {

if (!isDono(message.member))
return;

const id = Date.now().toString();

tickets[id] = {

mensagemId: "",
canalId: "",

titulo: "🎫 SUPORTE",
texto: "Abra suporte abaixo",
cor: "#8000ff",
url: ""

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
description: "Abrir ticket",
value: "ticket"
}
]);

const config = new ButtonBuilder()

.setCustomId(`config_ticket_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const painel =
await message.channel.send({

embeds: [embed],

components: [

new ActionRowBuilder().addComponents(menu),

new ActionRowBuilder().addComponents(config)

]

});

tickets[id].mensagemId = painel.id;
tickets[id].canalId = message.channel.id;

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
// CONFIG VENDAS
// ========================================

if (interaction.customId.startsWith("config_")) {

if (!isDono(interaction.member))
return;

const id =
interaction.customId.replace("config_", "");

const modal = new ModalBuilder()

.setCustomId(`modal_vendas_${id}`)

.setTitle("CONFIG VENDAS");

const titulo = new TextInputBuilder()

.setCustomId("titulo")

.setLabel("Nome painel")

.setStyle(TextInputStyle.Short);

const texto = new TextInputBuilder()

.setCustomId("texto")

.setLabel("Texto painel")

.setStyle(TextInputStyle.Paragraph);

const url = new TextInputBuilder()

.setCustomId("url")

.setLabel("URL imagem")

.setStyle(TextInputStyle.Short);

const cor = new TextInputBuilder()

.setCustomId("cor")

.setLabel("Cor HEX")

.setStyle(TextInputStyle.Short);

const pix = new TextInputBuilder()

.setCustomId("pix")

.setLabel("PIX")

.setStyle(TextInputStyle.Short);

modal.addComponents(
new ActionRowBuilder().addComponents(titulo),
new ActionRowBuilder().addComponents(texto),
new ActionRowBuilder().addComponents(url),
new ActionRowBuilder().addComponents(cor),
new ActionRowBuilder().addComponents(pix)
);

await interaction.showModal(modal);

}

// ========================================
// PRODUTO
// ========================================

if (interaction.customId.startsWith("produto_")) {

if (!isDono(interaction.member))
return;

const id =
interaction.customId.replace("produto_", "");

const modal = new ModalBuilder()

.setCustomId(`modal_produto_${id}`)

.setTitle("ADICIONAR PRODUTO");

const produto = new TextInputBuilder()

.setCustomId("produto")

.setLabel("Nome produto")

.setStyle(TextInputStyle.Short);

const valor = new TextInputBuilder()

.setCustomId("valor")

.setLabel("Valor")

.setStyle(TextInputStyle.Short);

const emoji = new TextInputBuilder()

.setCustomId("emoji")

.setLabel("Emoji")

.setStyle(TextInputStyle.Short);

modal.addComponents(
new ActionRowBuilder().addComponents(produto),
new ActionRowBuilder().addComponents(valor),
new ActionRowBuilder().addComponents(emoji)
);

await interaction.showModal(modal);

}

}

// ========================================
// MODAIS
// ========================================

if (interaction.isModalSubmit()) {

// ========================================
// MODAL VENDAS
// ========================================

if (interaction.customId.startsWith("modal_vendas_")) {

const id =
interaction.customId.replace("modal_vendas_", "");

const painel = paineis[id];

painel.titulo =
interaction.fields.getTextInputValue("titulo");

painel.texto =
interaction.fields.getTextInputValue("texto");

painel.url =
interaction.fields.getTextInputValue("url");

painel.cor =
interaction.fields.getTextInputValue("cor");

painel.pix =
interaction.fields.getTextInputValue("pix");

const canal =
client.channels.cache.get(painel.canalId);

const mensagem =
await canal.messages.fetch(
painel.mensagemId
);

const embed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(`
${painel.texto}

💳 PIX:
${painel.pix}
`)

.setColor(painel.cor);

if (painel.url)
embed.setImage(painel.url);

const menu =
new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Selecionar produto");

if (painel.produtos.length <= 0) {

menu.addOptions([
{
label: "Nenhum produto",
description: "Adicione produto",
value: "none"
}
]);

} else {

menu.addOptions(

painel.produtos.map((p, i) => ({
label: p.nome,
description: `R$ ${p.valor}`,
emoji: p.emoji,
value: `${i}`
}))

);

}

const config = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const produtoBtn = new ButtonBuilder()

.setCustomId(`produto_${id}`)

.setLabel("➕ Produto")

.setStyle(ButtonStyle.Success);

await mensagem.edit({

embeds: [embed],

components: [

new ActionRowBuilder().addComponents(menu),

new ActionRowBuilder().addComponents(
config,
produtoBtn
)

]

});

// FIX INTERACTION

if (!interaction.replied && !interaction.deferred) {

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

}

// ========================================
// MODAL PRODUTO
// ========================================

if (interaction.customId.startsWith("modal_produto_")) {

const id =
interaction.customId.replace("modal_produto_", "");

const painel = paineis[id];

const produto =
interaction.fields.getTextInputValue("produto");

const valor =
interaction.fields.getTextInputValue("valor");

const emoji =
interaction.fields.getTextInputValue("emoji");

painel.produtos.push({
nome: produto,
valor: valor,
emoji: emoji
});

const canal =
client.channels.cache.get(painel.canalId);

const mensagem =
await canal.messages.fetch(
painel.mensagemId
);

const embed = new EmbedBuilder()

.setTitle(painel.titulo)

.setDescription(`
${painel.texto}

💳 PIX:
${painel.pix}
`)

.setColor(painel.cor);

if (painel.url)
embed.setImage(painel.url);

const menu =
new StringSelectMenuBuilder()

.setCustomId(`comprar_${id}`)

.setPlaceholder("Selecionar produto")

.addOptions(

painel.produtos.map((p, i) => ({
label: p.nome,
description: `R$ ${p.valor}`,
emoji: p.emoji,
value: `${i}`
}))

);

const config = new ButtonBuilder()

.setCustomId(`config_${id}`)

.setEmoji("⚙️")

.setStyle(ButtonStyle.Secondary);

const produtoBtn = new ButtonBuilder()

.setCustomId(`produto_${id}`)

.setLabel("➕ Produto")

.setStyle(ButtonStyle.Success);

await mensagem.edit({

embeds: [embed],

components: [

new ActionRowBuilder().addComponents(menu),

new ActionRowBuilder().addComponents(
config,
produtoBtn
)

]

});

// FIX INTERACTION

if (!interaction.replied && !interaction.deferred) {

await interaction.reply({
content: "✅ produto adicionado",
ephemeral: true
});

}

}

}

});

client.login(TOKEN);
