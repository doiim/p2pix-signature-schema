const fs = require('fs');
const ethers = require('ethers');

if (!process.argv[2]) {
    console.log('No message to be signed')
}

const privateKey = fs.readFileSync('.privatekey',{ encoding: 'utf8'});

if (!privateKey) {
    console.log('No private key created, please run private-jey-derivation first!')
}

const main = async () => {
    let wallet = new ethers.Wallet(privateKey);

    const message = process.argv[2];

    // Sign the string message
    let flatSig = await wallet.signMessage(message);
    
    // Show the recovered address of the signature
    console.log('Recovered Adress from signature:')
    console.log(ethers.utils.verifyMessage(message, flatSig));
}

main();