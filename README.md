# 前端 常见问题

## Table of contents

## [Introduction](#for-introduction)

## JS Part

## [JS 中的数据类型](#for-data-type)

## [typeof 和 instanceof的区别](#for-typeof-instanceof)

## [判断数据类型](#for-type-check)

## [值传递和引用传递](#for-reference)

## [原型和原型链](#for-prototype)

## [实现继承的几种方式](#for-extend)

## [js常见的算法面试题](#for-algorithm)

## CSS Part
## [CSS 中的伪类](#for-pseudo-class)
## [CSS 中的新功能](#for-new-css)

## 其他
## [SPA的优缺点](#for-spa)
## [SSR](#for-spa)

<a id="for-introduction">
  
## Introduction
    
</a>
本篇文章主要用于记录一些前端问题，以便以后查询

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

<a id="for-prototype">
  
## 原型和原型链
    
</a>

- ### 原型和原型链
- 实例是对象的构造函数创建出来的
- 实例的原型对象指向类/对象的原型 
- 原型的原型对象指向继承类/对象的原型
### 具体关系如下图
![image](images/prototype.jpeg
)

<a id="for-extend">
  
## 实现继承的几种方式
    
</a>

- ###  [实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)  *该内容参考其他博客，紧供参考，转载请注明出处*

<a id="for-algorithm">
  
## js常见的算法面试题
    
</a>

- ### js 统计一个字符串出现频率最高的字母/数字
- Solution 1:
    ```
    console.time('1');
    let str = 'qwertwergggg1115gtttt66890jjjkk550llllnnnfhjfkg88876666';
    const strArr = [...str];
    const strObj = {};
    let maxKey = strArr[0];
    strArr.forEach((item) => {
    strObj[item] = strObj[item] === undefined ? 1 : strObj[item] + 1;
    if (strObj[item] > strObj[maxKey]) {
        maxKey = item;
    }
    });
    console.log(maxKey);
    console.timeEnd('1'); // 1: 0.48876953125ms
    ```

- Solution 2:
    ```
    console.time('1');
    let str = 'qwertwergggg1115gtttt66890jjjkk550llllnnnfhjfkg88876666';
    const strArr = [...str]
    const strSet = new Set(strArr);
    let maxKey = '';
    let maxValue = 0;
    strSet.forEach(value => {
    const num = strArr.filter(item => item === value).length;
    if (num > maxValue) {
        maxValue = num;
        maxKey = value;
    }
    });
    console.log(maxKey);
    console.log(maxValue);
    console.timeEnd('1'); // 0.877197265625ms
    ```

对比Solution 1 和 Solution 2， 对于一般的字符串， Solution 1效率更高。

<a id="for-pseudo-class">
  
## CSS 中的伪类
    
</a>

- ### :root
    ```
    :root指代html 元素；除非有特殊的更高级别的元素;通常用来定义全局的css
    ```
    - #### 通常用法
        ````
        :root {
            --my-customize-var: red;
        }

        .test {
            background-color: var(--my-customize-var)
        }
        ````
- ### :is
    ```
    
    ```
- ### :where
    ```
    /* Selects any paragraph inside a header, main
    or footer element that is being hovered */
    :where(header, main, footer) p:hover {
    color: red;
    cursor: pointer;
    }

    /* The above is equivalent to the following */
    header p:hover,
    main p:hover,
    footer p:hover {
    color: red;
    cursor: pointer;
    }
    ```
    **Note**
    > The difference between :where() and :is() is that :where() always has 0 [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), whereas :is() takes on the specificity of the most specific selector in its arguments.  
    > specificity: 可以理解为我们通常讲的权重 


    
<a id="for-new-css">
  
## CSS 中的新功能 （以下新功能可能存在兼容性问题，具体使用时要详细了解）
    
</a>

- ### @support
    ```
    @support 是css的一个规则，用来检测浏览器是否支持某个css

    @supports not(display: grid) {
        div {
            display: flex;
        }
    }

    // 通过js获取这个rule
    let myRules = document.styleSheets[0].cssRules;
    console.log(myRules[0]); // a CSSSupportsRule representing the feature query.
    ```
- ### Flexbox Gaps (chrome 84+)
    ```
        gap: row-gap column-gap

        // Usage example
        .container {
            display: flex;
            gap: 1rem;
        }
    ```
- ### content-visibility / contain-intrinsic-size (兼容性现在还不是太好)
    ```
    /* Keyword values */
    content-visibility: visible;
    content-visibility: hidden;
    content-visibility: auto;

    /* Global values */
    content-visibility: initial;
    content-visibility: unset;
    ```  

<a id="for-spa">
  
## SPA的优缺点
    
</a>

- ### **什么是SPA**
    - #### SPA 是指渲染完成的应用最终只有一个html。 它只用加载一次整个页面的所有资源，之后的操作就是自定义加载内容，不需刷新整个html。

- ### **缺陷**
1.  ### spa 对seo 不友好
    - #### why？
        > SPA是客户端渲染，通过加载执行JS来创建DOM元素构建页面，但是爬虫只是请求静态资源，不会执行JS文件，所以抓取不到DOM结构，也分析不出来有用的信息。
    - ### [SEO](https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E4%BC%98%E5%8C%96/3132?fr=aladdin)
        - #### seo的方法主要有两种
            - ##### 白帽 - 通过优化网页代码，来提高网站排名
            - ##### 黑帽 - 采用违法的方法；恶意制造/替换虚假网站搜索内容提高网站排名
    - ### 如何seo （首页就10个排名的位置）
        - #### 尽量多一些静态网页；使se搜索速度快
        - #### 关键词要符合用户习惯，突出 （title, alt, heading, meta）
2. ### spa首次渲染慢
    - 按需加载会优化首次渲染慢的问题 lazyload

- ### **优点**
    - #### 前后端分离，使得开发任务更加明确；提高了可复用性，可移植性
    - #### 多端可共用同一套api服务
    - #### 交互相应更快，提高用户体验
    - #### 前端开发更加模块，组建化，提高了代码的复用性


<a id="for-ssr">
  
## SSR
    
</a>
