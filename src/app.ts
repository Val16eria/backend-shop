import express, { Application } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { config } from 'dotenv';
import * as process from "process";
import mongoose from 'mongoose';

import router from './router';

config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app: Application = express();

app.use(cors({
	credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`);
});


mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', (error: Error) => {
	console.log('Error', error);
});

app.use('/', router());
