require('@babel/register');
({
    ignore: /node_modules/
});
require('@babel/polyfill');

const WalletProvider = require('./src/lib/wallet-provider');


let mnemonic = 'idea climb flee skull guard render remain mixture hunt lock swallow thank'; 
let testAccounts = [
"0x67a272870c24ebe2b365f00b8b71dacee0fed11b77b6ec0c9b0e651d3371ead2",
"0x0d7c9dd0770647c2c7c48cbfcab0dea06dda0f52f08ca4347fe1eb9b797d225a",
"0xc96f3e54284f4f1f8b0ef871ffed06b5aa3657a9e80e2d0b25aa6ffbf0c740d7",
"0xf81f2ab7333700ff77b03354fa61177a6d6dd4015cc7b1a8aa076dd382e25747",
"0xde4a8dd20c15b84a9903d6117adaeb54847b7cdfb5bb4e52f0c52bbcff575036",
"0x042ba3a8ffb1dcafd465196e3782dcb40467c2c8a2b81f36808411561fc73fd9",
"0x0a68fa18cc92fd4368465c4228370f1d8ec03d222adc748a7f683cb83c3a6819",
"0x1d42d34c7ccf3b9dea8ef4bf8dde159b73cc093e67b5e45715c8ceaf011de423",
"0x3ee485e276b475dc90eb30fd7007a0dd4157134539bab5a218cc16382d98b831",
"0x4474a287ad5635b4edc4cd10d370f35e67056a349dae7edf9bd99f346cc6110e"
]; 
let devUri = 'http://test.confluxrpc.org';
let host = devUri.replace('http://','').replace('https://','');
let privateKeys = new WalletProvider(mnemonic, 10).privateKeys;

module.exports = {
    testAccounts,
    mnemonic,
    networks: {
        development: {
            uri: devUri,
            network_id: '*',
            host,
            port: 80,
            type: "conflux",
            privateKeys,
            walletProvider: () => new WalletProvider(mnemonic, 10)
        }
    },
    compilers: {
        solc: {
            version: '^0.5.11'
        }
    }
};

