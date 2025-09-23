// exports
// require_A.js
const name = "Maric";
const age = 25;
function sayHello() {
  console.log(`Hello, my name  `);
}
// case1
// module.exports = {
//   name,
//   age,
//   sayHello,
// };
// case2
// module.exports.name = name;
// module.exports.age = age;
// module.exports.sayHello = sayHello;
// case3
// exports.name = name;
// exports.age = age;
// exports.sayHello = sayHello;

// case4
// // 错误写法
// // exports 是module.exports的别名，不能直接赋值
// // exports 是module.exports的引用,直接赋值导致exports指向一个新的对象，原对象失效
// 导出的却是一个 {} 对象, module.exports = {}
// exports = {
//   name,
//   age,
//   sayHello,
// };
// case5
// 导出的却是 {default: {name, age, sayHello}}
// exports.default = { name, age, sayHello };
// // 正确写法
// case6
// module.exports = { name, age, sayHello };

// // 导出单个成员
// case7
// 导出的是 [Function: add]
// module.exports = function add(a, b) {  return a + b; };
// // 或者导出类
// case8
// 导出的是 [class Person]
// module.exports = class Person {
//   constructor(name, age) {
// this.name = name;
// this.age = age;
//   }
// };
// case9
// [Module: null prototype] {
// alias_age: 25,
// alias_name: 'Maric',
// alias_sayHello: [Function: sayHello]
// }
// export const alias_name = name;
// export const alias_age = age;
// export const alias_sayHello = sayHello;
function add(a, b) {
  return a + b;
}
class Person {
  constructor() {}
}
// module.exports 和 exports 不能同时存在
// module.exports = add;
module.exports = Person;
