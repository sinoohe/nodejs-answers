'use strict';
const util = require('util'),
  fs = require('fs'),
  exists = util.promisify(fs.exists),
  stat = util.promisify(fs.stat),
  readFile = util.promisify(fs.readFile),
  AppError = require('./appError');


async function fileExists(path) {
  try {
    return await exists(path);
  } catch (e) {
    throw new AppError('error in file exists', e);
  }
}
async function fileStat(path) {
  try {
    return await stat(path);
  } catch (e) {
    throw new AppError('Error trying to get stats', e);
  }
}

async function fileRead(path) {
  try {
    return readFile(path);
  } catch (e) {
    throw new AppError('Error trying read file', e);
  }
}

/**
 *
 * @param path
 * @return {Promise<String|Buffer>}
 */
async function getFileContents(path) {
  const existFile = await fileExists(path);
  if (!existFile) {
    throw new AppError('File does not exist');
  }
  console.log('exists');
  const stats = await fileStat(path);
  if (stats.size === 0) {
    throw new AppError('File exists but there is no content');
  }
  return await fileRead(path);
}


(async () => {
  const path = process.argv[2];
  try {
    const contents = await getFileContents(path);
    console.info('File was found and the contents were loaded');
  } catch (e) {
    if (e instanceof AppError) {
      console.log(`There was an error getting contents for ${path}: ${e.msg}`, e.error);
    } else {
      console.log(`There was an error getting contents for ${path}:`, e);
    }
  }
})();