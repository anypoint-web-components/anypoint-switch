import {TemplateResult, CSSResult, LitElement} from 'lit-element';
import { CheckedElementMixin } from '@anypoint-web-components/anypoint-form-mixins';
import { ButtonStateMixin, ControlStateMixin } from '@anypoint-web-components/anypoint-control-mixins';

/**
 * `anypoint-switch`
 */
export class AnypointSwitch {
  readonly styles: CSSResult;

  formDisabled: boolean;
  /**
   * Enables Anypoint compatibility
   */
  compatibility: boolean;

  readonly formAssociated: boolean;

  readonly form: HTMLFontElement;

  constructor();

  connectedCallback(): void;

  /**
   * Synchronizes the element's `active` and `checked` state.
   */
  _buttonStateChanged(): void;

  _clickHandler(e: MouseEvent): void;

  _checkedChanged(value: boolean): void;

  checkValidity(): boolean;

  formDisabledCallback(disabled: boolean): void;

  formResetCallback(): void;

  formStateRestoreCallback(state: boolean): void;

  _disabledChanged(disabled: boolean): void;

  _mdContent(): TemplateResult;

  _compatibleContent(): TemplateResult;

  render(): TemplateResult;
}

export interface AnypointSwitch extends ButtonStateMixin, ControlStateMixin, CheckedElementMixin, LitElement {
}
