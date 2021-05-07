import {Component, Element, Prop, State, h, EventEmitter, Event} from '@stencil/core';

import {alertController} from '@ionic/core';

import settingsStore from '../../../../stores/settings.store';
import i18n from '../../../../stores/i18n.store';

import {EditAction} from '../../../../types/editor/edit-action';
import {ImageAction} from '../../../../types/editor/image-action';
import {Expanded} from '../../../../types/core/settings';

import {ImageHistoryService} from '../../../../services/editor/image-history/image-history.service';

import {SettingsUtils} from '../../../../utils/core/settings.utils';

@Component({
  tag: 'app-image',
  styleUrl: 'app-image.scss',
})
export class AppImage {
  @Element() el: HTMLElement;

  @Event() private action: EventEmitter<ImageAction>;

  @Prop()
  selectedElement: HTMLElement;

  @Prop()
  slide: boolean = false;

  @Prop()
  deleteBackground: boolean = true;

  @Prop()
  deck: boolean = false;

  private imageHistoryService: ImageHistoryService;

  @State()
  private imagesHistoryOdd: (UnsplashPhoto | TenorGif | StorageFile | Waves)[];

  @State()
  private imagesHistoryEven: (UnsplashPhoto | TenorGif | StorageFile | Waves)[];

  @State()
  private navigatorOnline: boolean = navigator.onLine;

  constructor() {
    this.imageHistoryService = ImageHistoryService.getInstance();
  }

  async componentWillLoad() {
    await this.initImagesHistory();
  }

  private initImagesHistory(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      let imagesHistory: (UnsplashPhoto | TenorGif | StorageFile | Waves)[] = await this.imageHistoryService.get();

      if (!imagesHistory || imagesHistory.length <= 0) {
        resolve();
        return;
      }

      if (!this.deck && !this.slide) {
        imagesHistory = [...imagesHistory.filter((img) => !img.hasOwnProperty('viewBox'))];
      }

      this.imagesHistoryEven = [...imagesHistory.filter((_a, i) => i % 2)];
      this.imagesHistoryOdd = [...imagesHistory.filter((_a, i) => !(i % 2))];

      resolve();
    });
  }

  private async selectAction(action: EditAction, image?: UnsplashPhoto | TenorGif | StorageFile) {
    const data: ImageAction = {
      action: action,
    };

    if (image) {
      data['image'] = image;
    }

    this.action.emit(data);
  }

  private selectImageFromHistory($event: CustomEvent): Promise<void> {
    return new Promise<void>(async (resolve) => {
      if (!$event || !$event.detail) {
        resolve();
        return;
      }

      await this.selectAction(EditAction.ADD_IMAGE, $event.detail);

      resolve();
    });
  }

  private async presentHistoryInfo() {
    const alert: HTMLIonAlertElement = await alertController.create({
      message: i18n.state.editor.history_details,
      buttons: [i18n.state.core.ok],
    });

    return await alert.present();
  }

  render() {
    return (
      <app-expansion-panel
        expanded={settingsStore.state.panels.image}
        onExpansion={($event: CustomEvent<Expanded>) => SettingsUtils.update({image: $event.detail})}>
        <ion-label slot="title">{i18n.state.editor.images}</ion-label>

        <div class="image-actions ion-margin">
          {this.renderStockPhotos()}
          {this.renderGif()}
          {this.renderCustom()}
          {this.renderWaves()}
          {this.renderDeleteAction()}
        </div>

        <ion-list>
          <ion-item-divider class="ion-padding-top ion-margin-top">
            <ion-label>{i18n.state.editor.history}</ion-label>
            <button slot="end" class="info" onClick={() => this.presentHistoryInfo()}>
              <ion-icon name="help"></ion-icon>
            </button>
          </ion-item-divider>

          {this.renderImagesHistory()}
        </ion-list>
      </app-expansion-panel>
    );
  }

  private renderStockPhotos() {
    if (!this.navigatorOnline) {
      // Unsplash not available offline
      return undefined;
    }

    return (
      <ion-button shape="round" onClick={() => this.selectAction(EditAction.OPEN_PHOTOS)} color="primary">
        <ion-label>{i18n.state.editor.stock_photo}</ion-label>
      </ion-button>
    );
  }

  private renderGif() {
    if (!this.navigatorOnline) {
      // Tenor not available offline
      return undefined;
    }

    return (
      <ion-button shape="round" onClick={() => this.selectAction(EditAction.OPEN_GIFS)} color="secondary">
        <ion-label>{i18n.state.editor.gif}</ion-label>
      </ion-button>
    );
  }

  private renderCustom() {
    return (
      <ion-button shape="round" onClick={() => this.selectAction(EditAction.OPEN_CUSTOM)} color="tertiary">
        <ion-label>{i18n.state.editor.your_images}</ion-label>
      </ion-button>
    );
  }

  private renderWaves() {
    if (!this.deck && !this.slide) {
      // Waves only available for background
      return undefined;
    }

    return (
      <ion-button shape="round" onClick={() => this.selectAction(EditAction.OPEN_SVG_WAVES)} color="quaternary">
        <ion-label>{i18n.state.editor.waves}</ion-label>
      </ion-button>
    );
  }

  private renderDeleteAction() {
    if ((!this.deck && !this.slide) || !this.deleteBackground) {
      return undefined;
    } else {
      return (
        <ion-button shape="round" onClick={() => this.selectAction(EditAction.DELETE_BACKGROUND)} fill="outline" class="delete">
          <ion-label>{i18n.state.core.reset}</ion-label>
        </ion-button>
      );
    }
  }

  private renderImagesHistory() {
    if (!this.imagesHistoryOdd && !this.imagesHistoryEven) {
      return (
        <ion-item class="history-empty">
          <ion-label class="ion-text-wrap">
            <small>{i18n.state.editor.no_images}</small>
          </ion-label>
        </ion-item>
      );
    } else {
      return (
        <div class="history-photos ion-padding">
          <app-image-columns
            imagesOdd={this.imagesHistoryOdd}
            imagesEven={this.imagesHistoryEven}
            onSelectImage={($event: CustomEvent) => this.selectImageFromHistory($event)}></app-image-columns>
        </div>
      );
    }
  }
}
