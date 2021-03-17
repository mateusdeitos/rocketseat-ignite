const express = require('express');
const { v4: uuid } = require('uuid')

const app = express();

app.use(express.json());
const checkAccountExistsByCPF = (request, response, next) => {
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(404).json({ error: 'Customer not found' });
    }

    Object.assign(request, { customer });

    return next();
}

const getBalance = (statement) => {
    return statement.reduce((balance, operation) => {
        if (operation.type === 'credit') {
            return balance += operation.amount;
        }
        return balance -= operation.amount;
    }, 0)
}

const customers = [];

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExists) {
        return response.status(409).json({ error: `Já existe um usuário com o cpf: ${cpf}` });
    }

    const customer = {
        id: uuid(),
        cpf,
        name,
        statement: []
    }

    customers.push(customer);

    return response.json(customer);
})

app.get('/accounts', (request, response) => response.json(customers))

app.use(checkAccountExistsByCPF);

app.get('/statement', (request, response) => {
    const { customer } = request;
    return response.json({ statement: customer.statement })

})

app.post('/deposit', (request, response) => {
    const { description, amount } = request.body;
    const { customer } = request;
    const statement = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit',
    }

    customer.statement.push(statement);

    return response.status(201).json(statement);
})

app.post('/withdraw', (request, response) => {
    const { amount, description } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);
    if (balance < amount) {
        return response.status(400).json({ error: 'Insufficient funds...' });
    }

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'debit',
    }

    customer.statement.push(statementOperation);

    return response.status(204).json(statementOperation);
})

app.get('/statement/date', (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((operation) => {
        return new Date(operation.created_at).toDateString() ===
            new Date(dateFormat).toDateString()
    })

    return response.json(statement);
})

app.put('/account', (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    Object.assign(customer, { name });

    return response.json(customer);
})

app.get('/account', (request, response) => {
    const { customer } = request;

    return response.json(customer);
})

app.get('/balance', (request, response) => {
    const { customer } = request;
    return response.json({ balance: getBalance(customer.statement) })
})


app.delete('/account', (request, response) => {
    const { customer } = request;
    const index = customers.findIndex(c => c.cpf === customer.cpf);
    customers.splice(index, 1);

    return response.status(204).json(customers);
})

app.listen(3333, () => {
    console.log('rodando... 🚀');
})