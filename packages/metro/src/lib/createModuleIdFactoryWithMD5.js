/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 */

'use strict';
const crypto = require('crypto');

function createModuleIdFactoryWithMD5():  (path: string) => number | string {
  const fileToIdMap = new Map();
  return (path: string) => {
    if (!fileToIdMap.has(path)) {
      fileToIdMap.set(
        path, 
        crypto.createHash('md5')
              .update(path)
              .digest('hex')
      );    
    }
    return fileToIdMap.get(path);
  };
}

module.exports = createModuleIdFactoryWithMD5;
