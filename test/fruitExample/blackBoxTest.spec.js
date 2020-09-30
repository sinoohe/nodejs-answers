const chai = require('chai');
const should = chai.should();
const fs = require('fs'),
  util = require('util'),
  exec = util.promisify(require('child_process').exec),
  path = require('path');
describe('BlackBox testing', () => {
  beforeEach(async () => {
    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'fruitExample', 'data', 'input.json'));
    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'fruitExample', 'data', 'output.json'));
  });
  it('failure scenario: max weight reached', async () => {
    const input = [{
      "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
      "max_weight": 8,
      "contents": [{
        "type": "apple",
        "color": "green",
        "weight": 1.5
      }, {
        "type": "apple",
        "color": "red",
        "weight": 1000
      }, {
        "type": "pear",
        "color": "green",
        "weight": 2.5
      }]
    }];
    fs.writeFileSync(path.resolve(__dirname, '..', '..', 'fruitExample', 'data', 'input.json'), JSON.stringify(input, null, 2));
    const result = await exec(`node ${path.resolve(__dirname,'../../fruitExample')}`);
    console.log(`console output: std out: ` + result.stdout + ' std error: ' + result.stderr);
    const output = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../fruitExample', 'data', 'output.json')));
    output.should.to.deep.equal([]);
  });
  it('success scenario', async () => {
    const input = [{
      "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
      "max_weight": 8,
      "contents": [{
        "type": "apple",
        "color": "green",
        "weight": 1.5
      }, {
        "type": "apple",
        "color": "red",
        "weight": 1
      }, {
        "type": "pear",
        "color": "green",
        "weight": 2.5
      }]
    }];
    fs.writeFileSync(path.resolve(__dirname, '..', '..', 'fruitExample', 'data', 'input.json'), JSON.stringify(input, null, 2));
    const result = await exec(`node ${path.resolve(__dirname,'../../fruitExample')}`);
    console.log(`console output: std out: ` + result.stdout + ' std error: ' + result.stderr);
    const output = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../fruitExample', 'data', 'output.json')));
    output.should.to.deep.equal([{
      "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
      "total_fruits": 3,
      "total_weight": 5,
      "fruit_counts": [{
          "type": "apple",
          "count": 2
        },
        {
          "type": "pear",
          "count": 1
        }
      ]
    }]);
  });



});