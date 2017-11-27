const {S3} = require('aws-sdk');

const s3 = new S3({region: 'us-east-1'});

/**
 * Uploads converted PNG file to S3 bucket
 * and removes it from /tmp afterwards
 * @param filename {String} Name of PNG file
 * @param fileBuffer {Buffer} Converted PNG Buffer
 * @return {Promise.<String>} URL of uploaded PNG on S3
 */
function uploadPNG(filename, fileBuffer) {
  const options = {
    Bucket: process.env.bucket_name,
    Key: `tmp/PNG/${filename}`,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: 'application/PNG'
  };

  return s3.upload(options)
    .promise()
    .then(({Location}) => Location)
    .then(Location => {
      execSync(`rm /tmp/${filename}`);
      console.log(`[removed]`);

      return Location;
    })
    .catch(error => {
      execSync(`rm /tmp/${filename}`);
      console.log(`[removed]`);

      throw error;
    });
}

module.exports = {
  uploadPNG
};
