const TruffleConfig = require('../../truffle-config.js');
const request = require('request');
const { Conflux } = require('js-conflux-sdk');
const BN = require('bn.js');

let faucetUri = 'http://test-faucet.conflux-chain.org:18088/dev/ask?address=';
let testAccounts = TruffleConfig.networks.development.walletProvider().addresses;
let conflux = new Conflux({ url: TruffleConfig.networks.development.uri })

testAccounts.map(async (account, index) => {

    let accountInfo = await conflux.getAccount(account);
    
    console.log(`Faucet request for (${index}) ${account} (Current Balance: ${accountInfo.balance.toString()})`);
    setTimeout(() => {
        request.get(`${faucetUri}${account}`, (error, res, body) => {
            let bodyInfo = body ? JSON.parse(body) : { message: '' };
            if (error) {
                console.log('Error requesting funds');
            } else if (bodyInfo.message && (typeof bodyInfo.message == 'string') && (bodyInfo.message.toLowerCase().indexOf('error') > -1)) {
                console.log(`(${index}) ${bodyInfo.message}`);
            }
            if (index === testAccounts.length - 1) {
                process.exit(0);                
            }
        })
    }, 1000);
});
