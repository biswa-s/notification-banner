import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
<dom-module id="notification-banner-styles">
  <template>
    <custom-style>
      <style is="custom-style">
        :host {
            display: block;
            box-sizing: border-box;
        }

        .container {
            margin: 24px auto;
            text-align: var(--notification-banner-container-text-align, center);
            @apply --mixin-container;
        }

        paper-dialog#dialog {
            width: 100%;
            height: var(--notification-banner-height, 76px);
            border-radius: 5px;
            position: absolute;
            left: 0;
            top:0;
            margin:0;
            @apply --mixin-dialog;
        }

        paper-dialog#toast {
            width: 300px;
            height: var(--notification-banner-toast-height, 76px);
            background-color: var(--notification-banner-toast-bg-color, #363636);
            color: var(--notification-banner-toast-color,#ffffff);
            border-radius: 5px;
            margin:0;
            position: fixed;
            opacity: 0.8;
            @apply --mixin-toast;
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

        .info {
            background-color: #cce8f4;
            border: 1px solid #dcd6bf;
            color: #a29168;
        }

        .warning {
            background-color: #f8f3d6;
            border: 1px solid #a1bec8;
            color: #a29168;
        }

        .toast {
            background: var(--notification-banner-toast-bg-color, #363636);
            border-radius: 5px;
            color: var(--notification-banner-toast-color, #ffffff);
        }

        .top-left {
            left: 2px;
            top:0;
        }

        .top-right {
            right: 2px;
            top:0;
        }

        .bottom-right {
            right: 2px;
            bottom:20px;
        }

        .bottom-left {
            left: 2px;
            bottom:20px;
        }

        .close {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            @apply --mixin-close-icon;
        }


        @media screen and (min-width: 992px) {
            .close {
                cursor: pointer;
            }
        }

      </style>
    </custom-style>
  </template>
</dom-module>
`;

document.head.appendChild(template.content);
var style = document.createElement('style');
document.head.appendChild(style);
