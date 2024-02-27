import express from 'express';

import authentication from './authentication';
import users from './users';
import flowers from './flowers';
import cart from './cart';

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	flowers(router);
	cart(router);
	return router;
}
