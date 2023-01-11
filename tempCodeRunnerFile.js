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

console.log(gridCoordEx)