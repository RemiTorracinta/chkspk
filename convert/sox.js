const {readFileSync} = require('fs');
const lambdaAudio = require('lambda-audio');
const path = require('path');

const message = "Created by SoX on chkspk.com"

/**
 * Converts a document to PNG from url by spawning LibreOffice process
 * @param inputFilename {String} Name of incoming file to convert in /tmp folder
 * @return {Buffer} Converted PNG file buffer
 */
module.exports.convertToPNG = function convertToPNG(inputFilename) {
  console.log(`[convertToPNG][file:${inputFilename}]`);
  const PNGFilename = getPNGFilename(inputFilename);
  var PNGFileBuffer;
  lambdaAudio.sox(["sox", inputFileName, "-n", "spectrogram",
                   "-c", message, "-o", PNGFilename])
  .then(response => {
    console.log(`[converted]`);
    PNGFileBuffer = readFileSync(`/tmp/${PNGFilename}`);
  })
  .catch(errorResponse => {
    console.log('Error from the sox command:', errorResponse);
    PNGFileBuffer = errorResponse;
    PNGFileName = PNGFileName + ".error";
  })

  const constBuffer = PNGFileBuffer
  return {
    constBuffer,
    PNGFilename
  };
};

function getPNGFilename(inputFilename) {
  const {name} = path.parse(inputFilename);
  return `${name}.PNG`;
}

module.exports.unpackArchive = function unpackArchive() {
  execSync(`cd /tmp && tar -xf /var/task/lo.tar.gz`);
};
