//Find out all possible coordinates that a knight can occupy and 
//the connection  between them.

/* _______________________
7 |__|__|__|__|__|__|__|__|
6 |__|__|__|__|__|__|__|__|
5 |__|__|__|__|__|__|__|__|
4 |__|__|__|__|__|__|__|__|
3 |__|__|__|__|__|__|__|__|
2 |__|__|__|__|__|__|__|__|
1 |__|__|__|__|__|__|__|__|
0 |__|__|__|__|__|__|__|__|
    0  1  2  3  4  5  6  7 
*/

//Lets say the knights always starts at the position [0,1]
//the coordinates being y for vertical and x for horizontal.
//If vertical Movement is +-2, horizontal movement will be +-1
//and vice-versa.
//Values can never be < than 0 or > than 7.

// y +- 2 && x +- 1 || x +- 2 && y +- 1
//Figuring out all the possible positions of [x,y]
//if position [x,y] can be reached from current position adding or subtracting x +- 1 y +- 2 or x+2 y+1, 
//then both are conected
 

let grid =  [[0,1,2,3,4,5,6,7],
            [0,1,2,3,4,5,6,7]]
let gridCoordEx = [];
let position = [];
// let count = 0

// while(count < 37) {
//     newArr.push([grid[0][x],grid[1][y]]);
//     if(x < 6 && y === 6) {
//         x += 2;
//         y += 1;
//     }
// }



for(let x = 0; x < 8; x++) {
    for(let y = 0; y < 8;y++) {
        gridCoordEx.push([grid[0][x],grid[1][y]])
    }
}
// position = [0,1]
// position[1] = position[1]+1
// console.log(position)
// gridCoord.forEach(item => console.log(item[0]===position[0]+1 && item[1] === position[1]))


//logic steps:
// 1. execute function with starting point [0,0] as parameter
// 2. check if parameter value belongs to the chess grid values;
//    2.1. If Yes: Add value to array > 
//       2.1.1. Add +1 / +2 to each value([1,2]) and run same function with new parameter.
//       2.1.2. Add +2 / +1 to each value([2,1]) and run same function with new parameter.
//    2.2. IF No: return

function recursiveKnight(array, gridCoord = gridCoordEx) {
    if(array[0] > 7) return 
    if(array[1] > 7) return 
    let temp = array
        gridCoord.forEach(item => { 
            if(item[0] === temp[0] && item[1] === temp[1]) {
            
                // position.push(temp);
                // let newArr1 = [];
                // newArr1.push(temp[0] + 1);
                // newArr1.push(temp[1] + 2);
                let x = recursiveKnight([temp[0] + 1, temp[1] + 2])
                if(x != null) temp.push(x);
                // let newArr2 = [];
                // newArr2.push(temp[0] + 2);
                // newArr2.push(temp[1] + 1);
                let y = recursiveKnight([temp[0] + 2, temp[1] + 1])
                if(y != null) temp.push(y);
                // let newArr3 = [];
                // newArr3.push(temp[0] + 2);
                // newArr3.push(temp[1] - 1);
                // recursiveKnight(newArr3);
                // let newArr4 = [];
                // newArr4.push(temp[0] - 2);
                // newArr4.push(temp[1] + 1);
                // recursiveKnight(newArr4);
                        
                }
            })
                
                return temp
}
            

let x = recursiveKnight([0,0])
console.log(x[2][3])
console.log(JSON.stringify(x))

