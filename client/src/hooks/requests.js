const URL_LINK = 'http://localhost:8080';
async function httpGetPlanets() {
	// Load planets and return as JSON.
	const response = await fetch(`${URL_LINK}/planets`);
	return response.json();
}

async function httpGetLaunches() {
	// TODO: Once API is ready.
	// Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
	// TODO: Once API is ready.
	// Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
