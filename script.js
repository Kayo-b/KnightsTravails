//Find out all possible coordinates that a knight can occupy and 
//the connection  between them.

/* _______________________
7 |__|__|__|__|__|__|__|__|
6 |__|__|__|__|__|__|__|__|
5 |__|__|__|__|__|__|__|__|
4 |__|__|__|__|__|__|__|__|
3 |__|__|__|x_|x_|__|__|x_|
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
for(let x = 0; x < 8; x++) {
    for(let y = 0; y < 8;y++) {
        gridCoordEx.push([grid[0][x],grid[1][y]])
    }
}

//logic steps:
// 1. execute function with starting point [0,0] as parameter
// 2. check if parameter value belongs to the chess grid values;
//    2.1. If Yes: Remove value from board so it won't be repeated in the recursion.
//       2.1.1. Add +1 / +2 to each value([1,2]) and run same function with new parameter/position.
//       2.1.2. Add +2 / +1 to each value([2,1]) and run same function with new parameter/position.
//       ...keep going through all values for all levels.
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

//Function unpackArrays takes the resulting nested array from the previous function and returns a organized array of arrays
//containing all nodes and its conections(edges), being that the index 0 is the starting node(position in chessboard) and the other 
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
// console.log(arrList)

//Turning unpacked arrays output into a graph

class KnightGraph {
    constructor(nVertices) {
        this.nVertices = nVertices;
        this.graphList = new Map();
    }
    addNode(node) {
        this.graphList.set(node, []);
    }

    addEdge(src, dest) {
        this.graphList.get(src).push(dest);
        // this.graphList.get(dest).push(src);
    }

    get(node) {
        return this.graphList.get(JSON.stringify(node))
    }
    delete(node) {
        this.graphList.delete(node)
    }
    size() {
        return this.graphList.size
    }
    printGrapth() {
        let nodesList = this.graphList.keys()
        for (var i of nodesList) {
            let print = this.graphList.get(i)
            console.log(i + " => " + print)
        }
    }
}

let grid2 =  [[0,1,2,3,4,5,6,7],
            [0,1,2,3,4,5,6,7]]
let gridCoordEx2 = [];
//Generate all grid coordinates
for(let x = 0; x < 8; x++) {
    for(let y = 0; y < 8;y++) {
        gridCoordEx2.push(JSON.stringify([grid2[0][x],grid2[1][y]]))
    }
}
// console.log(newGrid)

function createGraphDemo() {
    let graphDemo = new KnightGraph(64);
    var vertices = gridCoordEx2

    for(i of vertices) {
        graphDemo.addNode(i)
    }
    for(let x = 0; x < arrList.length; x++) {
        for(let y = 1; y < arrList[x].length; y++) {
        
            graphDemo.addEdge(JSON.stringify(arrList[x][0]), JSON.stringify(arrList[x][y]))
        }
    }
    return graphDemo
}
// let cTest = createGraphDemo()
// console.log(cTest)
// console.log(arrList[0])
// console.log(arrList[0][0])
// console.log(arrList[0][1])
// graphDemo.addEdge([ 0, 0 ], [ 2, 1 ])

//Adds the arrList nodes to the Graph and conects the edges between them. 

let graphDemo = new KnightGraph(64);
var vertices = gridCoordEx2

for(i of vertices) {
    graphDemo.addNode(i)
}
for(let x = 0; x < arrList.length; x++) {
    for(let y = 1; y < arrList[x].length; y++) {
    
        graphDemo.addEdge(JSON.stringify(arrList[x][0]), JSON.stringify(arrList[x][y]))
    }
}
//apply a depth first search tree into the graph to find out the shortest path between two points
// let record = ""
// let count = 0

// function depthFirst(startNode, endNode, saveCount = 9999, startNodeSave = startNode) {
//     console.log(graphDemo)
//     record += startNode + " => ";
//     let adjacentNodes = graphDemo.get(startNode);
//     // console.log(graphDemo)
//     // console.log(startNode)
//     // console.log(adjacentNodes.length)
//     if(startNode === startNodeSave) {
//         count = 0;
//         record = startNode + "=> ";
//         // graphDemo = createGraphDemo()
//         // adjacentNodes = graphDemo.get(startNode)
        
//     }
//     count += 1;
//     for(let x = 0; x < adjacentNodes.length; x++) {
//         if(adjacentNodes[x] === endNode) {

//             if(saveCount > count) { 
//                 console.log(graphDemo)
//                 record += adjacentNodes[x]
//                 saveCount = count;
//                 console.log(saveCount)
//                 console.log(record)
//                 console.log(count)
                
//             } 
           
//         } 
        
//         let tempIndex = adjacentNodes[x];
//         adjacentNodes.splice(x, 1)
//         return depthFirst(tempIndex, endNode, saveCount, startNodeSave);

//     }
//     return saveCount
// }
// let tst = depthFirst('[1,7]', '[4,4]')
// console.log(tst)



//Breadth First Search
console.log(graphDemo.size())

let g = graphDemo;
let n = graphDemo.size();
function BST(startNode, endNode, arr = [], nextNode = startNode, count1 = 0, visited = []) {
    let adjList = g.get(nextNode);
    depth = adjList.length;
    console.log(nextNode)
   
    
    visited.push(JSON.stringify(nextNode))
    for(let j = 0; j < visited.length; j++) {
        for(let i = 0; i < adjList.length; i++) {
            if(visited[j] === adjList[i]) adjList.splice(i,1)
        }
    }
    console.log(adjList)
    console.log(count1)
    if(arr.length < 80) console.log(arr)
    arr.splice(0,1)
    if(startNode === endNode) return "a";
    if(JSON.stringify(nextNode) === JSON.stringify(endNode)) return count1;
    
    for(k of adjList) {
        arr.push(k)
    }
    return BST(startNode, endNode, arr, JSON.parse(arr[0]), count1 += 1, visited)
    //Take first val of adjList > see if its == to endNode > get its Nodes > send its adjNodes to adjList
    
    
}
console.log(graphDemo)
console.log(BST([3,3],[4,3]))
// let list = g.get([0,0])
// let arr = []
// for(k of list) {
//     arr.push(k)
// }

// list = g.get(JSON.parse(list[0]))
// for(k of list) {
//     arr.push(k)
// }
// console.log(arr)

// let y = [1,1]
// let y2 = JSON.stringify(y)
// let y3 = JSON.parse(y2)
// y3 = JSON.stringify(y3)

// console.log(y2 === y3)