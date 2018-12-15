import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronA11yAnnouncer} from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
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
          position: absolute;
          border-radius: 5px;
          left: 0;
          top:0;
          margin:0;
          @apply --mixin-dialog;
        }
        .container {
          margin: 24px auto;
          text-align: var(--notification-banner-container-text-align, center);
          @apply --mixin-container;
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

        paper-dialog.custom {
          border: 1px solid var(--notification-banner-border-color, #607d8b);
          background-color: var(--notification-banner-bg-color, #ede1e1);
          color: var(--notification-banner-color, #37b6f3b);
        }

        .close {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
          margin: 0;
          padding: 0;
          @apply --close-icon
        }
      </style>
      <paper-dialog id="dialog" class$="[[className]]" modal>
        <div class="container">
          <iron-icon icon="report-problem"></iron-icon> [[text]]
        </div>
        <iron-icon class="close" icon="close" on-tap="hide"></iron-icon>
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
        value: ''
      },
      isVisible: {
        type: Boolean,
        readonly: true,
        value: false
      },
      text: {
        type: String,
        value: ''
      },
      type: {
        type: String,
        value: '',
        observer: '_computeClassObserver'
      },
      genericEvent: {
        type: Object,
        value: { bubbles: true, composed: true }
      }
    };
  }

  _computeClassObserver(newVal) {
    if(newVal === 'success') {
      this.className= "success";
      return;
    }
    if(newVal === 'error') {
      this.className= "error";
      return;
    } else {
      this.className = "custom";
      return;
    }
  }

  ready() {
    super.ready();
    IronA11yAnnouncer.requestAvailability();
  }

  show() {
    if (!this.isVisible) {
      this.$.dialog.opened = true;
      this.isVisible = true;
      IronA11yAnnouncer.instance.fire('iron-announce',
      {text: this.text}, this.genericEvent);
    }
  }

  hide() {
    if (this.isVisible) {
      this.$.dialog.opened = false;
      this.isVisible = false;
      this.dispatchEvent(new CustomEvent('notification-banner-hide',
      this.genericEvent));
    }
  }
}

window.customElements.define(NotificationBanner.is, NotificationBanner);
