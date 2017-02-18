'use strict';

import $ from 'jquery';

import List from 'list/list';
import doT from 'doT';

import titleCase from 'title-case';

export default class FilterController {
  constructor() {

    // Modal options
    let stallListTemplate,
      cuisineListTemplate,
      dishListTemplate,
      stallList,
      cuisineList,
      dishList;

    if(document.getElementById('stall-list-template') !== null) {
      stallListTemplate = document.getElementById('stall-list-template').innerHTML.trim();
    } else {
      console.error('Error: Stall list template missing');
    }

    if(document.getElementById('cuisine-list-template') !== null) {
      cuisineListTemplate = document.getElementById('cuisine-list-template').innerHTML.trim();
    } else {
      console.error('Error: Cuisine list template missing');
    }

    if(document.getElementById('dish-list-template') !== null) {
      dishListTemplate = document.getElementById('dish-list-template').innerHTML.trim();
    } else {
      console.error('Error: Dish list template missing');
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

    // Options for the fields
    let cuisineListOptions = {
      valueNames: [
        'cuisine',
        { attr: 'data-id', name: 'id' }
      ],
      item: cuisineListTemplate
    };

    // Options for the fields
    let dishListOptions = {
      valueNames: [
        'dish',
        { attr: 'data-id', name: 'id' }
      ],
      item: dishListTemplate
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
          name: titleCase(dataItem.name),
          level: dataItem.level,
          shop: dataItem.shop
        }
      ));

      // Using the cuisine as the key
      let cuisineObject = data.stalls.reduce(function(cuisineArray, dataItem, index) {

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

      let cuisineData = [];
      for (let key in cuisineObject) {
        if (cuisineObject.hasOwnProperty(key)) {
          let cuisineType = {'cuisine': titleCase(key), id: cuisineObject[key]}

          cuisineData.push(cuisineType);
        }
      };


      // Using the dish as the key
      let dishObject = data.stalls.reduce(function(dishArray, dataItem, index) {

        dataItem.dishes.forEach(function(dish) {

          // If dish does not exist, create an empty object
          if(dishArray[dish] === undefined){
            dishArray[dish] = [];
          }

          // Add unique ids to key/value pair list of dishs
          if(dishArray[dish].indexOf(dataItem.id) === -1) {
            dishArray[dish].push(dataItem.id);
          }

        });

        return dishArray;

      }, {});

      let dishData = [];
      for (let key in dishObject) {
        if (dishObject.hasOwnProperty(key)) {
          let dishType = {'dish': titleCase(key), id: dishObject[key]}

          dishData.push(dishType);
        }
      };


      stallList = new List('stall-list', stallListOptions, stallData);
      cuisineList = new List('cuisine-list', cuisineListOptions, cuisineData);
      dishList = new List('dish-list', dishListOptions, dishData);


    });

  }
}
