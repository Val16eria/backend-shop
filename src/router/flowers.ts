import express from 'express';

import {
	getAllFlowers,
	getFlower,
	updateFlower,
	deleteFlower,
	addFlower
} from '../controllers/flowers';
import { isAuthenticated } from '../middlewars';

export default (router: express.Router) => {
	router.get('/flowers', isAuthenticated, getAllFlowers);
	router.get('/flowers/:id', isAuthenticated, getFlower);
	router.post('/flowers', isAuthenticated, addFlower);
	router.delete('/flowers/:id', isAuthenticated, deleteFlower);
	router.patch('/flowers/:id', isAuthenticated, updateFlower);
};
