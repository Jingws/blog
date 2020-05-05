### 方案一 通过 call/apply 和闭包实现
```js
Function.prototype.myBind = function(thisArg, ...args) {
  const func = this

  // bind 返回的是一个新函数
  return function(...otherArg) {
    // 执行函数时 this 始终为外层函数中的 thisArg，前面的调用参数也被绑定为 args
    return func.call(thisArg, ...args, ...otherArg)
  }
}

function testMyBind() {
  console.log(`This is ${JSON.stringify(this)}, arguments is ${[...arguments].join(', ')}`)
}

const boundFunc = testMyBind.myBind({name: 'jws'}, 1, 2, 3)
boundFunc(4, 5, 6) // This is {"name":"jws"}, arguments is 1, 2, 3, 4, 5, 6
```
