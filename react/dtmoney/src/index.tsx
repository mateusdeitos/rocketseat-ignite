import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Madero',
          type: 'withdraw',
          category: 'Restaurante',
          amount: 80,
          created_at: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Salário',
          type: 'deposit',
          category: 'Receita',
          amount: 8000,
          created_at: new Date('2021-02-14 11:00:00'),
        },
      ],
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('transactions', (schema, request) => {
      return this.schema.all('transaction')
    })

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);