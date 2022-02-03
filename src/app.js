import express from 'express';
import morgan from 'morgan';

import pkg from '../package.json';

const app = express();

app.use(morgan('dev'));

app.set('pkg', pkg);

app.get('/', (req, res) => {
	res.json({
		name: app.get('pkg').name,
		description: app.get('pkg').description,
		author: app.get('pkg').author
	});
});

export default app;
