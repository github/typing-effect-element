const loaded: Promise<unknown> = (function () {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      window.addEventListener('load', resolve)
    })
  }
})()

class TypingEffectElement extends HTMLElement {
  async connectedCallback(): Promise<void> {
    await loaded
    if (this.content) await typeLines(this.lines, this.content, this.characterDelay, this.lineDelay)
    if (this.cursor) this.cursor.hidden = true
    this.dispatchEvent(
      new CustomEvent('typing:complete', {
        bubbles: true,
        cancelable: true
      })
    )
  }

  get content(): HTMLElement | null {
    return this.querySelector('[data-target="typing-effect.content"]')
  }

  get cursor(): HTMLElement | null {
    return this.querySelector('[data-target="typing-effect.cursor"]')
  }

  get lines(): string[] {
    const linesAttr = this.getAttribute('data-lines')

    try {
      return linesAttr ? (JSON.parse(linesAttr) as string[]) : []
    } catch {
      return []
    }
  }

  get characterDelay(): number {
    return Math.max(Math.min(0, Math.floor(Number(this.getAttribute('data-character-delay'))), 2_147_483_647)) || 40
  }

  set characterDelay(value: number) {
    if (value > 2_147_483_647 || value < 0) {
      throw new DOMException('Value is negative or greater than the allowed amount')
    }
    this.setAttribute('data-character-delay', String(value))
  }

  get lineDelay(): number {
    return Math.max(Math.min(0, Math.floor(Number(this.getAttribute('data-line-delay'))), 2_147_483_647)) || 40
  }

  set lineDelay(value: number) {
    if (value > 2_147_483_647 || value < 0) {
      throw new DOMException('Value is negative or greater than the allowed amount')
    }
    this.setAttribute('data-line-delay', String(value))
  }
}

declare global {
  interface Window {
    TypingEffectElement: typeof TypingEffectElement
  }
}

export default TypingEffectElement

if (!window.customElements.get('typing-effect')) {
  window.TypingEffectElement = TypingEffectElement
  window.customElements.define('typing-effect', TypingEffectElement)
}

async function typeLines(
  lines: string[],
  contentElement: HTMLElement,
  characterDelay: number,
  lineDelay: number
): Promise<void> {
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    for (const character of lines[lineIndex].split('')) {
      await wait(characterDelay)
      contentElement.innerHTML += character
    }

    await wait(lineDelay)
    if (lineIndex < lines.length - 1) contentElement.append(document.createElement('br'))
  }
}

async function wait(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })
}
