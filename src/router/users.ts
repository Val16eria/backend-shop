import express from 'express';

import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewars';

export default (router: express.Router) => {
	router.get('/users', isAuthenticated, getAllUsers);
};

