const chai = require('chai'),
  Fruit = require('../../fruitExample/fruit');

chai.should();

describe('Fruit', () => {

  it('should create new Fruits', () => {
    const fruit1 = new Fruit('apple', 'green', 2);
    fruit1.getColor().should.to.equal('green');
    fruit1.getType().should.to.equal('apple');
    fruit1.getWeight().should.to.equal(2);

    const fruit2 = new Fruit('pear', 'yellow', 3.2);
    fruit2.getType().should.to.equal('pear');
    fruit2.getColor().should.to.equal('yellow');
    fruit2.getWeight().should.to.equal(3.2);
  });
});