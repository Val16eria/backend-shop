import express from 'express';
import { get } from 'lodash';

import {
	addToCartDB,
	getCartByUserId, removeFromCartDB
} from '../db/cart';

export const getCart = async (req: express.Request, res: express.Response) => {
	try {
		const userId = get(req, 'identity._id') as string;

		if (!userId) {
			return res.sendStatus(403);
		}

		const cart = await getCartByUserId(userId);
		return res.status(200).json(cart).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const addToCart = async (req: express.Request, res: express.Response) => {
	try {
		const userId = get(req, 'identity._id') as string;
		const { flowerId, quantity } = req.body;

		if (!userId || !flowerId || !quantity) {
			return res.sendStatus(403);
		}

		const updateCart = await addToCartDB(userId, flowerId, quantity);
		return res.status(200).send(updateCart).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const removeFromCart = async (req: express.Request, res: express.Response) => {
	try {
		const userId = get(req, 'identity._id') as string;
		const { flowerId } = req.body;

		if (!userId || !flowerId) {
			return res.sendStatus(403);
		}

		const updateCart = await removeFromCartDB(userId, flowerId);
		return res.status(200).json(updateCart).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};
