const { decryptMedia } = require("@open-wa/wa-automate");
const mime = require("mime-types");
const fetch = require("node-fetch");
const prefix = "/";

const stickerReply = async (client, message) => {
  if (
    message.caption === `${prefix}stickerR` ||
    (message.caption === `${prefix}stikerR` && message.mimetype)
  ) {
    const filename = `${message.t}.${mime.extension(message.mimetype)}`;

    try {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;

      client.sendImageAsSticker(message.from, imageBase64);
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

const sticker = async (client, message) => {
  if (
    message.caption === `${prefix}sticker` ||
    (message.caption === `${prefix}stiker` && message.mimetype)
  ) {
    const filename = `${message.t}.${mime.extension(message.mimetype)}`;

    try {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;

      client.sendImageAsSticker(message.from, imageBase64);
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

const help = (client, message) => {
  if (message.body === `${prefix}ayuda`) {
    const help = `*********** Lista de Comandos ***********
- ayuda
- anime
- contacto
- emoji
- sticker
- miembros

Uso:
- /ayuda
- /anime nombreDeAnime
- Para compartir tu número utiliza /contacto
- /emoji nombreEmoji
- Enviar imagen con el mensaje /sticker para convertirla en sticker
- Para mostrar todos los números de teléfono dentro del grupo utiliza /miembros
`;
    client.sendText(message.from, help);
  }
};

const members = async (client, message) => {
  if (message.body === `${prefix}miembros`) {
    const members = await client.getGroupMembers(message.from);
    for (const o in Object.keys(members)) {
      client.sendText(
        message.from,
        `${parseInt(o) + 1} 👉 ${members[o].id
          .split("@")[0]
          .replace("503", "")}`
      );
    }
    // console.log(members);
  }
};

const contact = (client, message) => {
  if (message.body === `${prefix}contacto`) {
    client.sendContact(message.from, message.author);
  }
};

const emoji = (client, message) => {
  if (message.body.includes("/emoji")) {
    const emoji = message.body.replace(/\/emoji/, "");
    client.sendEmoji(message.from, emoji);
  }
};

const anime = async (client, message) => {
  if (message.body.includes("/anime")) {
    console.log("fetching...");
    const keyword = message.body.replace(/\/anime/, "");
    try {
      const data = await fetch(
        `https://api.jikan.moe/v3/search/anime?q=${keyword}`
      );
      const parsed = await data.json();
      if (!parsed) {
        client.sendText(
          message.from,
          "Anime not found, try again with another keyword."
        );
        console.log("Sent!");
        return null;
      }

      const { title, synopsis, episodes, url, rated, score, image_url } =
        parsed.results[0];
      const content = `**** Anime encontrado ****
*Titulo:* ${title}
*Episodios:* ${episodes}
*Rating:* ${rated}
*Score:* ${score}
*Synopsis:* ${synopsis}
*URL*: ${url}`;

      const image = await bent("buffer")(image_url);
      const base64 = `data:image/jpg;base64,${image.toString("base64")}`;

      client.sendImage(message.from, base64, title, content);
      console.log("Sent!");
    } catch (err) {
      console.error(err.message);
    }
  }
};

const content = (client, message) => {
  if (message.body === `${prefix}content`) {
    console.log(message);
  }
};

const battery = async (client, message) => {
  if (message.body === `${prefix}bateria`) {
    const batteryLevel = await client.getBatteryLevel();
    client.sendText(message.from, `${batteryLevel}`);
  }
};

module.exports = {
  stickerReply,
  sticker,
  help,
  members,
  contact,
  anime,
  emoji,
  content,
  battery,
};
