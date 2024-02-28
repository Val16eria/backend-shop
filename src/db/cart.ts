import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	items: [{ flowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower' }, quantity: Number }],
});

export const CartModel = mongoose.model('Cart', CartSchema);

export const getCartByUserId = (userId: string) => CartModel.findOne({ user: userId });
export const addToCartDB = (userId: string, flowerId: string, quantity: number) =>
	CartModel.findOneAndUpdate(
		{ user: userId },
		{ $push: { items: { flowerId, quantity } } },
		{ upsert: true, new: true },
	);
export const removeFromCartDB = (userId: string, flowerId: string) =>
	CartModel.findOneAndUpdate(
		{ user: userId },
		{ $pull: { items: { flowerId } } },
		{ new: true },
	);
