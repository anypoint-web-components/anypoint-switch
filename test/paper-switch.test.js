import { fixture, assert, aTimeout, nextFrame } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '../anypoint-switch.js';

describe('<anypoint-switch>', function() {
  async function basicFixture() {
    return (await fixture(`<anypoint-switch>on/off</anypoint-switch>`));
  }

  async function noLabelFixture() {
    return (await fixture(`<anypoint-switch></anypoint-switch>`));
  }

  async function checkedFixture() {
    return (await fixture(`<anypoint-switch checked>on/off</anypoint-switch>`));
  }

  async function tabIndexFixture() {
    return (await fixture(`<anypoint-switch tabindex="1">on/off</anypoint-switch>`));
  }

  async function roleFixture() {
    return (await fixture(`<anypoint-switch role="radio">Batman</anypoint-switch>`));
  }

  async function compatibilityFixture() {
    return (await fixture(`<anypoint-switch compatibility>on/off</anypoint-switch>`));
  }

  async function checkedCompatibilityFixture() {
    return (await fixture(`<anypoint-switch checked compatibility>on/off</anypoint-switch>`));
  }

  async function formFixture() {
    return (await fixture(`<form>
      <anypoint-switch name="test-name" value="test-value"></anypoint-switch>
    </form>`));
  }

  async function formCheckedFixture() {
    return (await fixture(`<form>
      <anypoint-switch name="test-name" value="test-value" checked></anypoint-switch>
    </form>`));
  }

  async function formCheckedRequiredFixture() {
    return (await fixture(`<form>
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
      await aTimeout();
      assert.equal(c1.getAttribute('aria-checked'), 'true', 'Has aria-checked');
      assert.isTrue(c1.checked, '.checked is true');
    });

    it('toggle switch via click', async () => {
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout();
      assert.isFalse(c1.getAttribute('aria-checked') !== 'false');
      assert.isFalse(c1.checked);
    });

    it('disabled switch cannot be clicked', async () => {
      c1.disabled = true;
      c1.checked = true;
      MockInteractions.tap(c1);
      await aTimeout();
      assert.isTrue(c1.getAttribute('aria-checked') === 'true');
      assert.isTrue(c1.checked);
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

  describe('_internals', () => {
    it('Has associated form', async () => {
      const form = await formFixture();
      const element = form.querySelector('anypoint-switch');
      if (element._internals) {
        assert.isTrue(element.form === form);
      }
    });

    it('Form reset resets the control', async () => {
      const form = await formCheckedFixture();
      const element = form.querySelector('anypoint-switch');
      if (element._internals) {
        form.reset();
        assert.isFalse(element.checked);
      }
    });

    it('Sets custom validation', async () => {
      const form = await formCheckedRequiredFixture();
      const element = form.querySelector('anypoint-switch');
      if (element._internals) {
        element.checked = false;
        assert.isTrue(element.matches(':invalid'));
      }
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

  describe('a11y', () => {
    it('Sets default tabindex', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('Respects existing tabindex', async () => {
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
});
