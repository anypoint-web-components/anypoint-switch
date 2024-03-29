/* eslint-disable lit-a11y/role-has-required-aria-attrs */
/* eslint-disable lit-a11y/tabindex-no-positive */
import { fixture, assert, aTimeout, nextFrame, html } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '../anypoint-switch.js';

/** @typedef {import('../').AnypointSwitch} AnypointSwitch */

describe('<anypoint-switch>', () => {
  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function basicFixture() {
    return (fixture(html`<anypoint-switch>on/off</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function noLabelFixture() {
    return (fixture(html`<anypoint-switch></anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function checkedFixture() {
    return (fixture(html`<anypoint-switch checked>on/off</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function tabIndexFixture() {
    return (fixture(html`<anypoint-switch tabindex="1">on/off</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function roleFixture() {
    return (fixture(html`<anypoint-switch role="radio">Batman</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function disabledFixture() {
    return (fixture(html`<anypoint-switch disabled tabindex="1">Batman</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function compatibilityFixture() {
    return (fixture(html`<anypoint-switch compatibility>on/off</anypoint-switch>`));
  }

  /**
   * @returns {Promise<AnypointSwitch>}
   */
  async function checkedCompatibilityFixture() {
    return (fixture(html`<anypoint-switch checked compatibility>on/off</anypoint-switch>`));
  }

  /**
   * @returns {Promise<HTMLFormElement>}
   */
  async function formFixture() {
    return (fixture(html`<form>
      <anypoint-switch name="test-name" value="test-value"></anypoint-switch>
    </form>`));
  }

  /**
   * @returns {Promise<HTMLFormElement>}
   */
  async function formCheckedFixture() {
    return (fixture(html`<form>
      <anypoint-switch name="test-name" value="test-value" checked></anypoint-switch>
    </form>`));
  }

  /**
   * @returns {Promise<HTMLFormElement>}
   */
  async function formCheckedRequiredFixture() {
    return (fixture(html`<form>
      <anypoint-switch name="test-name" value="test-value" checked required></anypoint-switch>
    </form>`));
  }

  describe('Defaults', () => {
    let c1;
    beforeEach(async () => {
      c1 = await noLabelFixture();
    });

    it('check switch via click', async () => {
      MockInteractions.tap(c1);
      await aTimeout(0);
      assert.equal(c1.getAttribute('aria-checked'), 'true', 'Has aria-checked');
      assert.isTrue(c1.checked, '.checked is true');
    });

    it('toggle switch via click', async () => {
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout(0);
      assert.isFalse(c1.getAttribute('aria-checked') !== 'false');
      assert.isFalse(c1.checked);
    });

    it('disabled switch cannot be clicked', async () => {
      c1.disabled = true;
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout(100);
      assert.isTrue(c1.getAttribute('aria-checked') === 'true', 'has checked attribute');
      assert.isTrue(c1.checked, 'is checked');
    });

    it('switch can be validated', () => {
      c1.required = true;
      assert.isFalse(c1.validate());
      c1.checked = true;
      assert.isTrue(c1.validate());
    });

    it('disabled switch is always valid', () => {
      c1.disabled = true;
      c1.required = true;
      assert.isTrue(c1.validate());
      c1.checked = true;
      assert.isTrue(c1.validate());
    });

    it('Passes validation', () => {
      const result = c1.checkValidity();
      assert.isTrue(result);
    });
  });

  describe('compatibility', () => {
    let element;
    beforeEach(async () => {
      element = await compatibilityFixture();
    });

    it('renders unchecked icon', () => {
      const icon = element.shadowRoot.querySelector('.anypoint .icon svg');
      assert.ok(icon);
    });

    it('renders checked icon', async () => {
      const uncheckedIcon = element.shadowRoot.querySelector('.anypoint .icon svg');
      element.checked = true;
      await nextFrame();
      const checkedIcon = element.shadowRoot.querySelector('.anypoint .icon svg');
      assert.ok(checkedIcon, 'has checked icon');
      assert.notEqual(checkedIcon, uncheckedIcon, 'it is not unchecked icon');
    });
  });

  describe('Disabled state', () => {
    let element;
    beforeEach(async () => {
      element = await disabledFixture();
    });

    it('sets tabindex to -1', () => {
      assert.equal(element.getAttribute('tabindex'), '-1');
    });

    it('enabling button sets tabindex', async () => {
      element.disabled = false;
      await nextFrame();
      assert.equal(element.getAttribute('tabindex'), '0');
    });
  });

  describe('a11y', () => {
    it('Sets default tabindex', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it.skip('Respects existing tabindex', async () => {
      const element = await tabIndexFixture();
      assert.equal(element.getAttribute('tabindex'), '1');
    });

    it('Sets default role', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'checkbox');
    });

    it('Respects existing role', async () => {
      const element = await roleFixture();
      assert.equal(element.getAttribute('role'), 'radio');
    });

    it('Sets aria-checked attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-checked'), 'false');
    });

    it('Sets aria-checked when checked', async () => {
      const element = await checkedFixture();
      assert.equal(element.getAttribute('aria-checked'), 'true');
    });

    it('is not accessible without the label', async () => {
      const element = await fixture(`<anypoint-switch></anypoint-switch>`);
      await assert.isNotAccessible(element);
    });

    it('is accessible when not checked', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when checked', async () => {
      const element = await checkedFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when not checked (compatibility)', async () => {
      const element = await compatibilityFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when checked  (compatibility)', async () => {
      const element = await checkedCompatibilityFixture();
      await assert.isAccessible(element);
    });
  });

  describe('change', () => {
    let element = /** @type AnypointSwitch */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.equal(element.onchange, null);
      const f = () => {};
      element.onchange = f;
      assert.isTrue(element.onchange === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onchange = f;
      element.click();
      element.onchange = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onchange = f1;
      element.onchange = f2;
      element.click();
      element.onchange = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });
});
