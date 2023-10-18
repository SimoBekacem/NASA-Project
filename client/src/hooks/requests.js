const URL_LINK = 'http://localhost:8080';
async function httpGetPlanets() {
	// Load planets and return as JSON.
	const response = await fetch(`${URL_LINK}/planets`);
	return response.json();
}

async function httpGetLaunches() {
	// Load launches, sort by flight number, and return as JSON.
	try {
		const responce = await fetch(`${URL_LINK}/launch`);
		return responce.json();
	} catch (error) {
		return {
			ok: false,
		};
	}
}

async function httpSubmitLaunch(launch) {
	console.log(
		'🚀 ~ file: requests.js:21 ~ httpSubmitLaunch ~ launch:',
		launch
	);
	// Submit given launch data to launch system.
	try {
		return await fetch(`${URL_LINK}/launch`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(launch),
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
