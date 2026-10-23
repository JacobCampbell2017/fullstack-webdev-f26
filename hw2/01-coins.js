/** Exercise 01 - Coins **/

const COIN_NAMES = {
  100: { singular: 'dollar', plural: 'dollars' },
  25: { singular: 'quarter', plural: 'quarters' },
  10: { singular: 'dime', plural: 'dimes' },
  5: { singular: 'nickel', plural: 'nickels' },
  1: { singular: 'penny', plural: 'pennies' },
};
const VALUES = [100, 25, 10, 5, 1];

const calculateChange = function calculateChangeInCoins(total) {
  const amount = Number(total);

  if (!Number.isFinite(amount) || amount < 0) {
    return 'Error: Invalid input';
  }

  if (amount > 100) {
    return 'Error: the number is too large';
  }

  let remainingCents = Math.round(amount * 100);
  const coins = [];

  VALUES.forEach((value) => {
    const count = Math.floor(remainingCents / value);
    remainingCents %= value;

    if (count > 0) {
      const names = COIN_NAMES[value];
      const label = count === 1 ? names.singular : names.plural;
      coins.push(`${count} ${label}`);
    }
  });

  return coins.join(', ');
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange('Hello'));
// $Hello ==> Error: Invalid input
