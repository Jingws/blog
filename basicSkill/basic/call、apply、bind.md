### 改变函数 this 指向的三兄弟

在 javascript 的 function 中有 this，arguments 等关键字。这里不讨论 this 指向问题。一个常见的使用场景是当你使用 `.` 来调用一个函数的时候，此时函数中 this 指向 `.` 前面的调用者：

```js
  const person = {
    name: 'jws',
    age: 29,
    introduce() {
      console.log(`Hello every one! My name is ${this.name}. I'm ${this.age} yers old.`)
    }
  }

  // 此时 this 指向 person
  console.log(person.introduce()) // Hello every one! My name is jws. I'm 29 yers old.
```

通过 call，apply，bind 这三兄弟可以改变 `introduce` 中 this 的指向

#### [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

```js
const myMather = {
  name: 'mama',
  age: 46
}

// this 此时指向 myMather
console.log(person.introduce.call(myMather)) // Hello every one! My name is mama. I'm 46 yers old.
```

通过上面代码可以看到，this 的指向被改变为 myMother, call 函数的语法为 `function.call(thisArg, arg1, arg2, ...)`, 其中 `thisArg` 是函数运行时使用的 this 值，`arg1, arg2, ...` 是指定的参数列表


#### [apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

apply 和 call 的唯一区别就是 call 方法接受的是参数列表，而 apply 方法接受的是一个参数数组，apply 函数的语法为 `func.apply(thisArg, [argsArray])`, 举个栗子

```js
function family(...familyMember) {
  console.log(`${this.name}的家人包括${familyMember.join(',')}`)
}

// 下面两个方法输出相同
console.log(family.call({name: 'jws'}, '爸爸', '妈妈', '妹妹')) // jws的家人包括爸爸,妈妈,妹妹
console.log(family.apply({name: 'jws'}, ['爸爸', '妈妈', '妹妹'])) // jws的家人包括爸爸,妈妈,妹妹
```
#### [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

bind 和上面两个有所不同，当 bind 被调用时，会给原函数绑定一个 this，并返回一个新函数,举个栗子

```js
const pet = {
  animal: '狗',
  age: 3,
  introduce() {
    console.log(`大家好，我的宠物是一只${this.age}岁的${this.animal}`)
  }
}
const introduce = pet.introduce
const myPet = {
  animal: '猫猫',
  age: 1
}

console.log(pet.introduce()) // 大家好，我的宠物是一只3岁的狗
pet.introduce = introduce.bind(myPet)
console.log(pet.introduce()) // 大家好，我的宠物是一只1岁的猫猫
console.log(pet.introduce.call(pet)) // 大家好，我的宠物是一只1岁的猫猫

```

bind 函数的语法为 `function.bind(thisArg[, arg1[, arg2[, ...]]])`，其中第二个参数是当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
