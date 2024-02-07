class Node{
    constructor(key, value, next = null){
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
class HashMap{
    constructor(){
        this.bucketArray = new Array(16).fill(null);
        this.limitFactor = 0.75;
        this.capacity = 16;
        this.occupied = 0;
    }
    _hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        hashCode %= this.capacity;
        return hashCode;
    }
    _increaseBucketSize(){
        this.capacity *= 2;
        const newBucketArray = new Array(this.capacity).fill(null);
        this.bucketArray.forEach(element => {
            if(element !== null){
                newBucketArray[this._hash(element.key)] = element;
            } 
        });
        this.bucketArray = newBucketArray;
    }
    set(key, value){
        const bucket = this._hash(key);
        if(this.occupied / this.capacity >= this.limitFactor){
            this._increaseBucketSize();
        }
        if(this.bucketArray[bucket] !== null){
            let temp = this.bucketArray[bucket];
            while(temp){
                if(temp.key === key){
                    temp.value = value;
                    return;
                }
                if(temp.next === null) break;
                temp = temp.next;
            }
            this.occupied += 1;
            temp.next = new Node(key, value);
            return;
        }
        this.occupied += 1;
        this.bucketArray[bucket] = new Node(key, value);
    }
    get(key){
        const bucket = this._hash(key);
        if(this.bucketArray[bucket]){
            let temp = this.bucketArray[bucket];
            while(temp){
                if(temp.key === key) return temp.value;
                temp = temp.next;
            }
        }
        return null;
    }
    has(key){
        const bucket = this._hash(key);
        if(this.bucketArray[bucket]) return true;
        return false;
    }
    remove(key){
        const bucket = this._hash(key);
        if(this.bucketArray[bucket] === null) return false;
        if(this.bucketArray[bucket].key === key){
            this.bucketArray[bucket] = null;
            this.occupied -= 1;
            return true;
        }
        let currentNode = this.bucketArray[bucket];
        let nextNode = currentNode.next;
        while(nextNode){
            if(nextNode.key === key){
                (currentNode.next = nextNode.next) || (currentNode.next = null);
                this.occupied -= 1;
                return true;
            }
            currentNode = nextNode;
            nextNode = nextNode.next;
        }
        return false;
    }
    length(){
        return this.occupied;
    }
    clear(){
        this.bucketArray = new Array(16).fill(null);
    }
    values(){
        let valueArray = [];
        this.bucketArray.forEach(element => {
            if(element){
                let currentNode = element;
                while(currentNode){
                    valueArray.push(currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        });
        return valueArray;
    }
    entries(){
        let entriesArray = [];
        this.bucketArray.forEach(element => {
            if(element){
                let currentNode = element;
                while(currentNode){
                    entriesArray.push([currentNode.key, currentNode.value]);
                    currentNode = currentNode.next;
                }
            }
        });
        return entriesArray;
    }
}

const a = new HashMap();
a.set('carlo',10)
a.set('car',10)
a.set('casdop',2324)
a.set('asdjt',2324)
a.set('cat',2324)
a.set('afska',2324)
a.set('caspot',2324)
console.log(a.bucketArray, a.occupied);

