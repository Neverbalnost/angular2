const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			searchText = query.search,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log('searchText on server is: ', searchText);
		if (courses.length < to) {
			to = courses.length;
		}
		if (searchText) {
			courses = courses.filter((item) => {
				return item.name.includes(searchText);
			});
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});
	
	return router;
};
