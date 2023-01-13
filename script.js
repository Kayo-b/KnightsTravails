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
//then both are connected
let grid =  [[0,1,2,3,4,5,6,7],
            [0,1,2,3,4,5,6,7]]
let gridCoordEx = [];
let position = [];
//Generate all grid coordinates
for(let x = 0; x < 7; x++) {
    for(let y = 0; y < 7;y++) {
        gridCoordEx.push([grid[0][x],grid[1][y]])
    }
}

//logic steps:
// 1. execute function with starting point [0,0] as parameter
// 2. check if parameter value belongs to the chess grid values;
//    2.1. If Yes: Add value to array > 
//       2.1.1. Add +1 / +2 to each value([1,2]) and run same function with new parameter/position.
//       2.1.2. Add +2 / +1 to each value([2,1]) and run same function with new parameter/position.
//    2.2. IF No: return

//All possible knight moves;
let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ];
let kmoves = []
let temp = {}
function recursiveKnight(array, gridCoord = gridCoordEx) {
    if(array[0] > 7 || array[1] > 7 || array[0] < 0 || array[1] < 0) return 
    let temp = array;

        gridCoord.forEach(item => { 
            if(item[0] === array[0] && item[1] === array[1]) {
                
                let index = gridCoord.indexOf(item)
                let newGrid = gridCoord;            
                newGrid.splice(index, 1);
    
                for(let i = 0; i < 8;i++) {
                    let k2 = recursiveKnight([array[0] + X[i], array[1] + Y[i]], newGrid, temp);
                    if(k2 != undefined) temp.push(k2)
                    
                    if(k2 != undefined) kmoves.push(k2);
                }
            }
        })
        return temp;
}

let x = recursiveKnight([0,0])
// console.log(x)

//At this point, the function is able to return a nested array that contains all possible moves that a knight can make.
//Next Step: unpack de nested arrays while keeping the relation between each position and convert it into a
//data structure that represents all conections so that a shortest-path function can be created and applied.

//Function unpackArrays takes the resulting nested array from the previous function and returns a list
//containing all nodes and its conections, being that the index 0 is the starting node(position in chessboard) and the other 
//following indexes are the possible positions where the knight can move.
let arrList = []
function unpackArrays(arr) {
    let newArr = [[arr[0],arr[1]]]
    if(arr.length > 2) {
        for(let x = 2; x < arr.length;x++) {
            if(arr[x].length > 2) {
                newArr.push([arr[x][0],arr[x][1]]) 
                unpackArrays(arr[x]);
                
            } else newArr.push(arr[x])
        }
    }
    arrList.push(newArr)
    return newArr
}

unpackArrays(x)
// console.log(kmoves)
console.log(arrList)