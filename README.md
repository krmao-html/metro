# Metro

[![CircleCI Build Status](https://circleci.com/gh/facebook/metro.svg?style=shield)](https://circleci.com/gh/facebook/metro)
[![npm version](https://badge.fury.io/js/metro.svg)](http://badge.fury.io/js/metro)

🚇 The JavaScript bundler for React Native.

- **🚅 Fast**: We aim for sub-second reload cycles, fast startup and quick bundling speeds.
- **⚖️ Scalable**: Works with thousands of modules in a single application.
- **⚛️ Integrated**: Supports every React Native project out of the box.

This project was previously part of the [react-native](https://github.com/facebook/react-native) repository. In this smaller repository it is easier for the team working on Metro Bundler to respond to both issues and pull requests. See [react-native#13976](https://github.com/facebook/react-native/issues/13976) for the initial announcement.

## Installation & Documentation

See [the Metro website](https://facebook.github.io/metro/) for documentation.


# Custom Metro To Split Modules For React Native

🚇 Reference Metro From Native Path
- **🚅 build es6 to es5**: 
```
cd ~/workspace/smart-metro
npm run build-clean && npm run build
```
- **🚅 publish local release**: 
```
cd packages/metro
npm run package-release

```
- **🚅 install local**: 
```
npm install -g install-local

cd ~/workspace/ReactNativeProject
rm -rf node_modules/metro
install-local --save ~/workspace/smart-metro/packages-release/metro
```
- **🚅 install and update local with one key**:

```
cd ~/workspace/smart-metro/ && npm run build-clean && npm run build && cd packages/metro && npm run package-release && cd ~/workspace/template/apps/app-template/react_native && install-local --save ~/workspace/smart-metro/packages-release/metro
```

# node_modules/react-native/local-cli/bundle modify [see samples](https://github.com/krmao/template/tree/reactnative/apps/app-template/react_native)
* 1 bundleCommandLineArgs.js add command
    ```
        command: '--exclude [string]',
        description: 'Manifest file name where modules to exclude are stored, ex. /tmp/manifest.json',
      }, {
    ```

* 2 buildBundle.js

   * from:
        ```
          const requestOpts: RequestOptions = {
            entryFile: args.entryFile,
            sourceMapUrl,
            dev: args.dev,
            minify: args.minify !== undefined ? args.minify : !args.dev,
            platform: args.platform,
          };
        ```

   * to:
        ```
          const requestOpts: RequestOptions = {
            entryFile: args.entryFile,
            sourceMapUrl,
            dev: args.dev,
            minify: args.minify !== undefined ? args.minify : !args.dev,
            platform: args.platform,
            exclude: args.exclude,
            bundleOutput: args.bundleOutput,
          };
        ```