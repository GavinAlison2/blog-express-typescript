// 导出默认的函数,命名为NamedExport_A, 可以执行NamedExport_A()
// 导入NamedExport_A模块的默认成员/函数,无需大括号,可自定义名称
// import A from "./NamedExport_A";
// A();
import NamedExport_A from "./NamedExport_A";
NamedExport_A();
// NamedExport_A.sayHi(); // sayHi not found in NamedExport_A
// 导出函数, 对象, 类
import { sayHi, age } from "./NamedExport_A";
sayHi(); // say hi
console.log(age); // 22

// 同时导入默认成员,命名成员
import { default as A, sayHi as sayHi2, age as userAge } from "./NamedExport_A";
import A3, { sayHi as sayHi3, age as userAge3 } from "./NamedExport_A";

import { Maths } from "./NamedExport_A";
let sum = new Maths().add(2, 3);
console.log(sum); // 5
Maths.add_static(2, 3); // 静态方法

// 导入 foo/index.js 文件
// import { name } from "./foo";
const name = require("./foo");
const foo = require("./foo");
console.log(name); // [MOdule: null prototype]{name: 'foo'}
console.log(foo.name); // foo
console.log(NamedExport_A); //  [Functin: default_1]

//  重命名导入（避免命名冲突）
// import { gender as userGender, getAge } from "./NamedExport_A.js";
import { gender as userGender, getAge } from "./NamedExport_A";
console.log(userGender); // 男

// 导入所有成员
import * as A5 from "./NamedExport_A";
A5.sayHi(); // say hi
