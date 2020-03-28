const fs = require('fs')
const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)
const path = require('path')

// IMPORTANT INFORMATION
/**
 * By now, this module transfor the intire file in array and than transform
 * in obj organized.
 * However, a better way is to, first, split te file in the secont '---',
 * and then parse the Obj and do not touch, the body of file, that could be
 * enormous.
 *
 * But now, this code is a MVP to solve this problem, and the above solution
 * was concieved when this module was finished.
 * */

/**
 * GET FILE
 *
 * @param {String} file | Path to object
 *
 * @return {String} | File that you want
 */
async function getFile(file) {
  const filePath = path.join(__dirname, file)
  return readFileAsync(filePath, 'utf8')
  .then(data => data)
  .catch(error => error)
}

/**
 * GET THE LOCATION OF FIRST AND LAST SEPARATORS LIKE '---'
 *
 * @param {String} text | Array to search
 * @param {Number} limit | Limit of lines for iteration
 *
 * @return {Object} { data:<Stirng>, body:<String> }
 */
const getDataAndBody = (text, limit = 30) => {
  const metaData = {}
  const separatorLocation = text.search('\n---\n')
  return {
    data: text.substr(0, separatorLocation),
    body: text.substr(separatorLocation + 5)
  }
}

/**
 *  GET DE OBJ FROM FIRST LINES OF MARKDOWN ARRAY
 *
 * @param {Array} rawMDLines | MarkDown comment content Array
 *
 * @return {Object} | Object that was in MarkDown array
 */
const getObjInMD = (rawMDLines) => {
  const obj = {}
  let keyValue
  for (i in rawMDLines) {
    keyValue = rawMDLines[i].split(':')
    obj[keyValue[0]] = keyValue[1].trim()
  }
  return obj
}

/**
 *  PARSE MARKDOWN FILE TO OBJECT
 *
 * @param {String} file | Path to the File
 * @param {Number} limit | Limit of Lines that you want to iterate
 * @param {Boolean} returnMeta | Want to return only meta data?
 *
 * @return {Object} | {body:<MarkDown content>, ...<All parameters in markdown>}
 */
module.exports = async function parsemd(file, limit = 30) {
  const rawMDFile = await getFile(file)
  const rawMD = getDataAndBody(rawMDFile, limit)

  const dataLines = rawMD.data.split('\n')
  dataLines.reverse().pop()
  dataLines.reverse()

  const response = {
    body: rawMD.body,
    data: getObjInMD(dataLines)
  }

  return response
}
