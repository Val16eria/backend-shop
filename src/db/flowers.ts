import mongoose from 'mongoose';

const FlowerSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	count: { type: Number, required: true },
	price: { type: Number, required: true },
});

export const FlowerModel = mongoose.model('Flower', FlowerSchema);

export const getFlowers = () => FlowerModel.find();
export const getFlowerById = (id: string) => FlowerModel.findById(id);
export const getFlowerByTitle = (title: string) => FlowerModel.findOne({ title });
export const createFlower = (values: Record<string, any>) => new FlowerModel(values)
	.save().then((flower) => flower.toObject());
export const deleteFlowerById = (id: string) => FlowerModel.findOneAndDelete({ _id: id });
export const updateFlowerById = (id: string, values: Record<string, any>) =>
	FlowerModel.findByIdAndUpdate(id, values);
