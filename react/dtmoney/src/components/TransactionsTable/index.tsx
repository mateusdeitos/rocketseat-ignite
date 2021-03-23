import { useEffect, useState } from "react"
import { api } from "../../services/api";
import { Container } from "./styles"

interface TransactionsProps {
    id: number;
    title: string;
    amount: number;
    type: 'deposit' | 'withdraw';
    category: string;
    created_at: Date;
}

export const TransactionsTable = () => {
    const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
    useEffect(() => {
        api.get('transactions').then(response => setTransactions(response.data.transactions));
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th className="align-left">Título</th>
                        <th className="align-left">Categoria</th>
                        <th className="align-right">Valor</th>
                        <th className="align-center">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.category}</td>
                            <td className={transaction.type}>{
                                new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}</td>
                            <td className="align-center">{
                                new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.created_at))
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}