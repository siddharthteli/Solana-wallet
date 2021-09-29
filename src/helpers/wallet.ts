import { Connection, SystemProgram, Transaction, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter"


let connection = new Connection(clusterApiUrl('devnet'));
let providerUrl = 'https://www.sollet.io';
let wallet = new Wallet(providerUrl,"http://devnet.solana.com");

export default async function sendMoney(address:string,amount:number) {
  await wallet.connect();
  
  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet!.publicKey!,
      toPubkey: new PublicKey(address),
      lamports: amount,
    })
  );
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet!.publicKey!;
  let signed = await wallet.signTransaction(transaction);
  let txid = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(txid);
  }






