// place files you want to import through the `$lib` alias in this folder.
const grupos = ['~', 'A', 'B', 'C'];

export function nextGroup(current: string) {
	let nextIndex = grupos.indexOf(current) + 1;
	if (nextIndex == grupos.length) {
		nextIndex = 0;
	}
	return grupos[nextIndex];
}

export function initGroup() {
	return grupos[0];
}
