/* Implementation A: Using a Loop to iterate from
 1 to n and accumulate the sum.*/
const sum_to_n_a = (n: number): number => {
  let sum: number = 0;
  for (let i: number = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/* Implementation B: Calculating the sum directly 
using the formula for the sum of the first n natural 
numbers (n * (n + 1) / 2) */
const sum_to_n_b = (n: number): number => {
  return (n * (n + 1)) / 2;
};

/* Implementation C: Using Recursion to calculate 
the sum by breaking down the problem into smaller 
subproblems until it reaches the base case (n === 1) 
and then combines the results backward. */
const sum_to_n_c = (n: number): number => {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
};
