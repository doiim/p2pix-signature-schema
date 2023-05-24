const crypto = require('crypto');
const fs = require('fs');
const ethers = require('ethers');

function deriveEthereumPrivateKey(passphrase) {
  const salt = crypto.randomBytes(16); // Generate a random salt

  // Perform key derivation using PBKDF2
  const key = crypto.pbkdf2Sync(passphrase, salt, 1000000, 32, 'sha256');

  // Convert the derived key to a hexadecimal string
  const privateKey = key.toString('hex');

  return privateKey;
}

async function getPublicKey(privateKey) {
  const signer = new ethers.Wallet(privateKey)
  return signer.getAddress()
}

// Example usage

if (!process.argv[2]) {
  console.log('Password parameter not found.')
  return
}

const main = async () => {
  const privateKey = deriveEthereumPrivateKey(process.argv[2]);
  console.log(`Derived Private Key: ${privateKey}`);
  console.log(`Account Address: ${await getPublicKey(privateKey)}`);

  fs.writeFile('./.privatekey', privateKey, err => {
    if (err) {
      console.error(err);
    }
    console.log('.privatekey file success written.')
  });
}

main();