import express from 'express';
import { get } from 'lodash';

import { createOrder, getOrderByIdDB } from '../db/order';

export const placeOrder = async (req: express.Request, res: express.Response) => {
	try {
		const userId = get(req, 'identity._id') as string;
		const { items, deliveryAddress, paymentMethod } = req.body;

		const order = await createOrder({
			userId,
			items,
			deliveryAddress,
			paymentMethod,
			status: 'Pending',
		});

		return res.status(200).json(order).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const getOrderById = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const order = await getOrderByIdDB(id);

		if (!order) {
			return res.sendStatus(404);
		}

		return res.status(200).json(order).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};
