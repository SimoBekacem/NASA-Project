const API_URL = 'http://localhost:8080/v1';

async function httpGetPlanets() {
	// Load planets and return as JSON.
	const respanse = await fetch(`${API_URL}/planets`);
	return respanse.json();
}

async function httpGetLaunches() {
	// Load launches, sort by flight number, and return as JSON.
	const respanse = await fetch(`${API_URL}/launch`);
	const launchesData = respanse.json();
	return launchesData;
}

async function httpSubmitLaunch(launch) {
	// Submit given launch data to launch system.
	try {
		return await fetch(`${API_URL}/launch`, {
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
	// Delete launch with given ID.
	try {
		return await fetch(`${API_URL}/launch/${id}`, {
			method: 'delete',
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
