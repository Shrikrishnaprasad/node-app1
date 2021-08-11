import os from "os";
import path from "path";
// const num = process.argv[2];
// const arr = JSON.parse(num);
// const maxNum = Math.max(...arr);

// console.log("The max num is: " + maxNum);

console.log(os.totalmem(), os.freemem());
console.log(path.parse(__filename));
