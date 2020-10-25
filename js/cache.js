// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

const resources = [
	'people',
	'starships',
	'vehicles',
	'species',
	'planets',
	'films'
];

function replaceHttp(url) {
	return url.replace(/http:\/\//g, 'https://');
}

function normalizeUrl(url) {
	return replaceHttp(new URL(url).toString());
}

async function cacheResources() {
	const cache = {};

	for (const name of resources) {
		let url = `https://swapi.dev/api/${name}/`;

		while (url != null) {
			console.error(url);
			const response = await fetch(url);
			const text = await response.text();

			const data = JSON.parse(replaceHttp(text));

			cache[normalizeUrl(url)] = data;
			for (const obj of data.results || []) {
				cache[normalizeUrl(obj.url)] = obj;
			}

			url = data.next ? data.next.replace('http:', 'https:') : null;
		}
	}

	console.log('cache', cache);

	return cache;
}

function load(key){
	try {
		return JSON.parse(localStorage.getItem(key))
	} catch(e) {

	}
}

function save(key, data){
	try {
		localStorage.setItem(key, JSON.stringify(data));
		return true;
	} catch(e){
		return false
	}
}

async function getCache(){
	if (debugMode) return fetch('data.json').then(res => res.json());

	let key = 'swapicache'

	let cache = load(key);

	if (!cache) {
		cache = await cacheResources();
		save(key, cache);
	}

	return cache
}

const localUrlLoader = {
	async load(key){
		const cache = await getCache();
		return cache[key];
	}
}

const SwapiCache = {
	getCache,
	load,
	save,
	cacheResources,
	postData,
	replaceHttp,
	normalizeUrl,
	localUrlLoader,
}