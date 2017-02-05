'use strict';

export default class Map {
  constructor() {
    const SVG = '#asfc';

    this.hawkerMap = Snap.select(SVG);
    this.hawkerMapPanZoom = svgPanZoom(SVG, {
      viewportSelector: '.svg-pan-zoom_viewport'
      , panEnabled: true
      , controlIconsEnabled: true
      , zoomEnabled: true
      , dblClickZoomEnabled: true
      , mouseWheelZoomEnabled: false
      , preventMouseEventsDefault: true
      , zoomScaleSensitivity: 0.2
      , minZoom: 0.5
      , maxZoom: 15
      , fit: true
      , contain: false
      , center: false
      , refreshRate: 'auto'
      , beforeZoom: function(){}
      , onZoom: function(){}
      , beforePan: function(){}
      , onPan: function(){}
      // , customEventsHandler: {}
      , eventsListenerElement: null
    });

  }

  reset() {

  }

  smoothZoom() {

  }

  smoothPan() {

  }

  showLayer() {

  }

  hideLayer() {

  }

  showLevel() {

  }

}
