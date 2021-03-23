
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface FormDataProps {
    titulo: string;
    valor: number;
    type: 'deposit' | 'withdraw';
    categoria: string;
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
    const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
    const handleCreateNewTransaction = (e: FormEvent) => {
        e.preventDefault();
        
        api.post('transactions', formData);
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
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input
                    placeholder="Título"
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Valor"
                    onChange={(e) => setFormData({ ...formData, valor: Number(e.target.value) })}
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
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}