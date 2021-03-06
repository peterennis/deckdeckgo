/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DeckgoSlideQrcode {
        "afterSwipe": () => Promise<void>;
        "beforeSwipe": (_enter: boolean, _reveal: boolean) => Promise<boolean>;
        /**
          * The content, a text or an url, of the QR code to generate
         */
        "content": string;
        /**
          * If you provide actions for the all deck but, a specific one for this slide, set this option to true
         */
        "customActions": boolean;
        /**
          * If you define a background for the all deck but, a specific one for this slide, set this option to true
         */
        "customBackground": boolean;
        "hideContent": () => Promise<void>;
        /**
          * In case you would display a logo over the QR code, you could provide an accessibility attribute using this option
         */
        "imgAlt": string;
        /**
          * In case you would like to display a logo over the QR code, provide the source of the image. Note: this image is lazy loaded too
         */
        "imgSrc": string;
        "lazyLoadContent": () => Promise<void>;
        "resizeContent": () => Promise<void>;
        "revealContent": () => Promise<void>;
    }
}
declare global {
    interface HTMLDeckgoSlideQrcodeElement extends Components.DeckgoSlideQrcode, HTMLStencilElement {
    }
    var HTMLDeckgoSlideQrcodeElement: {
        prototype: HTMLDeckgoSlideQrcodeElement;
        new (): HTMLDeckgoSlideQrcodeElement;
    };
    interface HTMLElementTagNameMap {
        "deckgo-slide-qrcode": HTMLDeckgoSlideQrcodeElement;
    }
}
declare namespace LocalJSX {
    interface DeckgoSlideQrcode {
        /**
          * The content, a text or an url, of the QR code to generate
         */
        "content"?: string;
        /**
          * If you provide actions for the all deck but, a specific one for this slide, set this option to true
         */
        "customActions"?: boolean;
        /**
          * If you define a background for the all deck but, a specific one for this slide, set this option to true
         */
        "customBackground"?: boolean;
        /**
          * In case you would display a logo over the QR code, you could provide an accessibility attribute using this option
         */
        "imgAlt"?: string;
        /**
          * In case you would like to display a logo over the QR code, provide the source of the image. Note: this image is lazy loaded too
         */
        "imgSrc"?: string;
        /**
          * Triggered when the slide is loaded
         */
        "onSlideDidLoad"?: (event: CustomEvent<void>) => void;
    }
    interface IntrinsicElements {
        "deckgo-slide-qrcode": DeckgoSlideQrcode;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "deckgo-slide-qrcode": LocalJSX.DeckgoSlideQrcode & JSXBase.HTMLAttributes<HTMLDeckgoSlideQrcodeElement>;
        }
    }
}
