class Node{
    constructor(data){
        this.left = null;
        this.data = data;
        this.right = null;
        this.parent = null;
    }

    serialize(){
        let obj = {};
        obj.left = this.left ? this.left.serialize() : null;
        obj.right = this.right ? this.right.serialize() : null;
        obj.data = this.data;
        obj.parent = this.parent;

        return obj;
    }
}
