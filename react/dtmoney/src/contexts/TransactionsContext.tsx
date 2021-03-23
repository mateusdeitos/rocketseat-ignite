import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: 'deposit' | 'withdraw';
    category: string;
    created_at: Date;
}

interface SummaryProps {
    deposits: number;
    withdraws: number;
    total: number;
}

type TransactionInput = Omit<Transaction, 'id' | 'created_at'>;

interface TransactionsContextData {
    transactions: Transaction[];
    summary: SummaryProps;
    addNewTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export const TransactionsProvider: React.FC = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

    const addNewTransaction = async (transaction: TransactionInput) => {
        api.post('transactions', { ...transaction, created_at: new Date() })
            .then(response => setTransactions([...transactions, response.data.transaction]));
    }

    useEffect(() => {
        api.get<{ transactions: Transaction[] }>('transactions')
            .then(response => {
                const _transactions = response.data.transactions;
                setTransactions(_transactions);
            });
    }, [])

    useEffect(() => {
        setSummary(transactions.reduce((obj, transaction) => {
            obj.deposits = transaction.type === 'deposit' ? obj.deposits += transaction.amount : obj.deposits += 0;
            obj.withdraws = transaction.type === 'withdraw' ? obj.withdraws += transaction.amount : obj.withdraws += 0;
            obj.total = obj.deposits - obj.withdraws;
            return obj;
        }, {
            deposits: 0,
            withdraws: 0,
            total: 0
        }))
    }, [transactions])

    return <TransactionsContext.Provider value={{ transactions, addNewTransaction, summary }}>
        {children}
    </TransactionsContext.Provider>
}

export const useTransactions = () => {
    return useContext(TransactionsContext);
}
