// import "dotenv/config";
require('dotenv').config()
const key = process.env.KEY;
console.log(key);
async function test() {
    try {
        const result = await fetch("https://api.bscscan.com/api?module=account&action=balance&address=0xee226379dB83CfFC681495730c11fDDE79BA4c0C&apikey=" + key)
        if (!result.ok) {
            throw new Error("getting Error")
        };
        const data = await result.json();
        const getWei = data.result;
        data.result = weiToBNB(getWei);
        console.log(data);
    } catch (e) {
        console.log({ e });
    }
}

test();


function weiToBNB(wei) {
    return wei / 1000000000000000000; // 1 BNB = 1 
}