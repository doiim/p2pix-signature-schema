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

    // For Solidity, we need the expanded-format of a signature
    // The signature will be splitted in R,S,V format
    let sig = ethers.utils.splitSignature(flatSig)

    // Show the R,S,V format of the signature
    console.log('Signature in R, S, V format:') 
    console.log(sig);

    // Show the recovered address of the signature
    console.log('Recovered Adress from signature:')
    console.log(ethers.utils.verifyMessage(message, flatSig));
}

main();