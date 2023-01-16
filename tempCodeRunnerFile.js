let y = [1,1]
let y2 = JSON.stringify(y)
let y3 = JSON.parse(y2)
y3 = JSON.stringify(y3)

console.log(y2 === y3)