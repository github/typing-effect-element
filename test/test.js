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

  describe('content typing', function () {
    it('types a single line', function (done) {
      const line = 'Welcome to GitHub!'
      const container = document.createElement('div')
      container.innerHTML = `
        <typing-effect data-lines='["${line}"]'>
          <span data-target="typing-effect.content"></span>
          <span data-target="typing-effect.cursor">|</span>
        </typing-effect>
      `
      const contentSpan = container.querySelector('span[data-target="typing-effect.content"]')
      document.body.append(container)

      setTimeout(() => {
        assert.equal(contentSpan.textContent, line)
        done()
      }, 1500)
    })

    it('types multiple lines', function (done) {
      const lineOne = 'Welcome!'
      const lineTwo = 'Let‘s begin'
      const container = document.createElement('div')
      container.innerHTML = `
        <typing-effect data-lines='["${lineOne}", "${lineTwo}"]'>
          <span data-target="typing-effect.content"></span>
          <span data-target="typing-effect.cursor">|</span>
        </typing-effect>
      `
      const contentSpan = container.querySelector('span[data-target="typing-effect.content"]')
      document.body.append(container)

      setTimeout(() => {
        assert.equal(contentSpan.innerHTML, `${lineOne}<br>${lineTwo}`)
        done()
      }, 1500)
    })
  })
})
