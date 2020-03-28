const fs = require('mz/fs')
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
  const r = await fs.readFile(filePath, 'utf8').then((i)=>i)
  return r
}

/**
 * GET THE LOCATION OF FIRST AND LAST SEPARATORS LIKE '---'
 *
 * @param {Array} linesArray | Array to search
 * @param {Number} limit | Limit of lines for iteration
 *
 * @return {Object} { first: <number>, last:<number> }
 */
const getSeparatorLocation = (linesArray, limit = 30) => {
  const metaData = {}

  for (line in linesArray) {
    if (line < limit) {
      if (linesArray[line] === '---') {
        if (!metaData.first) {
          metaData.first = line
        } else if (!metaData.last) {
          metaData.last = line
        }
      }
    }
  }
  return metaData
}

/**
 *  GET DE OBJ FROM FIRST LINES OF MARKDOWN ARRAY
 *
 * @param {Array} rawMDLines | MarkDown Array
 * @param {Number} firstDash | Where is the first line of object
 * @param {Number} lastDash | Where is the last line of object
 *
 * @return {Object} | Object that was in MarkDown array
 */
const getObjInMD = (rawMDLines, firstDash, lastDash) => {
  const obj = {}
  let i = parseInt(firstDash) + 1
  let keyValue

  while (i < lastDash) {
    keyValue = rawMDLines[i].split(':')
    obj[keyValue[0]] = keyValue[1].trim()
    i ++
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
module.exports = async function parsemd(file, limit = 30, returnMeta = false) {
  const rawMDFile = await getFile(file)
  const rawMDLines = rawMDFile.split('\n')

  const dash = getSeparatorLocation(rawMDLines, limit)
  const metaData = {
    dash,
    content: getObjInMD(rawMDLines, dash.first, dash.last),
  }

  if (returnMeta) {
    return metaData
  } else {
    response = {
      body: rawMDLines.slice(parseInt(metaData.dash.last) + 1).join('\n'),
      ...metaData.content,
    }
    return response
  }
}
