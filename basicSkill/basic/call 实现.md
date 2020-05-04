#### 方法一
在 thisArg 上临时添加 func, 然后直接调用 thisArg.func()
```js
Function.prototype.myCall = function(thisArg, ...args) {
  // 当 myCall 被调用时 func.myCall(thisArg, ...args), 这里的 this 就是 . 前面的 func
  const func = this

  // 在 thisArg 上临时绑定 func  将函数引用到对象里
  thisArg.tempFunc = func
  // 调用函数
  const result = thisArg.tempFunc(...args)

  // 删除临时属性
  delete thisArg.tempFunc
  return result
}

function testCall() {
  console.log(this.name)
}

console.log(testCall.myCall({name: 'jws'})) // jws
```
以上方法存在的问题
一、myCall 的第一个参数可能传入非对象参数，要对不同的情况分别处理，参考 [MDN 中对 thisArg 的描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
二、可能 thisArg 原本就有一个属性叫 tempFunc，这是完全有可能的，按照上面的代码来实现 myCall 就把原有的 tempFunc 属性消除了。可以使用 ES6 Symbol 来解决这个问题
所以完善一下就是
```js
Function.prototype.myCall = function(thisArg, ...args) {
  // 当 myCall 被调用时 func.myCall(thisArg, ...args), 这里的 this 就是 . 前面的 func
  const func = this

  if (thisArg === undefined || thisArg === null) {
    // 如果 thisArg 是 undefined 或则 null，this 指向全局对象，直接调用就可以达到指向全局对象的目的了
    return func(...args);
  }

  // 在 thisArg 上临时绑定 func  将函数引用到对象里
  const tempFunc = Symbol('Temp property')
  thisArg[tempFunc] = func;
  // 调用函数
  const result = thisArg[tempFunc](...args);

  // 删除临时属性
  Reflect.deleteProperty(thisArg, tempFunc);
  return result
}

function testCall() {
  console.log(this.name)
}

console.log(testCall.myCall({name: 'jws'})) // jws
```
参考: [javascript 基础之 call, apply, bind](https://zhuanlan.zhihu.com/p/71553017)
