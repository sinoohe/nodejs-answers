'use strict';
/**
 *
 * This script reads from ./data/input.json and writes the result to ./data/output.json
 */
const FruitBasket = require('./fruitBasket'),
  input = require('./data/input.json'),
  _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  util= require('util'),
  Fruit = require('./fruit');
(async () => {
  try {

    //input data
    const baskets=[];
    for(const row of input){
      const basket = new FruitBasket(_.get(row,'id'), _.get(row,'max_weight'));
      for(const fruitContent of _.get(row,'contents')){
        const fruit = new Fruit(_.get(fruitContent,'type'),_.get(fruitContent,'color'),_.get(fruitContent,'weight'));
        basket.addFruit(fruit);
      }
      baskets.push(basket);
    }

    //output data
    const output=[];
    for(const basket of baskets){
      output.push({
        id: basket.getId(),
        total_fruits: basket.getTotalFruits(),
        total_weight: basket.getTotalWeight(),
        fruit_counts: basket.getFruitsCountByType()
      });
    }
    const target = path.resolve(__dirname, 'data','output.json');
    await util.promisify(fs.writeFile)(target,JSON.stringify(output, null, 2));

    console.log(`file is updated: ${target}`);

  } catch (error) {
    const target = path.resolve(__dirname, 'data','output.json');
    await util.promisify(fs.writeFile)(target,JSON.stringify([], null, 2));
    console.log(`error happened in fruit example project`, error);
  }
})();