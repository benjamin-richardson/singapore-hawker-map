'use strict';

import $ from 'jquery';
import pad from 'pad';

export default class Map {
  constructor() {
    let _self = this;

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

    console.log(this.hawkerMap.selectAll('[id^=stall]')); //.animate({"fill": "#ff00ff"}, 400);

    $('#cuisine-list').on('click', '.js-cuisine', function(){
      let stallIds = _self.getIdList($(this).parent().data('id'));

      console.log(stallIds);

      let stallIdSelectors = _self.getIdSelectorList(stallIds);

      console.log(stallIdSelectors.toString());

      _self.hawkerMap.selectAll(stallIdSelectors.toString()).animate({"fill": "#ff00ff"}, 400);

    });

  }

  reset() {
    // Select all stalls and reset their colour
    this.hawkerMap.selectAll('[id^=stall-]').animate({"fill": "#ffffff"});
  }

  getIdList(stallIdString){
    console.log(stallIdString);
    let stallIdArray = stallIdString.split(',');

    stallIdArray = stallIdArray.map(function(dataItem, index){
      let returnString;

      if(dataItem.length === 2) {
        returnString = pad(2, dataItem.substring(0,1), '0');
        returnString += pad(2, dataItem.substring(1,2), '0');
      } else if(dataItem.length === 3) {
        returnString = pad(4, dataItem, '0');
      } else if(dataItem.length === 4) {
        returnString = dataItem;
      } else {
        console.error("Error: Invalid stall ID " + dataItem);
      }

      return returnString;
    });

    return stallIdArray;
  }

  getIdSelectorList(stallIdArray) {
    return stallIdArray.map(function(dataItem, index){
      return '#stall-' + dataItem + ' rect';
    });
  }

  smoothZoom() {

  }

  smoothPan() {

  }

  showStalls(stallsArray) {
    stallsArray.animate({"fill": "#ff00ff"});
  }

  showLayer() {

  }

  hideLayer() {

  }

  showLevel() {

  }

}
