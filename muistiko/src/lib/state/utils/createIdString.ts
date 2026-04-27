export function createIdString(stringLength: number) {
	const idNumbers = [];
	for (let i = 0; i < stringLength; i++) {
		idNumbers.push(Math.floor(Math.random() * 10));
	}

	return idNumbers.join('');
}
