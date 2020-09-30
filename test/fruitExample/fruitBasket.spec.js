const chai = require('chai'),
  Fruit = require('../../fruitExample/fruit'),
  FruitBasket = require('../../fruitExample/fruitBasket');
const should=chai.should();

describe('FruitBasket', () => {

  it('addFruit: handle overflow', () => {
    const fruit1 = new Fruit('apple', 'green', 0.1);
    const fruit2 = new Fruit('pear', 'yellow', 0.2);
    const basket = new FruitBasket('aaaa',3.3);
    basket.addFruit(fruit1);
    basket.addFruit(fruit2);
    basket.getTotalWeight().should.to.equal(0.3);
  });
  it('addFruit: handle max weight', () => {
    const fruit1 = new Fruit('apple', 'green', 10);
    const basket = new FruitBasket('aaaa',3.3);
    should.throw(()=> basket.addFruit(fruit1), Error);
  });
  it('addFruit: should not throw Error if basket is full', () => {
    const fruit1 = new Fruit('apple', 'green', 10);
    const basket = new FruitBasket('aaaa',10);
    basket.addFruit(fruit1);
    basket.getTotalWeight().should.to.equal(10);
  });
  it('getTotalFruits: should get total fruits', () => {
    const fruit1 = new Fruit('apple', 'green', 0.1);
    const fruit2 = new Fruit('pear', 'yellow', 0.2);
    const basket = new FruitBasket('aaaa',3.3);
    basket.addFruit(fruit1);
    basket.addFruit(fruit2);
    basket.getTotalFruits().should.to.equal(2);
  });

  it('getFruitsCountOfType: should get total count of specific type fruit', () => {
    const fruit1 = new Fruit('apple', 'green', 0.1);
    const fruit2 = new Fruit('pear', 'yellow', 0.2);
    const fruit3 = new Fruit('pear', 'yellow', 0.2);
    const fruit4 = new Fruit('pear', 'yellow', 0.2);
    const basket = new FruitBasket('aaaa',3.3);
    basket.addFruit(fruit1);
    basket.addFruit(fruit2);
    basket.addFruit(fruit3);
    basket.addFruit(fruit4);
    basket.getFruitsCountOfType('apple').should.to.equal(1);
    basket.getFruitsCountOfType('pear').should.to.equal(3);
    basket.getFruitsCountOfType('orange').should.to.equal(0);
  });

  it('getFruitsCountByType: should get total count of all various fruit types', () => {
    const fruit1 = new Fruit('apple', 'green', 0.1);
    const fruit2 = new Fruit('pear', 'yellow', 0.2);
    const fruit3 = new Fruit('pear', 'yellow', 0.2);
    const fruit4 = new Fruit('pear', 'yellow', 0.2);
    const basket = new FruitBasket('aaaa',3.3);
    basket.addFruit(fruit1);
    basket.addFruit(fruit2);
    basket.addFruit(fruit3);
    basket.addFruit(fruit4);
    const result=basket.getFruitsCountByType();
    result.should.to.deep.equal([
      {
        "type": "apple",
        "count": 1
      },
      {
        "type": "pear",
        "count": 3
      }
    ]);

  });


  it('all functions should work properly when basket is empty', () => {
    const basket = new FruitBasket('aaaa',3.3);
    basket.getFruitsCountByType().should.to.deep.equal([]);
    basket.getTotalWeight().should.to.equal(0);
    basket.getFruitsCountOfType('oranges').should.to.equal(0);
    basket.getTotalFruits().should.to.equal(0);

  });
});