const sdk = require("@defillama/sdk");
const utils = require('../helper/utils');
const USDC = "fantom:0x04068DA6C83AFCFA0e13ba15A6696662335D5B75";
async function getPlatformData() {
    const response = await utils.fetchURL('https://api.vedna.finance/api/Vedna/getVeDNACountTvl?f=1666600000');
    return response.data.data;
}

async function tvl() {
    const data = await getPlatformData();
    let total = 0;
    for (key in data) {
        for(keys in data[key]) {
            if(data[key][keys] && data[key][keys] > 0) {
                total += data[key][keys];
            }
        }
    }
    let balances = {};
    balances[USDC] = (Number(total)*1e6).toFixed(0);
    return balances;
}

module.exports = {
  ftm: {
    tvl,
  }
}; 
