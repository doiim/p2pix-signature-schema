# p2pix-signature-schema

A signature schema to be used for validate ITP signatures.

## Installation
```sh
git clone git@github.com:doiim/p2pix-signature-schema.git
npm install 
```

## Usage

First you need to run **private-key-derivation** script with an additional parameters representing the message you want to sign

```sh
node private-key-generation 'supersecretpass'
```

After that a .privakey file will be created and will be used by the **sign-message** to sign a message passed as parameter

```sh
node sign-message 'message to be signed'
```

## How it works

Ethers is an EVM integration library that support import different kind of wallets and connect to multiple type of providers. It allows a wallet send transactions, sign messages, encode/decode data. What we are doing here, is derive a private key from a password and a salt, create a Signer object and use it to sign a message. Once a third-party or a contract knows the message signed and the signature, it could verify the signer address using **ECRecover** function. In that case, soon an ITP sign a message defined by the protocol, a smart-contract that knows the **Signer Address/Account Address** could validate any message.



## References 

[Ethers Cookbook](https://docs.ethers.org/v4/cookbook-signing.html)

[Ethereum Account Explained](https://ethereum.org/en/developers/docs/accounts/)