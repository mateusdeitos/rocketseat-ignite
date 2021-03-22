import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer } from 'miragejs'

createServer({
  routes() {
    this.namespace = 'api';

    this.get('transactions', (schema, request) => {
      return [
        {
          id: 1,
          title: "Aluguel",
          amount: 400,
          type: 'withdraw',
          category: 'House',
          created_at: new Date(),
        }
      ]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
