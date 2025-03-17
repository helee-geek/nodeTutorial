const buf = Buffer.from("Hey!");

console.log(buf.toString());

console.log(buf);
console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);

const buff = Buffer.alloc(4);
buff.write("Hey!");

console.log(buf[0]);
console.log(buf[1]);

buff[1] = 111;
console.log(buff.toString());
