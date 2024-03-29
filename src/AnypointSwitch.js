import { LitElement, html } from 'lit-element';
import { CheckedElementMixin } from '@anypoint-web-components/anypoint-form-mixins';
import { ButtonStateMixin, ControlStateMixin } from '@anypoint-web-components/anypoint-control-mixins';
import { onIcon, offIcon } from './AnypointSwitchIcons.js';
import styles from './Styles.js';

/* eslint-disable class-methods-use-this */

/**
 * `anypoint-switch`
 */
export class AnypointSwitch extends ButtonStateMixin(ControlStateMixin(CheckedElementMixin(LitElement))) {
  // eslint-disable-next-line class-methods-use-this
  get styles() {
    return styles;
  }

  static get properties() {
    return {
      formDisabled: { type: Boolean, reflect: true },
      /**
       * Enables Anypoint compatibility
       */
      compatibility: { type: Boolean, reflect: true }
    };
  }

  /**
   * @returns {EventListener} Previously registered event listener or null
   */
  get onchange() {
    return this._onchange || null;
  }

  /**
   * @param {EventListener} value An event listener for the `change` event or null to unregister
   */
  set onchange(value) {
    const old = this._onchange;
    if (old === value) {
      return;
    }
    if (old) {
      this.removeEventListener('change', old);
    }
    if (typeof value !== 'function') {
      this._onchange = null;
    } else {
      this._onchange = value;
      this.addEventListener('change', value);
    }
  }

  constructor() {
    super();
    this.ariaActiveAttribute = 'aria-checked';
    this.checked = false;
    this.compatibility = false;
    this.toggles = true;
    /* to work with iron-form */
    this._hasIronCheckedElementBehavior = true;
  }

  connectedCallback() {
    // button state mixin sets role to checkbox
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox');
    }
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('aria-checked')) {
      this.setAttribute('aria-checked', 'false');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  /**
   * Synchronizes the element's `active` and `checked` state.
   */
  _buttonStateChanged() {
    if (this.disabled) {
      return;
    }
    this.checked = this.active;
  }

  /**
   * @param {MouseEvent} e 
   */
  _clickHandler(e) {
    if (this.disabled) {
      return;
    }
    super._clickHandler(e);
    this.dispatchEvent(new Event('change'));
  }

  /**
   * @param {boolean} value
   */
  _checkedChanged(value) {
    super._checkedChanged(value);
    this.setAttribute('aria-checked', value ? 'true' : 'false');
    this.validate(this.checked);
  }

  checkValidity() {
    return this.required ? this.checked : true;
  }

  formDisabledCallback(disabled) {
    this.formDisabled = disabled;
  }

  formResetCallback() {
    this.checked = false;
  }

  formStateRestoreCallback(state) {
    this.checked = !!state;
  }

  _disabledChanged(disabled) {
    this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    this.setAttribute('tabindex', disabled ? '-1' : '0');
  }

  _mdContent() {
    return html`<div class="track"></div>
    <div class="toggle-container">
      <div class="button"></div>
    </div>`;
  }

  _compatibleContent() {
    const { checked } = this;
    const icon = checked ? onIcon : offIcon;
    return html`
    <div class="anypoint container">
      <div class="tracker">
        <div class="toggle">
          <span class="icon">${icon}</span>
        </div>
      </div>
    </div>`;
  }

  render() {
    const { compatibility } = this;
    return html`
    <style>${this.styles}</style>
    ${compatibility ?
      this._compatibleContent() :
      this._mdContent()}
    <div class="label"><slot></slot></div>
    `;
  }
}
