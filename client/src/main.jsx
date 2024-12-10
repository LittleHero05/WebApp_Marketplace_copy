import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../helpers/auth-context';
import { CartProvider } from '../helpers/CartContext';
import { FavouritesProvider } from '../helpers/FavouritesContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AuthProvider>
    <CartProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </CartProvider>
  </AuthProvider>
);