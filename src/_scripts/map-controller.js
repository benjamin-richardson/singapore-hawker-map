'use strict';

import $ from 'jquery';

import List from 'list/list';
import doT from 'doT';


export default class FilterController {
  constructor() {

    // Modal options
    let modalTemplate;

    if(document.getElementById('modal-template') !== null) {
      modalTemplate = document.getElementById('modal-template').innerHTML.trim();
    } else {
      console.log('Error: Modal template missing');
    }


    let stallListOptions = {
      valueNames: [
        'title',
        'cuisine',
        { attr: 'data-id', name: 'id' },
        { attr: 'data-filter', name: 'filter' },
        { attr: 'href', name: 'url' }
      ]
    };

    // Ajax in list of properties and hotel item
    $.ajax({
      url: '/api/hawker',
      type: "GET",
      cache: true,
      timeout: 10000,
      dataType: 'json'
    }).done((data) => {
      console.log(data);
    });

  }
}
