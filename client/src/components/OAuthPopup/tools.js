export const objectToQuery = (object) => {
	return new URLSearchParams(object).toString();
};

export const queryToObject = (query) => {
	const parameters = new URLSearchParams(query);
	return Object.fromEntries(parameters.entries());
};