# &lt;typing-effect&gt; element

A custom element that shows text as if it were being typed

## Installation

```
$ npm install @github/typing-effect-element
```

## Usage

```js
import '@github/typing-effect-element'
```

```html
<typing-effect data-lines='["Welcome to GitHub!", "Let’s begin the adventure"]'>
  <span data-target="typing-effect.content"></span>
  <span data-target="typing-effect.cursor">|</span>
</typing-effect>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
