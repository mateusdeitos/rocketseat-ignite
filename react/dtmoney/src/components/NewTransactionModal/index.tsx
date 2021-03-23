
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../contexts/TransactionsContext';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface FormDataProps {
    title: string;
    amount: number;
    type: 'deposit' | 'withdraw';
    category: string;
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
    const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    const { addNewTransaction } = useTransactions();

    const handleSubmit = async (e: FormEvent) => { 
        e.preventDefault(); 
        await addNewTransaction(formData); 
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="react-modal-close"
                type="button"
                onClick={onRequestClose}>
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleSubmit}>
                <h2>Cadastrar Transação</h2>
                <input
                    placeholder="Título"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setFormData({ ...formData, type: 'deposit' }) }}
                        isActive={formData.type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setFormData({ ...formData, type: 'withdraw' }) }}
                        isActive={formData.type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}