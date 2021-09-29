import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter"
let connection = new Connection(clusterApiUrl('devnet'));
let providerUrl = 'https://www.sollet.io';
let wallet = new Wallet(providerUrl,"http://devnet.solana.com");


export default async function connectToWallet() {
await wallet.connect();

let transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: wallet!.publicKey!,
    toPubkey: wallet!.publicKey!,
    lamports: 100,
  })
);
let { blockhash } = await connection.getRecentBlockhash();
transaction.recentBlockhash = blockhash;
transaction.feePayer = wallet!.publicKey!;
let signed = await wallet.signTransaction(transaction);
let txid = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(txid);
}

