const myMather = {
  name: 'mama',
  age: 46
}

// this 此时指向 myMather
console.log(person.introduce.call(myMather)) // Hello every one! My name is mama. I'm 46 yers old.
