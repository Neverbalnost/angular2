const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/authors', (req, res, next) => {
		const authors = server.db.getState().authors;
		res.json(authors);
	});
	
	return router;
};
