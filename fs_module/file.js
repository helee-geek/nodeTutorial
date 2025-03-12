// const fs = require("fs");
import { error } from "console";
import fs from "fs";

// WRITE FILE
// Sync
// fs.writeFileSync("./test.txt", "Hello World");

// fs.writeFile("./test.txt", "hello world async", (err) => {});

// READ FILE
// it can return result
// const result = fs.readFileSync("./contact.txt", "utf8");
// console.log(result);

// it expect ... one callback function in this it give err and result      that means it cannot return anything...... it's type is void
// fs.readFile("./contact.txt", "utf8", (err, result) => {
//   if (err) {
//     console.log("ERROR", err);
//   } else {
//     console.log(result);
//   }
// });

// APPEND DATA
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

// COPY FILE
// fs.cpSync("./test.txt", "./copy.txt");

//DELETE FILE
// fs.unlinkSync("./copy.txt");

// STAT
// const stat = fs.statSync("./test.txt");
// const stat1 = fs.statSync("./test.txt").isFile();
// console.log(stat);

// MKDIR
// fs.mkdirSync('my-docs')
fs.mkdirSync("my-dir/a/b", { recursive: true });
