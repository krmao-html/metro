'use strict';

const createModuleIdFactory = require('../../lib/createModuleIdFactory');
const createModuleIdFactoryWithMD5 = require('../../lib/createModuleIdFactoryWithMD5');

function checkExcludeModules(exclude: string) {
	let excludedModules: mixed = null

	if (exclude) {
		console.log("\nInit excludedModules from path:", exclude)
		excludedModules = require(String(require('path').resolve(process.cwd(), exclude))).modules;
	} else {
		console.log("\nSkip init excludedModules...")
	}
	return excludedModules
}

function filterFinalModules(modules: mixed, excludedModules: mixed, bundleOutput: string) {
	if (modules) {
		let finalModules = modules // 过滤重复模块
		const manifest = {modules: Object.create(null)} // 输出配置信息

		console.log("\n\nFilter before modules.length==" + finalModules.length + "\n")

		finalModules = finalModules.filter(module => {
			const keep = !excludedModules || (excludedModules && !excludedModules[module.name]);
			console.log("Filtering " + (keep ? "keep   -> " : "remove -> "), module.id, module.type, module.name, module.path | module.sourcePath)

			if (keep && module.type === "module") {
				manifest.modules[module.name] = {id: module.id, type: module.type}; // 暂不理解其它类型的用处, 目前只输出 'module' 类型
			}
			return keep
		})

		console.log("\nFilter after  modules.length==" + finalModules.length + "\n")

		if (bundleOutput) {
			const manifestJsonString = JSON.stringify(manifest, null, 2);
			const writeManifest = require('../../shared/output/writeFile')(bundleOutput + '.json', manifestJsonString, null);
			console.log('manifest: Writing manifest output to ' + bundleOutput + '.json')
			writeManifest.then(() => {
				console.log('manifest: Done writing manifest output')
			});
		}
		return finalModules
	} else {
		return modules
	}
}

module.exports = {
	checkExcludeModules,
	filterFinalModules,
};
