describe('typing-effect', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('typing-effect')
      assert.equal('TYPING-EFFECT', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.TypingEffectElement()
      assert.equal('TYPING-EFFECT', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(function () {
      document.body.innerHTML = `
        <typing-effect></typing-effect>
      `
    })

    afterEach(function () {
      document.body.innerHTML = ''
    })

    it('initiates', function () {
      const ce = document.querySelector('typing-effect')
      assert.equal(ce.textContent, '')
    })
  })
})
