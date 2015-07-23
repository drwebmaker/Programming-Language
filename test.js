var parse = require('./app/parser/parse.js'),
    topEnv = require('./app/environment/topEnv'),
    evaluate = require('./app/evaluate/evaluate'),
    specialForms = require('./app/evaluate/specialForms'),
    expect =  require('expect.js'),
    run =  require('./app/run.js'),
    isString =  require('./app/helpers/helpers.js'),
    skipSpace =  require('./app/parser/skipSpace.js'),
    sinon = require('sinon');

describe('Programming Language', function() {
  describe('#parse()', function() {

    it('parse string', function() {
      var testObg = { type: 'apply',
        operator: { type: 'word', name: '+' },
        args: [ { type: 'word', name: 'a' }, { type: 'value', value: 10 } ] };
      expect(parse("+(a, 10)")).to.eql(testObg);
    });

    it('Should return error if not an string', function() {
      expect(function() {parse(1)}).to.throwError('Unexpected value');
    });

    it('Should return object', function() {
      expect(parse("+(a, 10)")).to.be.an('object');
    });

  });

  describe('#evaluate()', function() {
    it('Should return false', function() {
      var prog = parse("if(true, false, true)");
      expect(evaluate(prog, topEnv)).to.equal(false);
    });


  });

  describe('#topEnv', function() {
    it('topEnv["print"]', function() {

      var spy = sinon.spy();
      topEnv.print(spy());
      expect(spy.called).to.equal(true);
    });

    it('topEnv["array"] - should return array', function() {

      var arr = [1, 3, 4, 5];
      var arr2 = [1, 3, 4, 5];
      expect(topEnv.array(arr, arr2)).to.be.an('array');
    });

    it('topEnv["length"] - should return length of array', function() {

      var arr = [1, 3, 4, 5];
      expect(topEnv.length(arr)).to.equal(arr.length);
    });

    it('topEnv["element"] - should return element of array', function() {

      var arr = [1, 3, 4, 5];
      expect(topEnv.element(arr, 2)).to.equal(arr[2]);
    });
  });


  describe('#specialForms', function() {
    it('specialForms["if"] - should return second value if first value is true, else third value', function() {


      var tmp = [ { type: 'word', name: 'true' },
        { type: 'word', name: 'false' },
        { type: 'word', name: 'true' } ];
      expect(specialForms.if(tmp, topEnv)).to.equal(false);
    });

    it('specialForms["if"] - should return error if bad numbers of args', function() {
      expect(function() {specialForms.if(true, false, true)}).to.throwError('Bad number of args to if');
    });

    it('Must be have property "define"', function() {
      expect(specialForms).to.have.property("define");
    });

  });

  describe("isString()", function() {
    it("Should return true if it's string", function() {
      var testStr = 'djgkjasdfabs';
      expect(isString(testStr)).to.equal(true);
    });
    it("Should return false if it's not string", function() {
      var testArr = [1, 56, 87, 45, 76];
      expect(isString(testArr)).to.equal(false);
    });
    it('Should not return an Object', function () {
      var testStr = 'djgkjasdfabs';
      expect(isString(testStr)).to.not.be.a('object');
    });
  });

  describe("skipSpace()", function() {
    it("Should return string without spaces in begining", function() {
      var testStr = ' djgkja sdfabs ';
      expect(skipSpace(testStr)).to.equal('djgkja sdfabs ');
    });

    it("Should return string", function() {
      var testStr = ' djgkja sdfabs ';
      expect(skipSpace(testStr)).to.be.a('string');
    });

  });

});