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

//create board with specific size
//call find shortest path method that receives the starting point of the knight and returns the shortest path


//Auxiliary function that returns a Map Object with the values in a graph.
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
    }

    get(node) {
        return this.graphList.get(JSON.stringify(node))
    }
    delete(node) {
        this.graphList.delete(node)
    }
    has(node) {
        this.graphList.has(node)
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

class KnightsTravails {

    constructor() {
        this.board = [];
        this.boardString = [];
        this.arrList = [];
        this.kmoves = [];
        
    }

    createBoard(size) {
        let array = [];
        array.push(Array.from(Array(size).keys()))
        array.push(Array.from(Array(size).keys()))
        //Board with arrays for the first part
        for(let x = 0; x < size; x++) {
            for(let y = 0; y < size;y++) {
                this.board.push([array[0][x], array[1][y]])
            }
        }
        for(let x = 0; x < size; x++) {
            for(let y = 0; y < size;y++) {
                this.boardString.push(JSON.stringify([array[0][x], array[1][y]]))
            }
        }

    }


    recursiveKnight(array = [0,0], gridCoord = this.board) {
        //All possible moves 
        let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
        let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ]; 

        if(array[0] > 7 || array[1] > 7 || array[0] < 0 || array[1] < 0) return 
        let temp = array;
    
            gridCoord.forEach(item => { 
                if(item[0] === array[0] && item[1] === array[1]) {
                    
                    let index = gridCoord.indexOf(item);
                    let newGrid = gridCoord;            
                    newGrid.splice(index, 1);
        
                    for(let i = 0; i < 8;i++) {
                        let k2 = this.recursiveKnight([array[0] + X[i], array[1] + Y[i]], newGrid, temp);
                        if(k2 != undefined) temp.push(k2);
                        if(k2 != undefined) this.kmoves.push(k2);
                    }
                }
            })
            return temp;
    }
    
//At this point, the function 'recurseiveKnight' is able to return a nested array that contains all possible moves that a knight can make.
//The connections are represented by the levels of nesting. 
//Next Step: unpack de nested arrays while keeping the relation between each position and convert it into a
//data structure that represents all conections so that a shortest-path function can be applied.

//--------------------------------------------------//

//Function unpackArrays takes the resulting nested array from the previous function 'recursiveKnight' and returns an organized array of arrays
//containing all nodes and its conections(edges), being that the index 0 is the starting node(position in chessboard) and the other 
//following indexes are the possible positions where the knight can move.

    unpackArrays(arr) {

        let newArr = [[arr[0],arr[1]]];
        if(arr.length > 2) {
            for(let x = 2; x < arr.length;x++) {
                if(arr[x].length > 2) {
                    newArr.push([arr[x][0],arr[x][1]]) 
                    this.unpackArrays(arr[x]);
                    
                } else newArr.push(arr[x]);
            }
        }
        this.arrList.push(newArr);
        return newArr;
    }

//createGraph takes the unpacked arrays from the previous function and maps them on a Map structure, each Node from the board is a key
//and each key has an empty array where the Edges(conecting nodes) will be pushed into to represent the possibility of a move between the nodes.    
    createGraph() {
        this.unpackArrays(this.recursiveKnight())
        let graphDemo = new KnightGraph(64);
        var vertices = this.boardString;
        

        for(let i of vertices) {
            graphDemo.addNode(i);
            
        }
        for(let x = 0; x < this.arrList.length; x++) {
            for(let y = 1; y < this.arrList[x].length; y++) {
            
                graphDemo.addEdge(JSON.stringify(this.arrList[x][0]), JSON.stringify(this.arrList[x][y]));
            }
        }
        return graphDemo;
    }
//Breadth First Search finds the shortest path between two coordinates.
    BST(startNode, endNode, queue = [], nextNode = startNode, g = this.createGraph(), visited = [] , reverseGraph = new KnightGraph) {
        if(JSON.stringify(startNode) == JSON.stringify(endNode)) return "Start value same as End";
        let adjList = g.get(nextNode);
        visited.push(JSON.stringify(nextNode));

        //Removing visited coordinates 
        for(let j = 0; j < visited.length; j++) {
            for(let i = 0; i < adjList.length; i++) {
                if(visited[j] === adjList[i]) adjList.splice(i,1)
            }
        }
        //Removing first value from queue
        queue.splice(0,1)
        
        if(JSON.stringify(nextNode) === JSON.stringify(endNode)) {
            
            let returnVal = reverseGraph.get(endNode)
            let retArray = []
            retArray.push(returnVal[0])
            retArray.push(endNode)
            let print = ""
            while(returnVal != undefined) {
                returnVal = reverseGraph.get(returnVal[0])
                if(returnVal === undefined) break;
                let returnVal2 = returnVal[0]
                retArray.unshift(returnVal2)
            }
            for(let l of retArray) {
                print += " => " + l;
            }
            return `It takes ${retArray.length - 1} moves from ${JSON.stringify(startNode)} to reach ${JSON.stringify(endNode)}. Path` + print;
        } 
       
        for(let k of adjList) {
            queue.push(k);
            visited.push(k)
            reverseGraph.addNode(k)
            reverseGraph.addEdge(k, nextNode);
            
        }
        
        return this.BST(startNode, endNode, queue, JSON.parse(queue[0]), g, visited,reverseGraph)
    }
}

let test = new KnightsTravails
test.createBoard(8)
console.log(test.BST([7,5],[1,0]))// returns "It takes 5 moves from [7,5] to reach [1,0]. Path => 7,5 => 6,7 => 4,6 => 3,4 => 2,2 => 1,0"



