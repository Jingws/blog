function family(...familyMember) {
  console.log(`${this.name}的家人包括${familyMember.join(',')}`)
}

console.log(family.call({name: 'jws'}, '爸爸', '妈妈', '妹妹'))
console.log(family.apply({name: 'jws'}, ['爸爸', '妈妈', '妹妹']))
