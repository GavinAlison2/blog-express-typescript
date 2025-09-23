# 测试文件

## 导入导出测试 export/import

- 导出, 所有导出都是导出成一个对象,里面包含默认导出和命名导出
- 默认导出,只有一个
- 命名导出
  - 导出单个函数/变量/类
  - 集中导出

## require/module.exports

- require 用于引入模块, 返回一个对象
  - 导入一个目录
  - 导入函数
  - 导入类
  - 导入变量
- module.exports 用于导出模块, 导出一个对象
- exports.xx = xx 导出变量,函数,类

导入导出测试 export/import

```js
// 导出单个函数/变量/类
export const foo = "bar";
export function func() {}
export class MyClass {}

export default const bar = "foo";
// 集中导出
export { foo, func, MyClass };

// 导入
import { foo, func, MyClass } from "./my-module";
import { foo as myFooAlias, func as myFuncAlias, MyClass as myClassAlias } from "./my-module";
import myDefault from "./my-module";
import myDefault as myAlias from "./my-module";

// 导入所有
import * as myModule from "./my-module";
console.log(myModule.foo);
console.log(myModule.func());
console.log(new myModule.MyClass());
```

require/module.exports

```js
// 导出
const foo = "bar";
function func() {}
class MyClass {}
// 导出的是{foo: foo, func: func, MyClass: MyClass}
module.exports = { foo, func, MyClass };
// 或者 exports.XX, 注意这个和module.exports 不可同时存在
// 导出的是 {foo: foo, func: func, MyClass: MyClass}
exports.foo = "bar";
exports.func = function () {};
exports.MyClass = class {};

// 导入
const myModule = require("./my-module");
// myModule 永远都是一个对象 {}
console.log(myModule.foo);
console.log(myModule.func());
console.log(new myModule.MyClass());
// 导入通过解构赋值
const { foo, func, MyClass } = require("./my-module");
console.log(foo);
console.log(func());
console.log(new MyClass());
// 导入函数
// 导出
module.exports = function myFunc() {};
// 导入
const myFunc = require("./my-module");
myFunc();
// 导出
module.exports = class Person {};
// 导入
const Person = require("./my-module");
const p = new Person();

// 模块 user/index.js
// 导出
const name = "Tom";
module.exports = { name };
// 导入
const user = require("./user");
console.log(user.name);
```

## commonjs/es6 模块导入导出

- commonjs 模块导入导出
  - require 用于引入模块, 返回一个对象
  - module.exports 用于导出模块, 导出一个对象
  - exports.xx = xx 导出变量,函数,类
- es6 模块导入导出
  - import {} from '' 用于引入模块, 返回一个对象
  - export 用于导出模块, 导出一个对象
  - export default 用于导出默认模块, 导出一个对象
  - export {xx} 用于导出变量,函数,类
