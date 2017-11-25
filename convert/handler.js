const {unpackArchive} = require('./sox');
const {convertFileToPNG} = require('./logic');

unpackArchive();

module.exports.handler = (event, context, cb) => {
  if (event.warmup) {
    return cb();
  }

  const {filename, base64File} = JSON.parse(event.body);

  return convertFileToPNG(base64File, filename)
    .then(pngFileUrl => {
      return cb(null, {body: JSON.stringify({pngFileURL})});
    })
    .catch(cb);
};
