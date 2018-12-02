import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';
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
          box-sizing: border-box;
        }
        paper-dialog {
          width: 100%;
          height: var(--notification-banner-height, 76px);
          position: relative;
          border-radius: 5px;
          padding-top: 25px;
          padding-left: 40%;
        }

        paper-dialog.success {
          border: 1px solid #4caf50;
          background-color: var(--notification-banner-bg-color, #f1f8e9);
          color: var(--notification-banner-color, #4caf50);
        }

        paper-dialog.error {
          border: 1px solid #f50808;
          background-color: var(--notification-banner-bg-color, #f7d7d7);
          color: var(--notification-banner-color, #f50808);
        }

        paper-dialog.warning {
          border: 1px solid #4caf50;
          background-color: var(--notification-banner-bg-color, #f1f8e9);
          color: var(--notification-banner-color, #4caf50);
        }

      </style>
      <paper-dialog opened class$="[[className]]" modal>
        [[text]]
      </paper-dialog>
    `;
  }

  static get is() {
    return 'notification-banner';
  }

  static get properties() {
    return {
      version: {
        type: String,
        value: ""
      },
      isVisible: {
        type: Boolean,
        readonly: true,
        value: false
      },
      text: {
        type: String,
        value: ""
      },
      type: {
        type: String,
        value: "",
        observer: '_computeClass'
      }
    };
  }

  _computeClass(newVal) {
    if(newVal === 'success') {
      this.className= "success";
    }
    if(newVal === 'error') {
      this.className= "error";
    }
  }
}

window.customElements.define(NotificationBanner.is, NotificationBanner);
