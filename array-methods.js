/*jshint esversion: 6*/

var dataset = require('./dataset.json').bankBalances;//console.log(dataset[0].amount);
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.filter(checkAmount);

function checkAmount( dataset ){
  var dollars = Number(dataset.amount);
  return dollars > 100000;
}



/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.map(addRoundedDollar);

function addRoundedDollar(obj){
  var roundedAmount = Number(Math.round(obj.amount));
  obj.rounded = roundedAmount;
  return obj;
}


/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.map(addCents);

function addCents( obj ){
  var newObj = {};
  newObj.amount = Number(Math.round(obj.amount * 10)/10);
  newObj.state = obj.state;
  return newObj;
}


// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.reduce( function addBankBalances (prev, elem){
  prev += Number(elem.amount);
  return Math.round(prev * 100 ) / 100;
},0);


/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
// console.log(dataset);
var interestCalculator = dataset.filter( ( obj ) => {
  var total = 0;
  if( obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' || obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE'){
    return obj;
  }
});

var result = interestCalculator.reduce((prev, elem) => {
  prev += Number(Math.round(elem.amount * 0.189 * 100 ) / 100 );
  return prev;
},0);

var sumOfInterests = Number(result.toFixed(2));


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

//if state total amt (0.189) > 50,000
// exclude wi il wy oh ga de
//return high interest in leftover states?

var allowedStates = dataset.filter(( obj ) =>{
  if (obj.state !== 'WI' && obj.state !== 'IL' && obj.state !== 'WY' && obj.state !== 'OH' && obj.state !== 'GA' && obj.state !== 'DE'){
    return obj;
  }
});


//console.log(allowedStates);

var interestTotals = allowedStates.reduce(( prev, elem ) => {

},0);


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
