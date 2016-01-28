var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

var lineReader = require('../index');

chai.use(chaiAsPromised);
var expect = chai.expect;
var should = chai.should();

beforeEach(function() {
  lineReader.throwError = false;
});

// Samples to test the testing framework (!)

it('promise resolves/rejects as expected',
  function() {
    var p = new Promise(function(resolve, reject) {
      resolve();  // passes
      //reject();  // fails, as expected
    });
    return p.should.not.be.rejected;
  });

it('exception causes promise to be rejected',
  function() {
    lineReader.throwError = true;
    var p = lineReader("foo.txt", function() {});
    return p.should.be.rejectedWith(ReferenceError);
  });


it('fails when trying to read non-existent file',
  function() {
    var p = lineReader("foo.txt", function() {});
    return p.should.be.rejectedWith(
      'Error trying to open read stream for foo.txt');
  });


it('successfully reads an existing file',
  function() {
    var lineCounter = 0;
    var p = lineReader(__dirname + "/good.txt", function(line) {
      lineCounter++;
    })
    .then(function() { return lineCounter; });

    return p.should.eventually.equal(3);
  });

it('rejects when line handler throws an error',
  function() {
    var p = lineReader(__dirname + "/good.txt", function(line) {
      throw "dang";
    });
    return p.should.be.rejectedWith('dang');
  });

