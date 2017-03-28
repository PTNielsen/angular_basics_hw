(function() {
  'use strict';

  angular.module('shopular')
    .controller('ShopularController', ShopularController);

  // No need to potentially create the taxRate variable in multiple instances
  // of ShopularController.  We can create outside the constructor function
  // and still reference inside.
  let taxRate = 0.0575;

  /**
   *  Constructor function for ShopularController
   */
  function ShopularController() {
    let vm = this
    vm.country         = 'US';
    vm.currencySymbol  = 'USD$';
    vm.taxRate         = taxRate;
    vm.translations    = {
      "waste basket": "rubbish bin",
      "Color": "Colour",
      "color": "colour"
    };
    vm.inventory = [
      { "id": 2957, "name": "widget", "price": 32, "quantity": 203, "color": "red", "discount": 31 },
      { "id": 89274, "name": "golf club", "price": 98, "quantity": 10, "color": "black", "discount": 0 },
      { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "white", "discount": 0 },
      { "id": 87363, "name": "bonzai tree", "price": 76, "quantity": 2, "color": "green", "discount": 0 },
      { "id": 1736, "name": "towel", "price": 55, "quantity": 30, "color": "brown", "discount": 10 },
      { "id": 4836, "name": "dog bed", "price": 99, "quantity": 10, "color": "beige", "discount": 50 },
      { "id": 829, "name": "waste basket", "price": 15, "quantity": 40, "color": "silver", "discount": 0 },
      { "id": 46, "name": "guitar", "price": 899, "quantity": 0, "color": "blue", "discount": 150 },
      { "id": 17456, "name": "matcha tea", "price": 42, "quantity": 4, "color": "green", "discount": 11 },
      { "id": 3292, "name": "enlightenment", "price": 99999, "quantity": 1, "color": "red", "discount": 0 },
      { "id": 533, "name": "eggs", "price": 5, "quantity": 12, "color": "brown", "discount": 1 },
      { "id": 683, "name": "pillow", "price": 27, "quantity": 10, "color": "black", "discount": 12 }
    ];

    /**
     *  Properly formats price, factoring in the discount and tax
     *  @param  {Object} item Single object from inventory array
     *  @return {Number}      Number after subtracting discount and calculating tax
     */
    vm.formattedPrice = function formattedPrice(item) {
      return (vm.numberConverter(item.price) - vm.numberConverter(item.discount)) * (1 + vm.taxRate)
    }

    /**
     *  Converts price based on whether we're displaying dollar or pounds
     *  @param  {Number} amount The number to be converted
     *  @return {Number}        Returns the converted number or the number itself 
     */
    vm.numberConverter = function numberConverter(amount) {
      if (vm.country === 'US') {
        return amount;
      } else {
        return amount * 1.5;
      }
    }

    /**
     *  Converts word if there is an associated translation
     *  @param  {String} word The word to be translated
     *  @return {String}      Returns the translated word or the word itself
     */
    vm.wordTranslator = function wordTranslator(word) {
      return vm.country === 'UK' && vm.translations[word] || word;
    }

    /**
     *  Changes the country and currencySymbol attribute of the controller
     */
    vm.changeCountry = function changeCountry() {
      if (vm.country === 'US'){
        vm.country        = 'UK';
        vm.currencySymbol = 'GBP£';
      } else {
        vm.country        = 'US';
        vm.currencySymbol = 'USD$';
      }
    }
  }
})();
