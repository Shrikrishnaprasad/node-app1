const num = process.argv[2];
const arr = JSON.parse(num);
const maxNum = Math.max(...arr);

console.log("The max num is: " + maxNum);
