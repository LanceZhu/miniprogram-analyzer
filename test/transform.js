let expect = require('chai').expect
let { removeUselessTag } = require('../lib/transform')
let { describe, context, it } = require('mocha')

describe('#removeUselessTag()', function () {
  context('without arguments', () => {
    it('should return 0', () => {
      expect(removeUselessTag()).to.equal(0)
    })
  })

  context('with number arguments', () => {
    it('should return 0', () => {
      expect(removeUselessTag(1)).to.equal(0)
    })
  })

  context('with non-exist path', () => {
    it('should return 0', () => {
      expect(removeUselessTag('/adsf')).to.equal(0)
    })
  })

  context('with empty path', () => {
    it('should return 0', () => {
      expect(removeUselessTag('/adsf')).to.equal(0)
    })
  })

  context('with exist path', () => {
    it('should return 1', () => {
      expect(removeUselessTag('./test')).to.equal(1)
    })
  })
})
