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

console.log(testCall.myCall({name: 'jws'}))
