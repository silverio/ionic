import { Component, Prop, State } from '@stencil/core';


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

  componentWillLoad(): any {
    const win = this.win;

    this.supportsCssGrid = (win.CSS && win.CSS.supports && win.CSS.supports('display', 'grid') && win.location.search.indexOf('ionic:flexgrid') === -1);

    if (!this.supportsCssGrid) {
      return import('./flex-grid').then(m => {
        if (!this.doc.getElementById('ion-flex-grid')) {
          const styleElm = this.doc.createElement('style');
          styleElm.setAttribute('id', 'ion-flex-grid');
          styleElm.innerHTML = m.FlexCss;
          this.doc.head.appendChild(styleElm);
        }
      });
    }
  }

  hostData() {
    return {
      'class': {
        'css-grid': this.supportsCssGrid,
        'flex-grid': !this.supportsCssGrid
      }
    };
  }

}
