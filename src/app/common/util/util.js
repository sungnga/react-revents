export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// This will accommodate any given file extensions
// - the filename.lastIndexOf('.') -1 will return -1 if there's no period in the filename
// - it will return 0 if a file is .filename
// - the >>> 0 will accommodate files like .filename. It will return an empty string for the extension, which is fine
export function getFileExtension(filename) {
	return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function createDataTree(dataset) {
	let hashtable = Object.create(null);
	dataset.forEach((a) => (hashtable[a.id] = { ...a, childNodes: [] }));
	let dataTree = [];
	// console.log(hashtable)
	dataset.forEach((a) => {
		if (a.parentId) hashtable[a.parentId].childNodes.push(hashtable[a.id]);
		else dataTree.push(hashtable[a.id]);
	});
	return dataTree;
}
