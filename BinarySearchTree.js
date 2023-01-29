class Node{
    constructor(value = null, leftNode = null, rightNode = null){
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.value = value;
    }
}

class Tree{
    constructor(arr){
        this.array = this.cleanArray(arr);
        this.root = this.buildTree(this.array);
    }

    cleanArray(arr){
        let cleanedArray = [...new Set(arr)];
        cleanedArray.sort(function(a, b){return a-b});
        return cleanedArray;
    }

    buildTree(arr){
        if(arr.length===0){return null};
        let midpoint = Math.floor(arr.length / 2);
        const leftNode = this.buildTree(arr.slice(0, midpoint));
        const rightNode = this.buildTree(arr.slice(midpoint+1, arr.length));
        const node = new Node(arr[midpoint], leftNode, rightNode)
        return node;
    }

    insert(value, node){
        if(node === null){
            const newNode = new Node(value);
            return newNode;
        }
        if(value < node.value){
            node.leftNode = this.insert(value, node.leftNode)
        }
        else{
            node.rightNode = this.insert(value, node.rightNode)
        }
        return node;
    }

    delete(value, node){
        if(node.value === value){
            if(node.leftNode === null && node.rightNode === null){
                return null;
            }
            else if(node.leftNode === null && node.rightNode != null){
                return node.rightNode;
            }
            else if(node.rightNode === null && node.leftNode != null){
                return node.leftNode;
            }
            else{
                const newNode = new Node(node.leftNode.value, node.leftNode.leftNode, node.rightNode);
                return newNode;
            }
        }
        if(value < node.value){
            node.leftNode = this.delete(value, node.leftNode);
        }
        else{
            node.rightNode = this.delete(value, node.rightNode);
        }
        return node;
    }

    find(value, node){
        if(node===null){
            return null;
        }
        else if(value===node.value){
            return node;
        }
        else if(value < node.value){
            return this.find(value, node.leftNode);
        }
        else if(value > node.value){
            return this.find(value, node.rightNode);
        }
    }

    levelOrder(callback){
        let queue = [this.root];
        let discoveredNodes = [];
        while(queue.length > 0){
            let node = queue.shift();
            if(node!=null){
               if(callback!=undefined){callback(node);}
                else{
                    discoveredNodes.push(node.value);
                }
                queue.push(node.leftNode);
                queue.push(node.rightNode);
            }
        }
        if(discoveredNodes.length > 0){return discoveredNodes};
    }

    // Traverse in the order... Left > Root > Right
    inorder(node, callback, discoveredNodes = []){
        if(node===null){return}
        this.inorder(node.leftNode, callback, discoveredNodes);
        callback ? callback(node) : discoveredNodes.push(node.value);
        this.inorder(node.rightNode, callback, discoveredNodes);
        if(discoveredNodes.length > 0){return discoveredNodes};
    }

    // Traverse in the order... Root > Left > Right
    preorder(node, callback, discoveredNodes = []){
        if(node===null){return}
        callback ? callback(node) : discoveredNodes.push(node.value);
        this.preorder(node.leftNode, callback, discoveredNodes);
        this.preorder(node.rightNode, callback, discoveredNodes);
        if(discoveredNodes.length > 0){return discoveredNodes};
    }

    // Traverse in the order... Left > Right > Root
    postorder(node, callback, discoveredNodes = []){
        if(node===null){return}
        this.postorder(node.leftNode, callback, discoveredNodes);
        this.postorder(node.rightNode, callback, discoveredNodes);
        callback ? callback(node) : discoveredNodes.push(node.value);
        if(discoveredNodes.length > 0){return discoveredNodes};
    }

    height(node){
        // Base case
        if(node===null){
            return -1;
        }
        let leftTotal = this.height(node.leftNode);
        let rightTotal = this.height(node.rightNode);
        
        if(leftTotal > rightTotal){
            return leftTotal + 1;
        }
        else{
            return rightTotal + 1;
        }
    }

    depth(toFind, node = this.root){
        // Base case
        if(toFind===node || node===null){
            return 0;
        }
        let count = 0;
        while(toFind !== node){
            count++;
            if(node.value > toFind.value){
                node = node.leftNode;
            }
            else if(node.value < toFind.value){
                node = node.rightNode;
            }
        }
        return count;
    }

    isBalanced(node){
        if(node===null){
            return -1;
        }
        let leftTotal = this.height(node.leftNode);
        let rightTotal = this.height(node.rightNode);
        
        return !(rightTotal-leftTotal > 1 || leftTotal - rightTotal > 1)
    }

    rebalance(node){
        let arr = this.inorder(node);
        arr = this.cleanArray(arr);
        return this.buildTree(arr);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightNode !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// Testing the functions of Tree
const testing = () => {
    const arr = [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90];
    const tree = new Tree(arr);
    tree.root = tree.insert(28, tree.root);
    tree.root = tree.insert(29, tree.root);
    tree.root = tree.insert(30, tree.root);
    prettyPrint(tree.root);
    tree.root = tree.delete(22, tree.root);
    prettyPrint(tree.root);
    console.log("The find function found the value: " , tree.find(18, tree.root))
    console.log(tree.levelOrder());
    console.log("Inorder = ", tree.inorder(tree.root));
    console.log("Preorder = ", tree.preorder(tree.root));
    console.log("Postorder = ", tree.postorder(tree.root));
    console.log("The height of the root node is - ", tree.height(tree.root))
    console.log("The depth of the node with value of 15 is - ", tree.depth(tree.find(4, tree.root)));
    console.log("Is the tree balanced? ", tree.isBalanced(tree.root));
    let newRoot = tree.rebalance(tree.root);
    prettyPrint(newRoot);
}

//testing();

function randomArr(){
    let arr = [];
    for(let i = 0; i < 24; i ++){
        arr.push(Math.ceil(Math.random(100)*100));
    }
    return arr;
}

// Driver script to test functions all work
let arr = randomArr();
const tree = new Tree(arr);
console.log("Is the tree balanced? ", tree.isBalanced(tree.root));
console.log("Inorder = ", tree.inorder(tree.root));
console.log("Preorder = ", tree.preorder(tree.root));
console.log("Postorder = ", tree.postorder(tree.root));
tree.root = tree.insert(128, tree.root);
tree.root = tree.insert(129, tree.root);
tree.root = tree.insert(130, tree.root);
tree.root = tree.insert(131, tree.root);
tree.root = tree.insert(132, tree.root);
tree.root = tree.insert(133, tree.root);
console.log("Is the tree balanced? ", tree.isBalanced(tree.root));
let balancedTree = tree.rebalance(tree.root);
console.log("Is the tree balanced? ", tree.isBalanced(balancedTree));
console.log("Inorder = ", tree.inorder(tree.root));
console.log("Preorder = ", tree.preorder(tree.root));
console.log("Postorder = ", tree.postorder(tree.root));