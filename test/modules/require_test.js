// const user = require("./require_A.js");
// console.log(user); // { name: 'Maric', age: 25, sayHello: [Function: sayHello] }
// console.log(user.name);
// console.log(user.age);
// // user.sayHello();
// console.log(user.alias_age);
// const { alias_name, alias_age, alias_sayHello } = require("./require_A.js");
// console.log(alias_name);

// const add = require("./require_A.js");
// console.log(add);
// console.log(add(2, 3));

//
// const Person = require("./require_A.js");
// console.log(Person); // [class Person]
// const p = new Person();
// console.log(p);

// const foo = require("./foo");
// console.log(foo);
// console.log(foo.name);

const bar = require("./bar");
console.log(bar); // { func: 'seed', outdir: '/home/tom' }
console.log(bar.func);
console.log(bar.outdir);
