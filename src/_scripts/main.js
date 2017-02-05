// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import HawkerMap from '../_modules/map/map';
import HawkerMapController from './map-controller';

$(() => {
  new HawkerMap();

  new HawkerMapController();
});
