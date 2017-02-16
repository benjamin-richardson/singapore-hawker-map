'use strict';

import $ from 'jquery';

import List from 'list/list';
import doT from 'doT';


export default class FilterController {
  constructor() {

    // Modal options
    let stallListTemplate,
      cuisineListTemplate,
      dishesListTemplate,
      stallList,
      cuisineList,
      dishesList;

    if(document.getElementById('stall-list-template') !== null) {
      stallListTemplate = document.getElementById('stall-list-template').innerHTML.trim();
    } else {
      console.log('Error: Stall list template missing');
    }

    // Options for the fields
    let stallListOptions = {
      valueNames: [
        'name',
        'level',
        'shop',
        { attr: 'data-id', name: 'id' }
      ],
      item: stallListTemplate
    };

    // Ajax in list of properties and hotel item
    $.ajax({
      url: '/api/hawker',
      type: "GET",
      cache: true,
      timeout: 10000,
      dataType: 'json'
    }).done((data) => {

      // List out all stalls
      let stallData = data.stalls.map((dataItem, index) => (
        {
          id: dataItem.id,
          name: dataItem.name,
          level: dataItem.level,
          shop: dataItem.shop
        }
      ));

      // console.log(JSON.stringify(data.stalls));

      // Using the cuisine as the key
      let cuisineData = data.stalls.reduce(function(cuisineArray, dataItem, index) {

        dataItem.cuisine.forEach(function(cuisine) {

          // If cuisine does not exist, create an empty object
          if(cuisineArray[cuisine] === undefined){
            cuisineArray[cuisine] = [];
          }

          // Add unique ids to key/value pair list of cuisines
          if(cuisineArray[cuisine].indexOf(dataItem.id) === -1) {
            cuisineArray[cuisine].push(dataItem.id);
          }

        });

        return cuisineArray;

      }, {});

      // console.log(JSON.stringify(cuisineData));

      stallList = new List('stall-list', stallListOptions, stallData);

      // console.log(stallList);


    });

  }
}
