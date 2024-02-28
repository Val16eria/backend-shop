import express from 'express';

import {
	addToCart,
	getCart,
	removeFromCart
} from '../controllers/cart';
import { isAuthenticated } from '../middlewars';

export default (router: express.Router) => {
	router.get('/cart', isAuthenticated, getCart);
	router.post('/cart/add', isAuthenticated, addToCart);
	router.post('/cart/remove', isAuthenticated, removeFromCart);
};
