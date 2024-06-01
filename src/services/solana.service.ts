// src/solana.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, clusterApiUrl, PublicKey, Message } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
  }

  async getLatestTransactionInfo(tokenAddress: string) {
    const tokenPublicKey = new PublicKey(tokenAddress);
    const tokenTransactions = await this.connection.getSignaturesForAddress(tokenPublicKey);
   

    if (tokenTransactions.length === 0) {
      throw new Error('No transactions found');
    }

    const latestTransaction = tokenTransactions[0];
    console.log(latestTransaction)
    const transactionDetail = (await this.connection.getParsedTransaction(latestTransaction.signature,{maxSupportedTransactionVersion:0}));

    const { slot, meta, transaction } = transactionDetail;
    const { postBalances, preBalances } = meta;
    const { message } = transaction;
    
    const senderPublicKey = message.accountKeys[0].pubkey.toString();
    const receiverPublicKey = message.accountKeys[1].pubkey.toString();
    const amount = (preBalances[0] - postBalances[0]) / 10 ** 9;


    return {
      slot,
      senderPublicKey,
      receiverPublicKey,
      amount,
      signature: latestTransaction.signature
    };
  }

  
}
