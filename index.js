import uow from "./uow_count.json" with { type: "json" };
import config from "./config.json" with { type: "json" };
import fs from "node:fs";
import { Client, GatewayIntentBits, Events } from "discord.js";

const { token } = config;

let uowCount = 0;
let globalUowCount = uow.count;

// 冷笑を保存ｸｶｗ
async function doUowCount() {
  const previousUow = await import("./uow_count.json", { with: { type: "json" }});
  const data = previousUow.default;

  if (!("count" in data)) {
    data.count = 0;
  }

  // うおｗ
  data.count++;

  // どわー笑
  await fs.writeFile("./uow_count.json", JSON.stringify(data, null, 2), (error) => {
    if (!error) return;

    console.error("どわーエラー笑：", error);
  });

  return data;
}

const client = new Client({
  intents: [
    // メッセージ受信にはこの二つさえ設定してたらOK
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on(Events.ClientReady, readyClient => {
  console.log(`${readyClient.user.username}`);
});

// asyncで非同期関数化😅
client.on(Events.MessageCreate, async message => {
  // 冷笑してるか判定する正規表現
  const uowRegExp = /(?<=.*)(?:([uUｕＵうウｳ][oOｏＯおオｵ]|[魚])[WwＷｗ笑]?)$/m;

  // どわーｗ
  if (!uowRegExp.test(message.content)) return;

  try {
    // うおｗ
    await message.react("🐟");

    const uowData = await doUowCount();
    const currentTime = new Date();

    console.log(`冷笑王「${uowData.count}回目の冷笑ガチイクｗ」(${currentTime.toLocaleString("ja-JP")})`);
  } catch (error) {
    // どわーｗ
    console.error("冷笑(笑)できなかったｸｶw：", error);
  }
});

client.login(token);