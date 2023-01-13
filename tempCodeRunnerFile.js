let obj = {}
let obj2 = {}
let obj3 = {}
obj.position = [0,0];
obj2.position = [2,1];
obj2.next = obj;
obj3.position = [1,2];
obj3.next = obj
obj.next2 = obj3
obj.next = obj2

console.log(obj[0])