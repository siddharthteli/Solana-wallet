import { Connection, SystemProgram, Transaction, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from "@project-serum/sol-wallet-adapter"


let connection = new Connection(clusterApiUrl('devnet'));
let providerUrl = 'https://www.sollet.io';
// other URL's -https://api.devnet.solana.com , http://localhost:8899
let wallet = new Wallet(providerUrl,"https://api.devnet.solana.com");

 interface TranferData {
  senderAddress?:string,
  receiverAddress?:string,
  fee?:string,
  senderBalance?:string,
  receiverBalance?:string,
  signature?:string,
  block?:string

}

export default async function sendMoney(address:string,amount:number) {
  await wallet.connect();
  // address -3FKNt6LaneCKy63q7jKvb3w9XwpwQokvEHPeD9NgLNNR
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
  let transactionData=transactionDetial(address);
  return transactionData;
  }


  export async function transactionDetial(address:string) {

    let detail =await connection.getConfirmedSignaturesForAddress2(new PublicKey(address));
    let signature=detail[0].signature
    console.log("Value of transaction object----"+signature);
    let confirmed= await connection.getConfirmedTransaction(signature);
    let transactionData=confirmed?.transaction;
    let instruction=transactionData?.instructions[0];
   let senderAddress=instruction?.keys[0].pubkey;
   let receiverAddress=instruction?.keys[1].pubkey;
   let metaData=confirmed?.meta;
   console.log("sender address-"+senderAddress+"Reiciver address"+receiverAddress);
    console.log("Fee---"+metaData?.fee+"Paid by--"+transactionData?.feePayer);
    console.log("Sender Balance---"+metaData?.postBalances[0]+"Receivers new Balance---"+metaData?.postBalances[1]);
    let data:TranferData;
    data={
        senderAddress:senderAddress?.toString(),
        receiverAddress:receiverAddress?.toString(),
        fee:metaData?.fee.toString(),
        senderBalance:metaData?.postBalances[0].toString(),
        receiverBalance:metaData?.postBalances[1].toString(),
        signature:signature.toString(),
        block:confirmed?.slot.toString(),
    }
    return data;

  }






