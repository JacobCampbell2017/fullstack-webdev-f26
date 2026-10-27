/** Exercise 01 - Coins **/

const COINS = [
  { singular: 'dollar', plural: 'dollars', value: 100 },
  { singular: 'quarter', plural: 'quarters', value: 25 },
  { singular: 'dime', plural: 'dimes', value: 10 },
  { singular: 'nickel', plural: 'nickels', value: 5 },
  { singular: 'penny', plural: 'pennies', value: 1 },
];
const calculateChange = function calculateChangeInCoins(total) {
  const amount = Number(total);

  if (!Number.isFinite(amount) || amount < 0) {
    return `$${total} ==> `.concat('Error: Invalid input');
  }

  if (amount > 100) {
    return `$${total} ==> `.concat('Error: the number is too large');
  }

  let remainingCents = Math.round(amount * 100);
  const coins = [];

  COINS.forEach(({ value, singular, plural }) => {
    const count = Math.floor(remainingCents / value);
    remainingCents %= value;

    if (count > 0) {
      const label = count === 1 ? singular : plural;
      coins.push(`${count} ${label}`);
    }
  });

  // fix final formatting
  return `$${total} ==> `.concat(coins.join(', '));
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
console.log(calculateChange(1.999)); // Round up two dollar or give error hmm
// $1.999 ==> 2 dollars
