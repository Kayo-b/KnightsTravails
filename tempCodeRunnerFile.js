let mapT = new Map();
mapT.set(JSON.stringify([2,3]), JSON.stringify([1,2]))
mapT.set(JSON.stringify([3,1]), JSON.stringify([1,2]))

console.log(mapT.delete('[3,1]'))
console.log(mapT)