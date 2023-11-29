
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
    amount?: number;
    type?: 'sent' | 'received';
    confirmations?: number;
}

export function mapResponseToCustomTransactions(apiResponseTransactions: any[]): MempoolTransaction[] {
    return apiResponseTransactions.map(apiTransaction => {
        // Calculate amount, type, and confirmations
        let amount = 0;

        for (const output of apiTransaction.vout) {
            amount += output.value;
        }

        for (const input of apiTransaction.vin) {
            if (input.prevout) {
                amount -= input.prevout.value;
            }
        }

        const transactionType: 'sent' | 'received' = amount > 0 ? 'sent' : 'received';
        const confirmations = apiTransaction.status.confirmed ? apiTransaction.status.block_height : 0;

        return {
            txid: apiTransaction.txid,
            status: {
                confirmed: apiTransaction.status.confirmed,
                block_height: apiTransaction.status.block_height,
                block_hash: apiTransaction.status.block_hash,
                block_time: apiTransaction.status.block_time,
            },
            fee: apiTransaction.fee,
            datetime: apiTransaction.status.block_time,
            amount: Math.abs(amount),
            type: transactionType,
            confirmations: confirmations,
        };
    });
}

