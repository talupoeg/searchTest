import fs from "fs";
import Fuse from "fuse.js";

const fileName = "./names.txt";

// readFile
const readFileAsync = async () => {
	let promise = new Promise((resolve, reject) => {
		fs.readFile(fileName, "utf8", (err, data) => {
			if (err) reject(new Error(err.message));
			resolve(data);
		});
	});

	return await promise;
};

// simple array search
const searchInArray = (keyword, data) => {
	let arr = data.split(/\r?\n/);
	let index = arr.indexOf(keyword);

	return { lineNr: index + 1, string: arr[index] };
};

// fuzzy search with external lib
const searchWithFuse = (keyword, data) => {
	const opt = {
		includeScore: true,
		threshold: 0.39
	};
	const fuse = new Fuse(data.split(/\r?\n/), opt);
	const result = fuse.search(keyword);

	return result;
};

// measure time
// https://stackoverflow.com/questions/10617070/how-do-i-measure-the-execution-time-of-javascript-code-with-callbacks
const elapsedTime = (start, msg) => {
	const precision = 1; // 1 decimal places
	const elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
	let reportTime = {
		elapsed: elapsed.toFixed(precision) + " ms ",
		msg,
	};
	start = process.hrtime(); // reset the timer

	return reportTime;
};

export { readFileAsync, searchInArray, searchWithFuse, elapsedTime };
