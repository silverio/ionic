import { Component, Prop, State } from '@stencil/core';
import { Config } from '../../interface';


@Component({
  tag: 'ion-grid',
  styleUrls: {
    ios: 'grid.ios.scss',
    md: 'grid.md.scss'
  },
  host: {
    theme: 'grid'
  }
})
export class Grid {

  @State() supportsCssGrid = false;
  @Prop({ context: 'window' }) win: any;
  @Prop({ context: 'document' }) doc: any;
  @Prop({ context: 'config' }) config!: Config;

  componentWillLoad(): any {
    const win = this.win;

    this.supportsCssGrid = this.config.getBoolean('legacyGrid', win.CSS && win.CSS.supports && win.CSS.supports('display', 'grid'));

    if (!this.supportsCssGrid) {
      return import('./legacy-grid').then(m => {
        if (!this.doc.getElementById('ion-legacy-grid')) {
          const styleElm = this.doc.createElement('style');
          styleElm.setAttribute('id', 'ion-legacy-grid');
          styleElm.innerHTML = m.LegacyCss;
          this.doc.head.appendChild(styleElm);
        }
      });
    }
  }

  hostData() {
    return {
      'class': {
        'css-grid': this.supportsCssGrid,
        'legacy-grid': !this.supportsCssGrid
      }
    };
  }

}
