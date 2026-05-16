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

const PREFIX = "!";
const TOKEN = process.env.TOKEN;

const paineis = {};

client.once("ready", () => {
console.log(`${client.user.tag} ONLINE`);
});

// ========================================
// DONO
// ========================================

function isDono(member) {

const cargo =
member.guild.roles.cache.find(
r => r.name === "DONO"
);

if (!cargo) return true;

return member.roles.cache.has(cargo.id);

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

if (!message.member.permissions.has(
PermissionsBitField.Flags.Administrator
)) return;

const cargos = [

["DONO", "#000000"],
["SUB DONO", "#000000"],
["SUPORTE", "#00008B"],
["MOD APK", "#87CEFA"],
["IPHONE", "#00FFFF"],
["DISCORD.GG", "#FFFF00"]

];

for (const cargo of cargos) {

if (!message.guild.roles.cache.find(
r => r.name === cargo[0]
)) {

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
categoria: "🎫 TICKET SUPORTE",
canais: [
"👥・ticket",
"🌟・avaliação-ticket"
]
},

{
categoria: "🍎 IOS",
canais: [
"☕・certificado・gbox",
"🍎・ios-menu",
"🛠️・auxílio-ios",
"🍎・ffh4x-ios",
"🍎・ffh4x-safe",
"🍎・ffh4x-rage",  
"🍎・holograma-ios",
"🍎・proxy-ios",
"🍎・combo-ios-apostado",
"🍎・otimização-ios"
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
"🎯・gerador・de・sensi・android"
]
}

];

for (const item of estrutura) {

const categoria =
await message.guild.channels.create({
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
// !M
// ========================================

if (command === "m") {

if (!isDono(message.member))
return;

const texto = args.join(" ");

if (!texto)
return message.reply(
"❌ use !m mensagem | #cor"
);

const separar = texto.split("|");

const mensagem = separar[0];
const cor = separar[1] || "#8000ff";

const embed = new EmbedBuilder()

.setDescription(mensagem)

.setColor(cor);

message.channel.send({
embeds: [embed]
});

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

});

// ========================================
// INTERAÇÕES
// ========================================

client.on("interactionCreate", async interaction => {

// ========================================
// CONFIG PAINEL
// ========================================

if (
interaction.isButton() &&
interaction.customId.startsWith("config_")
) {

if (!isDono(interaction.member))
return;

const id =
interaction.customId.replace(
"config_",
""
);

if (!paineis[id]) return;

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
// ADD PRODUTO
// ========================================

if (
interaction.isButton() &&
interaction.customId.startsWith("produto_")
) {

if (!isDono(interaction.member))
return;

const id =
interaction.customId.replace(
"produto_",
""
);

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

// ========================================
// MODAL CONFIG
// ========================================

if (
interaction.isModalSubmit() &&
interaction.customId.startsWith(
"modal_vendas_"
)
) {

const id =
interaction.customId.replace(
"modal_vendas_",
""
);

const painel = paineis[id];

painel.titulo =
interaction.fields.getTextInputValue(
"titulo"
);

painel.texto =
interaction.fields.getTextInputValue(
"texto"
);

painel.url =
interaction.fields.getTextInputValue(
"url"
);

painel.cor =
interaction.fields.getTextInputValue(
"cor"
);

painel.pix =
interaction.fields.getTextInputValue(
"pix"
);

const canal =
client.channels.cache.get(
painel.canalId
);

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

await interaction.reply({
content: "✅ painel atualizado",
ephemeral: true
});

}

// ========================================
// MODAL PRODUTO
// ========================================

if (
interaction.isModalSubmit() &&
interaction.customId.startsWith(
"modal_produto_"
)
) {

const id =
interaction.customId.replace(
"modal_produto_",
""
);

const painel = paineis[id];

painel.produtos.push({

nome:
interaction.fields.getTextInputValue(
"produto"
),

valor:
interaction.fields.getTextInputValue(
"valor"
),

emoji:
interaction.fields.getTextInputValue(
"emoji"
)

});

const canal =
client.channels.cache.get(
painel.canalId
);

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

await interaction.reply({
content: "✅ produto adicionado",
ephemeral: true
});

}

});

client.login(TOKEN);
