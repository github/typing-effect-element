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
    it('types a single line', async function () {
      const line = 'Welcome to GitHub!'
      const container = document.createElement('div')
      container.innerHTML = `
        <typing-effect data-lines='["${line}"]'>
          <span data-target="typing-effect.content"></span>
          <span data-target="typing-effect.cursor">|</span>
        </typing-effect>
      `
      const typingEffectElement = container.querySelector('typing-effect')
      const contentSpan = container.querySelector('span[data-target="typing-effect.content"]')
      document.body.append(container)

      await once(typingEffectElement, 'typing:complete')

      assert.equal(contentSpan.innerHTML, line)
    })

    it('types multiple lines', async function () {
      const lineOne = 'Welcome!'
      const lineTwo = 'Let‘s begin'
      const container = document.createElement('div')
      container.innerHTML = `
        <typing-effect data-lines='["${lineOne}", "${lineTwo}"]'>
          <span data-target="typing-effect.content"></span>
          <span data-target="typing-effect.cursor">|</span>
        </typing-effect>
      `
      const typingEffectElement = container.querySelector('typing-effect')
      const contentSpan = container.querySelector('span[data-target="typing-effect.content"]')
      document.body.append(container)

      await once(typingEffectElement, 'typing:complete')

      assert.equal(contentSpan.innerHTML, `${lineOne}<br>${lineTwo}`)
    })
  })

  describe('delay attributes', function () {
    let realMatchMedia
    before(() => {
      realMatchMedia = window.matchMedia
      window.matchMedia = mediaString => {
        if (mediaString === '(prefers-reduced-motion)') {
          return {matches: false}
        }
        return realMatchMedia(mediaString)
      }
    })

    after(() => {
      window.matchMedia = realMatchMedia
    })

    it('uses defaults when no delays specified', function () {
      const typingEffectElement = document.createElement('typing-effect')
      document.body.append(typingEffectElement)

      assert.equal(typingEffectElement.characterDelay, 40)
      assert.equal(typingEffectElement.lineDelay, 40)
    })
  })

  describe('a11y considerations', function () {
    let realMatchMedia
    before(() => {
      realMatchMedia = window.matchMedia
      window.matchMedia = mediaString => {
        if (mediaString === '(prefers-reduced-motion)') {
          return {matches: true}
        }
        return realMatchMedia(mediaString)
      }
    })

    after(() => {
      window.matchMedia = realMatchMedia
    })

    it('sets delay to 0 when media query matches (prefers-reduced-motion)', function () {
      const typingEffectElement = document.createElement('typing-effect')
      document.body.append(typingEffectElement)

      assert.equal(window.matchMedia('(prefers-reduced-motion)').matches, true)
      assert.equal(typingEffectElement.characterDelay, 0)
      assert.equal(typingEffectElement.lineDelay, 0)
    })
  })
})

function once(element, eventName) {
  return new Promise(resolve => {
    element.addEventListener(eventName, resolve, {once: true})
  })
}
