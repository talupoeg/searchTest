import express from "express";
import {
	readFileAsync,
	searchInArray,
	searchWithFuse,
	elapsedTime,
} from "./fn.js";

const app = express();
const port = process.env.PORT || 2021;

const path = {
	root: "/",
	end1: "/read",
	end2: "/search/simple",
	end3: "/search/simple-fuzzy",
};

// general service info
app.use(path.root, (req, res, next) => {
	console.log(`request is made for: ${req.url} with ${req.method} method`);
	next();
});

// for reading json body with requests
app.use(express.json());

// CREATE (semantics)
app.post(path.end2, async (req, res) => {
	// measure time
	let timeStart = process.hrtime();

	readFileAsync()
		.then((data) => {
			return searchInArray(req.body.keyword, data);
		})
		.then((data) => {
			let timeLapse = elapsedTime(timeStart, "simple search");
			res.send({ data: data, error: 0, time: timeLapse });
		})
		.catch((err) => {
			res.send({
				data: "",
				error: err.message,
			});
		});
});

// CREATE
app.post(path.end3, async (req, res) => {
	let timeStart = process.hrtime();

	readFileAsync()
		.then((data) => {
			return searchWithFuse(req.body.keyword, data);
		})
		.then((data) => {
			let timeLapse = elapsedTime(timeStart, "simple fuzzy search");
			res.send({ data: data, error: 0, time: timeLapse });
		})
		.catch((err) => {
			res.send({
				data: "",
				error: err.message,
			});
		});
});

// READ
app.get(path.end1, (req, res) => {
	readFileAsync()
		.then((data) => {
			res.json({ fileContents: data });
		})
		.catch((err) => {
			res.send({
				data: "",
				error: err.message,
			});
		});
});

app.listen(port, () => {
	console.log(`API server is running on port ${port}`);
});
