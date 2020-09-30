'use strict';
const
  _ = require('lodash'),
  BigNumber = require('bignumber.js');
class FruitBasket{
  #id;
  #fruits;
  #currentWeight;
  #maxWeight;
  constructor(id, maxWeight) {
    this.#fruits = [];
    this.#id = id;
    this.#maxWeight = maxWeight;
    this.#currentWeight = 0;
  }
  getId(){
    return this.#id;
  }
  addFruit(fruit) {
    if(this.#currentWeight+fruit.getWeight() > this.#maxWeight){
      throw new Error('max basket weight reached');
    }
    this.#fruits.push(fruit);
    this.#currentWeight=new BigNumber(this.#currentWeight).plus(fruit.getWeight()).toNumber();
  }
  getTotalFruits(){
    return this.#fruits.length;
  }
  getTotalWeight(){
    return _.reduce(this.#fruits,(result, fruit)=> new BigNumber(result).plus(fruit.getWeight()).toNumber(), 0);
  }
  getFruitsCountOfType(type){
    return _.size(_.filter(this.#fruits, (item)=> item.getType()===type));
  }
  getFruitsCountByType(){
    return _.map(_.groupBy(this.#fruits, (item)=> item.getType()), (value, name)=> {
      return {
        type: name,
        count: value.length
      }
    });
  }
}

module.exports = FruitBasket;