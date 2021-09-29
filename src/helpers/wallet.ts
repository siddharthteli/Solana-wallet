import { Connection, SystemProgram, Transaction, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter"



// async function connectToWallet() {
//   console.log("inside wallet connection function");
// await wallet.connect();
// console.log("wallet connected");
// let transaction = new Transaction().add(
//   SystemProgram.transfer({
//     fromPubkey: wallet!.publicKey!,
//     toPubkey: wallet!.publicKey!,
//     lamports: 100,
//   })
// );
// let { blockhash } = await connection.getRecentBlockhash();
// transaction.recentBlockhash = blockhash;
// transaction.feePayer = wallet!.publicKey!;
// let signed = await wallet.signTransaction(transaction);
// let txid = await connection.sendRawTransaction(signed.serialize());
// console.log("Transaction signature----"+txid);
// await connection.confirmTransaction(txid);
// }

async function connectToWallet() {
let connection = new Connection(clusterApiUrl('devnet'));
let providerUrl = 'https://www.sollet.io';
let wallet = new Wallet(providerUrl,"http://devnet.solana.com");
 wallet.connect();
 console.log("Connected to wallet--");
return wallet;
  
}

export default async function sendMoney(address:string,amount:number) {
  let wallet=await connectToWallet();
  let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet!.publicKey!,
        toPubkey: wallet!.publicKey!,
        lamports: 100,
      })
    );

}


