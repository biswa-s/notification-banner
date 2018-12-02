import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `notification-banner`
 * a customization notification banner in Polymer 3.0
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class NotificationBanner extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'notification-banner',
      },
    };
  }
}

window.customElements.define('notification-banner', NotificationBanner);
