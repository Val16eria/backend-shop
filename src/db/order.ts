import mongoose from 'mongoose';
import {FlowerModel} from "./flowers";

interface OrderItem {
	flowerId: string;
	quantity: number;
}

interface OrderDocument extends Document {
	userId: string;
	items: OrderItem[];
	deliveryAddress: string;
	paymentMethod: string;
	status: string;
}

const orderSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	items: [{ flowerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flower' }, quantity: Number }],
	deliveryAddress: { type: String, required: true },
	paymentMethod: { type: String, required: true },
	status: { type: String, default: 'Pending' },
});

export const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);
export const createOrder = (values: Record<string, any>) => new OrderModel(values)
	.save().then((order) => order.toObject());
export const getOrderByIdDB = (id: string) => OrderModel.findById(id);
