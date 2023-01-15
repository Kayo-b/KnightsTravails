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



class generateBoard {
    createBoard(size) {
        let array = Array.from(Array(size).keys());
        let board = [];
        for(let x = 0; x < size; x++) {
            for(let y = 0; y < size;y++) {
                board.push([array[x], array[y]])
            }
        }
        return board;
    }

}

class possibleKnightMoves {

    constructor() {
        this.board = []
    }

    createBoard(size) {
        let array = Array.from(Array(size).keys());
        let board = [];
        for(let x = 0; x < size; x++) {
            for(let y = 0; y < size;y++) {
                board.push([array[x], array[y]])
            }
        }
        this.board = board;
    }


    recursiveKnight(array = [0,0], gridCoord = this.board) {
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

    unpackArrays(arr = this.recursiveKnight()) {
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




}

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
        return this.graphList.get(node)
    }

    printGraph() {
        let nodesList = this.graphList.keys()
        for (var i of nodesList) {
            let print = this.graphList.get(i)
            console.log(i + " => " + print)
        }
    }
}