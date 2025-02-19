# KMP

扩展kmp算法实现查找字符串或数组在原始字符串或数组中的位置。

## 使用

```
npm i kmp-search
```

```typescript
import { findIndex } from "kmp-search";

const stringIndex: number = findIndex("hello world", "world");
console.log(stringIndex); // 6

const numberArrayIndex: number = findIndex([1, 2, 3, 4, 5], [3, 4]);
console.log(numberArrayIndex); // 2

const objectArrayIndex: number = findIndex(
    [{ var1: 1 }, { var1: 2 }, { var1: 3, var2: "" }],
    [{ var1: 2 }, { var1: 3 }],
    (a, b) => a.var1 === b.var1,
);
console.log(objectArrayIndex); // 1，使用了自定义比较函数

const notFindIndex: number = findIndex([1, 2, 3], [2, 3, 4]);
console.log(notFindIndex); // -1，没有找到
```
