// This is a sample test for the nested-test-name-under-cursor test suite

describe("my amazing test suite", function () {
  var meaninglessState;
  beforeEach(function () {
    meaninglessState = 'abc';
  });

  describe("nest level 1", function () {
    it("knows how to add 2 + 2", function () {
      expect(2 + 2).toEqual(4);
    });

    describe("nest level 2", function () {
      beforeEach(function () {
        meaninglessState = 'def';
      });

      it("can add 2 + 2 as well", function () {
        expect(2 + 2).toEqual(4);
      });
    })
  });
});