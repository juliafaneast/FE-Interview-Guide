# JS/ES 常见问题

## Table of contents

## [Introduction](#for-introduction)

## [JS 中的数据类型](#for-data-type)

## [typeof 和 instanceof的区别](#for-typeof-instanceof)

## [判断数据类型](#for-type-check)

## [值传递和引用传递](#for-reference)

<a id="for-introduction">
  
## Introduction
    
</a>
本篇文章主要用于记录一些日常工作中遇到的js问题，以便以后查询

<a id="for-data-type">
  
## JS中的数据类型
    
</a>

- ### 基本类型 (6)

  1. null
  2. undefined
  3. string
  4. number
  5. boolean
  6. symbol (ES6)

- ### 引用类型 (3)
  1. object
  2. Array
  3. Function

<a id="for-typeof-instanceof">
  
## typeof 和 instanceof的区别
    
</a>

在 js 中我们有一个通用的判断类型的函数： typeof()。 typeof
的结果值有以下六种：

- "undefined"
- "string"
- "number"
- "boolean"
- "object"
- "function"

对于对象类型，不管什么样的对象类型，使用typeof得到的结果都是 object；因此， js借用了java语言中 instanceof 去判断对象实例属于什么类型。

```
    console.log(Object instanceof Object);//true 
    console.log(Function instanceof Function);//true 
    console.log(Number instanceof Number);//false 
    console.log(String instanceof String);//false 

    console.log(Function instanceof Object);//true 

    console.log(Foo instanceof Function);//true 
    console.log(Foo instanceof Foo);//false
```


<a id="for-type-check">
  
## 判断数据类型
    
</a>
上面说过typeof只有六种值， 对判断null， NAN是束手无策的； 那么该如何判断特殊值呢？

- ### 判断一个变量是否是 "undefined"

```
    let a;
    if (typeof(a) === "undefined") {
         console.log('This value is undefined');
    }
```
- ### 判断一个变量是否是 "null"
- Solution 1:
    ```
        let a = null;
        if (a === null) {
            console.log('This value is null');
        }
    ```
- Solution 2: 
    ```
        let a = null;
        if ( !a && typeof(a) !=="undefined" && a != 0) {
            console.log('This value is null');
        }
    ```
    - **注意：** 这里的 == 和 === 需要严格使用，否则就不会达到想要的效果。 比如， **a != 0** 包含了 a !== false 和 a !== 0的情况；但是 **a !== 0** 只包含了 a !== 0 的情况。
- ### 判断一个变量是否是 NAN
    把NAN不等于任何一个值(包含其自身)  
    ```
        let a = 'str';
        if (isNaN(a)) {
            console.log('This value is NaN');
        }
    ```  
<a id="for-reference">
  
## 值传递和引用传递
    
</a>

- ### 基本数组的深复制
    const a = [1,2,3,4];
- Solution 1: **concat**
    ```
        const a = [1,2,3,4];
        const b = [].concat(a);
        b[0] = 9;
        console.log(a);
        console.log(b);
    ```
- Solution 2: **slice()**
    ```
        const a = [1,2,3,4];
        const b = a.slice();
        b[0] = 9;
        console.log(a);
        console.log(b);
    ```
- Solution 3: ES6中的拓展运算符 **...**
    ```
        const a = [1,2,3,4];
        const b = [...a];  //或者 const [...b] = a;
        b[0] = 9;
        console.log(a);
        console.log(b);
    ```
- Solution 4: **JSON.parse(JSON.stringify())**
    ```
        const a = [1,2,3,4];
        const b = JSON.parse(JSON.stringify(a));
        b[0] = 9;
        console.log(a);
        console.log(b);
    ```

- ### 基本对象的深复制
    const a = {name: 'Tom', age: 18};
- Solution 1: ES6中的拓展运算符 **...** (只适用于单层**非嵌套**对象)
    ```
        const a = {name: 'Tom', age: 18};
        const b = {...a};
        b.name = 'Jerry';
        console.log(a)
        console.log(b);
    ```
- Solution 2: ES6中的 **Object.assign({},param)** (只适用于单层**非嵌套**对象)
    ```
        const a = {name: 'Tom', age: 18};
        const b = Object.assign({}, a);
        b.name = 'Jerry';
        console.log(a)
        console.log(b);
    ```
- Solution 3:  **JSON.parse(JSON.stringify())**  (可适用于嵌套对象，但如果对象中有undefined , Symbol, function的情况会被忽略)
    ```
        const a = {name: 'Tom', age: 18};
        const b = JSON.parse(JSON.stringify(a));
        b.name = 'Jerry';
        console.log(a);
        console.log(b)
    ```
    
**注意：**
    上面所有的方法都是针对基本的数组或者对象。对于特殊的情况：比如嵌套数组或对象；对象中值为值为 undefined, Symbol, function的情况。这些情况直接采用上面的方法就没法达到深复制的效果。

- JSON.parse(JSON.stringify()) 该方法会忽略值为 undefined, Symbol, function的情况，例如下面的例子：
    ```
    var syb = Symbol('obj');
    var person = {
        name :'tino',
        say: function(){
            console.log('hi');
            },
        ok: syb,
        un: undefined
    };
    var copy = JSON.parse(JSON.stringify(person));
    console.log(copy); // {name: "tino"}
    ```


