const got = require('got');
const querystring = require('querystring');
const Web3 = require('web3');
const ethers = require('ethers');
const BigNumber = require('bignumber.js');
const config = require('./config.js');

exports.getData = async () => {
    // const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.defibit.io')); 
    // const ROUTER_ADDRESS = "0xc6f252c2cdd4087e30608a35c022ce490b58179b";
    // const ROUTE_ABI = require('../../../lib/gamefi/cryptoblades/abi/characterTokenAbi.json');
    // const routerContract = new web3.eth.Contract(ROUTE_ABI, ROUTER_ADDRESS);
    const web3 = new Web3(new Web3.providers.HttpProvider(config.apiUrl)); 
    const ROUTER_ADDRESS = "0x44113c5eCde0660612f244fB0c2A2C79F73D9145";
    const ROUTE_ABI = require('../build/contracts/NFT721.json');
    const routerContract = new web3.eth.Contract(ROUTE_ABI.abi, ROUTER_ADDRESS);

    const data =await routerContract.methods.addSigner("0x974423356ba75b1aaf24bbec7c8cc8cf0678554f").encodeABI();
    console.log(data);
    // return;

    // 调通买nft合约
    // const data = "0xa6f957260000000000000000000000007e091b0a220356b157131c831258a9c98ac8031a00000000000000000000000000000000000000000000000000000000004062560000000000000000000000000000000000000000000000000027147114877fff";
    const transferTransaction = await web3.eth.accounts.signTransaction(
        {
            "from": "0x76336D2903E8F6d62Cc3F5d05283108e3D2785e0",
            "to": ROUTER_ADDRESS,
            "value": "0",
            "gas": 470000,
            "data": data
        }
        ,        
        config.privateKey // private key 
    );
    // Send Tx and Wait for Receipt
    const transferReceipt = await web3.eth.sendSignedTransaction(
        transferTransaction.rawTransaction
    );
    console.log("finish", transferTransaction);
    console.log(`transfer receipt: ${JSON.stringify(transferReceipt)}`);

    // 测试获取nft targetbuyer
    // web3.eth.call({
    //     to: "0x90099da42806b21128a094c713347c7885af79e2", // contract address
    //     data: "0x281fb1650000000000000000000000007e091b0a220356b157131c831258a9c98ac8031a00000000000000000000000000000000000000000000000000000000001b8755"
    // })
    // .then(console.log);

    // 测试获取nft balanceOf
    // web3.eth.call({
    //     to: "0xc6f252c2cdd4087e30608a35c022ce490b58179b", // contract address
    //     data: "0x70a0823100000000000000000000000076336D2903E8F6d62Cc3F5d05283108e3D2785e0"
    // })
    // .then(console.log);
    // 测试获取nft tokenOfOwner
    // web3.eth.call({
    //     to: "0xc6f252c2cdd4087e30608a35c022ce490b58179b", // contract address
    //     data: "0x2f745c5900000000000000000000000076336D2903E8F6d62Cc3F5d05283108e3D2785e00000000000000000000000000000000000000000000000000000000000000000"
    // })
    // .then(console.log);
    // console.log(res);
}

const testExecutionPrice = async () => {
    await this.getData();
}

testExecutionPrice()