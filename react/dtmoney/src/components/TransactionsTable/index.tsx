import {  useTransactions } from "../../contexts/TransactionsContext";
import { Container } from "./styles"


export const TransactionsTable = () => {
    const { transactions } = useTransactions();

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
