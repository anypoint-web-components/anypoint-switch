import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '../anypoint-switch.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'demoCompatibility',
      'demoDisabled'
    ]);
    this._componentName = 'anypoint-switch';

    this.demoStates = ['Material Design', 'Anypoint'];

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoCompatibility = false;
        break;
      case 1:
        this.demoCompatibility = true;
        break;
    }
  }

  _demoTemplate() {
    const {
      demoStates,
      demoCompatibility,
      darkThemeActive,
      demoDisabled
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the switch button element with various
          configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-switch
            slot="content"
            ?compatibility="${demoCompatibility}"
            ?disabled="${demoDisabled}"
          >
            off/on
          </anypoint-switch>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoDisabled"
            @change="${this._toggleMainOption}">Disabled</anypoint-checkbox>

        </arc-interactive-demo>
      </section>
    `;
  }

  _introductionTemplate() {
    return html`
      <section class="documentation-section">
        <h3>Introduction</h3>
        <p>
          This component is based on Material Design switch and adjusted for
          Anypoint platform components.
        </p>
        <p>
          Anypoint web components are set of components that allows to build
          Anypoint enabled UI in open source projects.
        </p>
        <p>
          Switches toggle the state of a single setting on or off.
          They are the preferred way to adjust settings on mobile.
        </p>
      </section>
    `;
  }

  _usageTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint chip comes with 2 predefied styles:</p>
        <ul>
          <li><b>Material Design</b> - Normal state</li>
          <li>
            <b>Compatibility</b> - To provide compatibility with Anypoint design
          </li>
        </ul>

        <p>
          See
          <a href="https://material.io/components/selection-controls/#switches"
            >switches</a
          >
          documentation in Material Defign documentation for principles and
          anatomy of a switch button.
        </p>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint switch (toggle button)</h2>
      ${this._demoTemplate()}
      ${this._introductionTemplate()}
      ${this._usageTemplate()}
    `;
  }
}

window.addEventListener('chip-removed', (e) => {
  e.target.parentNode.removeChild(e.target);
});

const instance = new DemoPage();
instance.render();
window._demo = instance;
