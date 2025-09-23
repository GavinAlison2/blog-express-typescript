/*
导出 export
导出模块中的变量、函数、类等，可以直接使用 export 关键字。

语法：

1. export 变量名/函数名/类名;
2. export { 变量名/函数名/类名 };
3. export { 变量名/函数名/类名 as 别名 };

注意：

1. 导出模块中的变量、函数、类等，必须先在模块顶部使用 export 关键字进行导出。
2. 导出模块中的变量、函数、类等，可以直接使用 export 关键字进行导出。


*/
// 模块 NamedExport_A.ts
// 直接导出变量、函数、类
export function sayHi() {
  console.log("say hi");
}
export class Person {
  constructor(public name: string) {
    this.name = name;
  }
}
export const age = 22;
// 集中导出,多个成员统一管理
const gender = "male";
function getAge() {
  return age;
}
export { gender, getAge };

// 默认导出
// 导出单个值（变量、函数、类等）
export default function () {
  console.log("default export");
}

export class Maths {
  // 不能加 function, 加了报  Member 'function' implicitly has an 'any' type
  public add(a: number, b: number): number {
    return a + b;
  }
  public static add_static(a: number, b: number): number {
    return a + b;
  }
}
