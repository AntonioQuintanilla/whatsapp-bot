const { decryptMedia, create, Client } = require("@open-wa/wa-automate");
const mime = require("mime-types");
const fetch = require("node-fetch");
const bent = require("bent");

const {
  stickerReply,
  sticker,
  help,
  members,
  contact,
  anime,
  battery,
  content,
  emoji,
} = require("./option/options");

const prefix = "/";

function start(client) {
  client.onMessage(async (message) => {
    await stickerReply(client, message);
    await sticker(client, message);
    await members(client, message);
    await anime(client, message);
    await battery(client, message);
    help(client, message);
    contact(client, message);
    content(client, message);
    emoji(client, message);
  });
}

create().then(start);
