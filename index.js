require('dotenv').config()
const TelegramBot = require("node-telegram-bot-api");
const BSC_SCAN_TOKEN = process.env.KEY;
const BOT_TOKEN = process.env.BOT;
const patternGetAddress = /^\/\w+\s+(\w+)/; // get Second word of sentece "/bnb 0xfffxxxx"
const bnb = /^\/bnb\b/;
const evmBot = new TelegramBot(BOT_TOKEN, { polling: true });
evmBot.onText(bnb, async msg => {
    let response;
    const id = msg.from.id;
    const message = msg.text.match(patternGetAddress);
    if (message && message.length > 1) {
        const address = message[1];
        response = await test(address);
    }
    evmBot.sendMessage(id, "Your Balance: " + response)
})

async function test(address) {
    try {
        const result = await fetch("https://api.bscscan.com/api?module=account&action=balance&address=" + address + "&apikey=" + BSC_SCAN_TOKEN)
        if (!result.ok) {
            throw new Error("getting Error")
        };
        const data = await result.json();
        const getWei = data.result;
        data.result = weiToBNB(getWei);
        return data.result + " BNB";
    } catch (e) {
        return e.message;
    }
}
function weiToBNB(wei) {
    return wei / 1000000000000000000; // 1 BNB = 1 
}
