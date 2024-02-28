import express from 'express';

import { placeOrder, getOrderById } from '../controllers/order';
import { isAuthenticated } from '../middlewars';

export default (router: express.Router) => {
	router.post('/order/place', isAuthenticated, placeOrder);
	router.get('/order/:id', isAuthenticated, getOrderById);
};
