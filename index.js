var fs = require('fs');
var readline = require('readline');

// Line reader utility that uses promises - this would be a nice
// stand-alone module

lineReader = module.exports =
  function(file, line_handler) {
    return new Promise(function(resolve, reject) {
      // Make sure any i/o errors cause the promise to be rejected
      try {
        // For testing only, this will throw a ReferenceError
        if (lineReader.throwError) a = b;

        var readstream_error = false;

        var rs = fs.createReadStream(file)
          .on('error', function() {
            readstream_error = true;
            this.emit('end');
          })
        ;

        var inf = readline.createInterface({input: rs})
          .on('line', function(line) {
            try { line_handler(line); }
            catch(err) { reject(err); }
          })
          .on('close', function(data) {
            if (readstream_error) {
              reject("Error trying to open read stream for " + file);
            }
            resolve();
          })
          .on('end', resolve)
        ;
      }
      catch(err) {
        reject(err);
      }
    });
  };

