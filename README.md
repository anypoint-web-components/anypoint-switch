# anypoint-switch

Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile.

This component is based on Material Design switch and adjusted for Anypoint platform components.

Anypoint web components are set of components that allows to build Anypoint enabled UI in open source projects.

[![Published on NPM](https://img.shields.io/npm/v/@anypoint-web-components/anypoint-switch.svg)](https://www.npmjs.com/package/@anypoint-web-components/anypoint-switch)

[![tests](https://github.com/anypoint-web-components/anypoint-switch/actions/workflows/deployment.yml/badge.svg)](https://github.com/anypoint-web-components/anypoint-switch/actions/workflows/deployment.yml)

## Usage

### Installation

```sh
npm install --save @anypoint-web-components/anypoint-switch
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@anypoint-web-components/anypoint-switch/anypoint-switch.js';
    </script>
  </head>
  <body>
    <anypoint-switch>on/of</anypoint-switch>
    <script>
    {
      document.querySelector('anypoint-switch').onchange = () => {
        // ...
      };
    }
    </script>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-switch/anypoint-switch.js';

class SampleElement extends PolymerElement {
  render() {
    return html`
    <anypoint-switch
      .checked="${this.checked}"
      @change="${this._switchHandler}">on/off</anypoint-switch>
    `;
  }

  _switchHandler(e) {
    this.checked = e.detail.value;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/anypoint-web-components/anypoint-switch
cd anypoint-switch
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
