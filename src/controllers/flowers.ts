import express from 'express';

import {
	createFlower,
	deleteFlowerById,
	getFlowerById,
	getFlowerByTitle,
	getFlowers
} from '../db/flowers';

export const getAllFlowers = async (_req: express.Request, res: express.Response) => {
	try {
		const flowers = await getFlowers();
		return res.status(200).json(flowers).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const getFlower = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const flower = await getFlowerById(id);
		return res.status(200).json(flower).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const addFlower = async (req: express.Request, res: express.Response) => {
	try {
		const { title, description, count, price } = req.body;

		if (!title || !description || !count || !price) {
			return res.sendStatus(400);
		}

		const existingFlower = await getFlowerByTitle(title);

		if (existingFlower) {
			return res.sendStatus(400);
		}

		const flower = await createFlower({
			title,
			description,
			count,
			price
		});

		return res.status(200).json(flower).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const deleteFlower = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const deletedFlower = await deleteFlowerById(id);
		return res.status(200).json(deletedFlower).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};

export const updateFlower = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const { price } = req.body;

		if (!price) {
			return res.sendStatus(400);
		}

		const flower = await getFlowerById(id);

		flower.price = price;
		await flower.save();

		return res.status(200).json(flower).end();
	} catch (error) {
		console.log('Error', error);
		return res.sendStatus(400);
	}
};
