function flattenPackageLockDeps(packageLock) {
	const res = {};
	const dependencies = packageLock.dependencies;

	function walk(dep, name) {
		const version = dep.version;
		const dependencies = dep.dependencies;
		const key = name + '@' + version;
		if (!res[key]) {
			res[key] = { name, version };
		}
		if (dependencies) {
			Object.entries(dependencies).forEach(([key, value]) => walk(value, key));
		}
	}

	Object.entries(dependencies).forEach(function ([moduleName, moduleData]) {
		walk(moduleData, moduleName);
	});

	return res;
}

console.log(flattenPackageLockDeps(require('../../package-lock.json')));
