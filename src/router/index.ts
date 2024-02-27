import express from 'express';

import authentication from './authentication';
import users from './users';
import flowers from './flowers';

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	flowers(router);
	return router;
}
