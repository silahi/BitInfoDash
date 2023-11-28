
interface ChainStats {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
}

interface MempoolStats {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
}

export interface MempoolApiResponse {
    address: string;
    chain_stats: ChainStats;
    mempool_stats: MempoolStats;
}

export interface MempoolAddress {
    address: string;
    label: string,
    balance: number;
    confirmedTransactionCount: number;
    unconfirmedTransactionCount: number;
    amountReceived: number;
    amountSent: number;
}

export function mapResponseToMempoolAddress(response: MempoolApiResponse): MempoolAddress {
    const {
        address,
        chain_stats: { funded_txo_sum, spent_txo_sum, tx_count },
        mempool_stats: { funded_txo_sum: mempoolFundedSum, spent_txo_sum: mempoolSpentSum, tx_count: mempoolTxCount },
    } = response;

    const balance = funded_txo_sum - spent_txo_sum;
    const confirmedTransactionCount = tx_count;
    const unconfirmedTransactionCount = mempoolTxCount;
    const amountReceived = funded_txo_sum + mempoolFundedSum;
    const amountSent = spent_txo_sum + mempoolSpentSum;
    const label = "";

    return {
        address,
        label,
        balance,
        confirmedTransactionCount,
        unconfirmedTransactionCount,
        amountReceived,
        amountSent,
    };
}


export interface MempoolTransaction {
    txid: string;
    status: {
        confirmed: boolean;
        block_height?: number;
        block_hash?: string;
        block_time?: number;
    };
    fee: number;
    datetime: Date;
}

 
export function mapResponseToCustomTransactions(apiResponseTransactions: any[]): MempoolTransaction[] {
    return apiResponseTransactions.map(apiTransaction => {
        return {
            txid: apiTransaction.txid,
            status: {
                confirmed: apiTransaction.status.confirmed,
                block_height: apiTransaction.status.block_height,
                block_hash: apiTransaction.status.block_hash,
                block_time: apiTransaction.status.block_time,
            },
            fee: apiTransaction.fee,
            datetime: new Date(apiTransaction.status.block_time * 1000),  
        };
    });
}

 
const apiResponseTransactions = [
    {
        txid: "3e6afd67862ce9fe3eb55268a3107f495415ff1b5d1933c928507e9bdf7a21e6",
        status: {
            confirmed: true,
            block_height: 2091086,
            block_hash: "00000000340f3667cce7032d084973ca29bdd0d858ec363ed894ad4c8ed09ebc",
            block_time: 1630607773,
        },
        fee: 0,
    },

];

const customTransactions: MempoolTransaction[] = mapResponseToCustomTransactions(apiResponseTransactions);
console.log(customTransactions);
