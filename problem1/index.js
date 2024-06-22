/* Implementation A: Using a Loop to iterate from
 1 to n and accumulate the sum.*/
var sum_to_n_a = function (n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
/* Implementation B: Calculating the sum directly
using the formula for the sum of the first n natural
numbers (n * (n + 1) / 2) */
var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2;
};
/* Implementation C: Using Recursion to calculate
the sum by breaking down the problem into smaller
subproblems until it reaches the base case (n === 1)
and then combines the results backward. */
var sum_to_n_c = function (n) {
    if (n === 1) {
        return 1;
    }
    else {
        return n + sum_to_n_c(n - 1);
    }
};
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
