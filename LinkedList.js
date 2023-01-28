class Node{
    constructor(value = null, nextNode = null){
        this.value = value;
        this.nextNode = nextNode
    }
}

class LinkedList{

    constructor(){
        this.headPointer = null;
        this.tailPointer = null;
    }

    append(value){
        // Creates a new node class
        const node = new Node(value, null)

        // If the Linked List is being appended to for the first time...
        if(this.headPointer===null && this.tailPointer===null){
            this.headPointer = node;
            this.tailPointer = node;
        }
        // If the Linked List has at least one node in it...
        else{
            let currentNode = this.headPointer;
            while(currentNode.nextNode != null){
                currentNode = currentNode.nextNode;
            }
            currentNode.nextNode = node;
            this.tailPointer = node;
        }
    }

    prepend(value){
        const node = new Node(value, this.headPointer);
        this.headPointer = node;
    }

    size(){
        if(this.headPointer === null){return 0;}
        let size = 1;
        let currentNode = this.headPointer;
        while(currentNode.nextNode != null){
            currentNode = currentNode.nextNode;
            size++;
        }
        return size;
    }

    head(){
        return this.headPointer;
    }

    tail(){
        return this.tailPointer;
    }

    at(index){
        if(this.headPointer === null){return null;}
        let currentNode = this.headPointer;
        for(let i = 0; i<index; i++){
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }

    pop(){
        const listSize = this.size()
        if(listSize === 0){return null}
        else if(listSize === 1){this.headPointer = null; this.tailPointer = null;}
        else{
            const prevNode = this.at(listSize-2);
            this.tailPointer = prevNode
            prevNode.nextNode = null;
        };
    }

    contains(value){
        if(this.headPointer === null){return false;}
        let currentNode = this.headPointer;
        while(currentNode.nextNode != null){
            currentNode = currentNode.nextNode;
            if(currentNode.value==value){return true;}
        }
        return false;
    }

    find(value){
        if(this.headPointer === null){return null;}
        let currentNode = this.headPointer;
        let index = 0;
        while(currentNode.nextNode != null){
            if(currentNode.value === value){
                return index;
            }
            currentNode = currentNode.nextNode;
            index++;
        }
        if(currentNode.value === value){
            return index;
        }
        return null;
    }

    toString(){
        if(this.headPointer === null){return null;}
        let nodeString = `(${this.headPointer.value}) -> `;
        let currentNode = this.headPointer;
        while(currentNode.nextNode != null){
            currentNode = currentNode.nextNode;
            nodeString = nodeString + `(${currentNode.value}) -> `;
        }
        nodeString = nodeString + " null";
        return nodeString;
    }

    insertAt(value, index){
        if(index===0){
            const node = new Node(value, this.at(1));
            this.headPointer = node;
        }
        else if(index > this.size()-1){
            const node = new Node(value, null);
            this.tailPointer.nextNode = node;
            this.tailPointer = node;
        }
        else{
            const nodeBeforeIndex = this.at(index-1);
            const nodeAtIndex = this.at(index);
            const node = new Node(value, nodeAtIndex);
            nodeBeforeIndex.nextNode = node;
        }
    }

    removeAt(index){
        if(index===0){
            this.headPointer = this.headPointer.nextNode;
        }
        else if(index > this.size()-1){
            console.log("ERROR - No node found to remove at that index...")
        }
        else{
            const nodeBeforeIndex = this.at(index-1);
            const nodeAfterIndex = this.at(index + 1);
            nodeBeforeIndex.nextNode = nodeAfterIndex;
        }
    }

}

const list = new LinkedList();
console.log("Size of linked list before appends = ", list.size());
list.prepend("FIRST START");
list.append(0);
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.pop()
list.prepend("START");
console.log("Size of linked list after appends = ", list.size());
console.log("Does the list contain a 3? ", list.contains(3));
console.log("The node at index 2 has a value of ... ", list.at(2).value);
console.log("What is the index of the value 4? ", list.find(4));
console.log(list.toString());
list.pop();
console.log(list.toString());
console.log("Head of linked list = ", list.head().value);
console.log("Tail of linked list = ", list.tail().value);
list.insertAt("TEST", 9);
list.removeAt(2);
console.log(list.toString());