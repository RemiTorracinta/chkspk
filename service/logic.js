const {writeFileSync} = require('fs');
const {convertToPNG} = require('./sox');
const {uploadPNG} = require('./s3');

const MAX_FILE_SIZE = 35 * 1024 * 1024;

/**
 * Validate, save, convert and uploads file
 * @param base64File {String} File in base64 format
 * @param filename {String} Name of file to convert
 * @return {Promise.<String>} URL of uploaded file on S3
 */
module.exports.convertFileToPNG = function convertFileToPNG(base64File, filename) {
  console.log(`[start][file:${filename}][buffer:${base64File.slice(0, 16)}...]`);

  const fileBuffer = new Buffer(base64File, 'base64');
  console.log(`[size:${fileBuffer.length}]`);

  validate(fileBuffer);

  writeFileSync(`/tmp/${filename}`, fileBuffer);
  console.log(`[written]`);

  const {PNGFilename, PNGFileBuffer} = convertToPNG(filename);

  return uploadPNG(PNGFilename, PNGFileBuffer);
};

function validate(fileBuffer) {
  if (fileBuffer.length > MAX_FILE_SIZE) {
    return Promise.reject(new Error('File is too large'));
  }

  if (fileBuffer.length < 4) {
    return Promise.reject(new Error('File is too small'));
  }
}
