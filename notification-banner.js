import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/neon-animation/neon-animations.js';
import {IronA11yAnnouncer} from '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import './notification-banner-styles.js';
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
      <style include="notification-banner-styles"></style>
      <paper-dialog id="dialog" class$="[[className]]" 
        entry-animation="scale-up-animation"
        exit-animation="scale-down-animation" 
        modal>
        <div class="container">
          <iron-icon icon="[[iconType]]"></iron-icon>
          <slot></slot>
          [[text]]
        </div>
        <iron-icon class="close" icon="close" on-tap="hide"></iron-icon>
      </paper-dialog>

      <div class="toast-container">
        <paper-dialog id="toast" class="toast" class$="[[toastPosition]]"
        entry-animation="scale-up-animation"
        exit-animation="scale-down-animation">
        <div class="container">
          <slot></slot>
          [[text]]
        </div>
    </paper-dialog>
      </div>
      
    `;
  }

  static get is() {
    return 'notification-banner';
  }

  static get properties() {
    return {
      version: {
        type: String,
        value: '1.0.0'
      },
      //related to toast type notification
      isVisible: {
        type: Boolean,
        readonly: true,
        value: false
      },
      //related to toast type notification
      text: {
        type: String,
        value: ''
      },
      //related to toast type notification
      iconType: String,
      type: {
        type: String,
        value: '',
        observer: '_typeChanged'
      },
      opened: {
        type: Boolean,
        value: false,
        observer: '_openedChanged'
      },
      //related to toast type notification
      toast: {
        type: Boolean,
        value: false,
        observer: '_toastChanged'
      },
      //related to toast type notification
      toastPosition: {
        type: String,
        value: ''
      },
      //related to toast type notification
      toastTimeout: {
        type: Number,
        value: 5000
      },
      genericEvent: {
        type: Object,
        value: { bubbles: true, composed: true }
      }
    };
  }

  _typeChanged(newVal) {
    switch(newVal) {
      case 'success':
        this.className= 'success';
        this.iconType= 'check';
      break;

      case 'info':
        this.className= 'info';
        this.iconType= 'info';
      break;

      case 'warning':
        this.className= 'warning';
        this.iconType= 'warning';
      break;

      case 'error':
        this.className= 'error';
        this.iconType= 'error';
      break;

      case 'custom':
        this.className= 'custom';
      break;
    }
  }

  ready() {
    super.ready();
    IronA11yAnnouncer.requestAvailability();
  }

  hide() {
    if (this.isVisible) {
      this.opened = false;
      this.$.dialog.opened = false;
      this.isVisible = false;
      this.dispatchEvent(new CustomEvent('banner-closed',
      this.genericEvent));
    }
  }

  _openedChanged(newVal) {
    if(newVal) {
      this.$.dialog.opened = true;
      this.isVisible = true;
      IronA11yAnnouncer.instance.fire('iron-announce',
      {text: this.text}, this.genericEvent);
    }
  }

  _toastChanged(newVal) {
    if(newVal) {
      this.$.toast.opened = true;
      IronA11yAnnouncer.instance.fire('iron-announce',
      {text: this.text}, this.genericEvent);
   
      setTimeout(()=> {
        this.toast = false;
        this.$.toast.opened = false;
        this.dispatchEvent(new CustomEvent('toast-closed',
        this.genericEvent));
      }, this.toastTimeout);
    }
  }
}

window.customElements.define(NotificationBanner.is, NotificationBanner);
