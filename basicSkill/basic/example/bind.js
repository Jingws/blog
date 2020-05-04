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

// 此时，pet.introduce 的 this 已经被绑定到 myPet 上了
pet.introduce = introduce.bind(myPet)

console.log(pet.introduce()) // 大家好，我的宠物是一只1岁的猫猫
console.log(pet.introduce.call(pet)) // 大家好，我的宠物是一只1岁的猫猫
